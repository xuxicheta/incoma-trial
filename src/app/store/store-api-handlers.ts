import { Store } from './store';
import { defer, MonoTypeOperatorFunction, of } from 'rxjs';
import { finalize, catchError, tap } from 'rxjs/operators';
import { EntityStore, EntityState } from './entity-store';

export function handleSetApi<T, S extends EntityState<T>>(store: EntityStore<T, S>): MonoTypeOperatorFunction<T[]> {
  return input$ => input$.pipe(
    setLoading(store),
    setEntities(store),
    handleError(store),
  );
}

export function handleUpsertApi<T, S extends EntityState<T>>(store: EntityStore<T, S>): MonoTypeOperatorFunction<T[]> {
  return input$ => input$.pipe(
    setLoading(store),
    upsertEntities(store),
    handleError(store),
  );
}

export function setLoading<K, S>(store: Store<S>): MonoTypeOperatorFunction<K> {
  return source => defer(() => {
    store.setLoading(true);
    return source.pipe(
      finalize(() => {
        store.setLoading(false);
      }),
    );
  });
}

export function handleError<K, S>(store: Store<S>): MonoTypeOperatorFunction<K> {
  return catchError(error => {
    store.reset();
    store.setError(error);
    return of([] as any);
  });
}

export function setEntities<T, S extends EntityState<T>>(store: EntityStore<T, S>): MonoTypeOperatorFunction<T[]> {
  return tap(result => {
    store.setEntities(result);
    store.setError(false);
  });
}

export function upsertEntities<T, S extends EntityState<T>>(store: EntityStore<T, S>): MonoTypeOperatorFunction<T[]> {
  return tap(result => {
    store.upsertMany(result);
    store.setError(false);
  });
}
