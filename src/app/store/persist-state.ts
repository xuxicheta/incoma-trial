import { Store } from 'src/app/store/store';
import { StorageService, LocalstorageKeys } from '../utility/storage/storage.service';
import { Subscription } from 'rxjs';
import { skip, debounceTime } from 'rxjs/operators';

export function restoreState<T>(store: Store<T>, key: LocalstorageKeys,  storageService: StorageService) {
  const value = storageService.get<T>(key);
  if (value) {
    store.set(value);
  }
}

export function saveState<T>(store: Store<T>, key: LocalstorageKeys, storageService: StorageService) {
  const value = store.getValue();
  storageService.set<T>(key, value);
}

export function persistState<T>(store: Store<T>, key: LocalstorageKeys, storageService: StorageService): Subscription {
  restoreState(store, key, storageService);

  return store.select().pipe(
    skip(1),
    debounceTime(500),
  )
    .subscribe((x) => {
      saveState(store, key, storageService);
    });
}
