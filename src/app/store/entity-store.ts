import { Observable } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { Store } from './store';

export type ID = string | number;

export interface EntityStoreOptions {
  idKey: ID;
}

export interface EntityState<T> {
  entities: Record<ID, T>;
  activeId: ID;
  length: number;
}

const mapper = <T>(entities: T[], key: ID) => entities.reduce<Record<ID, T>>((acc, el) => {
  acc[el[key]] = el;
  return acc;
}, {});

export class EntityStore<T, S extends EntityState<T>> extends Store<S> {
  protected ids: ID[] = [];

  constructor(
    initialData: Partial<S>,
    private options: EntityStoreOptions,
  ) {
    super({
      ...initialData,
      entities: [],
    } as unknown as S);
  }

  private updateEntries(entries: Record<ID, T>) {
    this.set({
      ...this.value,
      entities: entries,
      length: Object.keys(entries).length,
    });
  }

  public setEntities(entities: T[]): void {
    this.ids = entities.map(entity => entity[this.options.idKey]);
    this.updateEntries(mapper(entities, this.options.idKey));
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
    return this.ids.map(id => this.value.entities[id]);
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
    if (!this.ids.includes(id)) {
      this.ids.push(id);
    }

    this.updateEntries({
      ...this.value.entities,
      [id]: {
      ...this.getEntity(id),
      ...entity,
      },
    });
  }

  public upsertMany(entities: T[]) {
    entities.forEach(entity => {
      const id = entity[this.options.idKey];

      if (!this.ids.includes(id)) {
        this.ids.push(id);
      }
    });

    this.updateEntries({
      ...this.value.entities,
      ...mapper(entities, this.options.idKey),
    });
  }

  public removeEntity(id: ID) {
    const idIndex = this.ids.indexOf(id);

    if (idIndex === -1) {
      return;
    }

    this.ids.splice(idIndex, 1);

    const entities = { ...this.value.entities };
    delete entities[id];
    this.updateEntries(entities);
  }
}
