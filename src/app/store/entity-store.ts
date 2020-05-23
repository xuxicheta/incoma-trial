import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { Store } from './store';

export type ID = string | number;

export interface EntityStoreOptions {
  idKey: ID;
}

export interface EntityState<T> {
  entities: Record<ID, T>;
  ids: ID[];
  activeId: ID;
  length: number;
}

const mapper = <T>(entities: T[], key: ID) => entities.reduce<Record<ID, T>>((acc, el) => {
  acc[el[key]] = el;
  return acc;
}, {});

export class EntityStore<T, S extends EntityState<T>> extends Store<S> {
  constructor(
    initialData: Partial<S>,
    private options: EntityStoreOptions,
  ) {
    super({
      ...initialData,
      ids: [],
      entities: [],
    } as unknown as S);
  }

  private updateEntries(entries: Record<ID, T>, ids: ID[]) {
    this.set({
      ...this.value,
      ids,
      entities: entries,
      length: Object.keys(entries).length,
    });
  }

  public setEntities(entities: T[]): void {
    const ids = entities.map(entity => entity[this.options.idKey]);
    this.updateEntries(mapper(entities, this.options.idKey), ids);
  }

  public selectAll(): Observable<T[]> {
    return this.select().pipe(
      pluck('entities'),
      distinctUntilChanged(),
      map(() => this.getAll())
    );
  }

  public selectEntity(id: ID): Observable<T> {
    return this.select().pipe(
      pluck('entities'),
      map(entities => entities[id]),
      distinctUntilChanged(),
    );
  }

  public getAll(): T[] {
    return this.value.ids.map(id => this.value.entities[id]);
  }

  public getEntity(id: ID): T {
    return this.value.entities[id];
  }

  public setActiveId(activeId: ID): boolean {
    if (activeId in this.value.entities) {
      const value = { ...this.value };
      value.activeId = activeId;
      this.set(value);
      return true;
    }
    return false;
  }

  public getActiveId(): ID {
    return this.value.activeId;
  }

  public getActive(): T {
    return this.getEntity(this.getActiveId());
  }

  public selectActiveId(): Observable<ID> {
    return this.select().pipe(
      map(value => value.activeId),
      distinctUntilChanged(),
    );
  }

  public selectActive(): Observable<T> {
    return this.select().pipe(
      map(value => value.entities[value.activeId])
    );
  }

  public upsertEntity(id: ID, entity: Partial<T>): void {
    const ids = this.value.ids.slice();
    if (!ids.includes(id)) {
      ids.push(id);
    }

    this.updateEntries({
      ...this.value.entities,
      [id]: {
      ...this.getEntity(id),
      ...entity,
      },
    }, ids);
  }

  public upsertMany(entities: T[]) {
    const ids = this.value.ids.slice();

    entities.forEach(entity => {
      const id = entity[this.options.idKey];

      if (!ids.includes(id)) {
        ids.push(id);
      }
    });

    this.updateEntries({
      ...this.value.entities,
      ...mapper(entities, this.options.idKey),
    }, ids);
  }

  public removeEntity(id: ID) {
    const ids = this.value.ids.slice();
    const idIndex = ids.indexOf(id);

    if (idIndex === -1) {
      return;
    }

    ids.splice(idIndex, 1);

    const entities = { ...this.value.entities };
    delete entities[id];
    this.updateEntries(entities, ids);
  }
}
