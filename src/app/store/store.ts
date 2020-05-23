import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map, distinctUntilChanged } from 'rxjs/operators';

export class Store<T> {
  protected data: BehaviorSubject<T>;
  protected value: T;
  private loading = new BehaviorSubject(false);
  private error = new BehaviorSubject<any>(null);

  constructor(
    private initialData: T,
  ) {
    this.value = initialData;
    this.data = new BehaviorSubject(initialData);
  }

  public getValue(): T {
    return this.value;
  }

  public select(): Observable<T>;
  public select<K extends keyof T>(project: (v: T) => T[K]): Observable<T[K]>;
  public select<K extends keyof T>(project: (v: T) => T[K]|T = v => v): Observable<T[K]|T> {
    return this.data.pipe(
      map(project),
      distinctUntilChanged(),
    );
  }

  public update(value: Partial<T>): void {
    this.updateValue({
      ...this.value,
      ...value,
    });
  }

  public set(value: T): void {
    this.updateValue(value);
    this.loading.next(false);
  }

  public reset(): void {
    this.data.next(this.initialData);
  }

  public setLoading(loading: boolean): void {
    this.loading.next(loading);
  }

  public selectLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public getLoading(): boolean {
    return this.loading.getValue();
  }

  public setError(error: any) {
    this.error.next(error);
  }

  public selectError() {
    return this.error.asObservable();
  }

  public getError() {
    return this.error.getValue();
  }

  public destroy() {
    this.data.complete();
    this.loading.complete();
    this.value = null;
  }

  protected updateValue(value: T) {
    this.value = value;
    this.data.next(value);
  }
}
