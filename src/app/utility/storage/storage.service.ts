import { Injectable } from '@angular/core';

export enum LocalstorageKeys {
  Favorites = 'Favorites',
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  readonly prefix = 'incoma__';

  public set<T>(key: LocalstorageKeys, data: T): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(data));
  }

  public get<T>(key: LocalstorageKeys): T {
    try {
      return JSON.parse(localStorage.getItem(this.prefix + key));
    } catch (e) {
    }
    return null;
  }

  public remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}
