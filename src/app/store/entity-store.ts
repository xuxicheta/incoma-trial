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
}

const mapper = <T>(entities: T[], key: ID) => entities.reduce<Record<ID, T>>((acc, el) => {
  acc[el[key]] = el;
  return acc;
}, {});

const flatter = <T>(mapped: Record<ID, T>) => Object.values(mapped);

export class EntityStore<T, S extends EntityState<T>> extends Store<S> {
  constructor(
    initialData: Partial<S>,
    private options: EntityStoreOptions,
  ) {
    super({
      ...initialData,
      entities: [],
    } as unknown as S);
  }

  public setEntities(entities: T[]): void {
    this.set({
      ...this.value,
      entities: mapper(entities, this.options.idKey),
    });
  }

  public selectAll(): Observable<T[]> {
    return this.select().pipe(
      pluck('entities'),
      distinctUntilChanged(),
      map(entities => this.getAll())
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
    return this.sort(flatter(this.value.entities));
  }

  public getEntity(id: ID): T {
    return this.value.entities[id];
  }

  public setActiveId(activeId: ID): boolean {
    if (activeId in this.value.entities) {
      this.value.activeId = activeId;
      this.update(this.value);
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
    return this.selectActiveId().pipe(
      map(activeId => this.getEntity(activeId)),
      distinctUntilChanged(),
    );
  }

  public upsertEntity(id: ID, entity: Partial<T>): void {
    const newEntity = {
      ...this.getEntity(id),
      ...entity,
    };

    const entities = {
      ...this.value.entities,
      [id]: newEntity,
    };

    this.set({
      ...this.value,
      entities,
    });
  }

  public upsertMany(entities: T[]) {
    const stored = { ...this.value.entities };
    entities.forEach(entity => stored[entity[this.options.idKey]] = entity);
    this.data.next({
      ...this.value,
      entities: stored,
    });
  }

  public removeEntity(id: ID) {
    delete this.value.entities[id];
    this.set(this.value);
  }

  private sort(entities: T[]): T[] {
    const { idKey } = this.options;
    return entities.sort((a, b) => +a[idKey] - +b[idKey]);
  }
}
