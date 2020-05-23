import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  public select(): Observable<T> {
    return this.data.asObservable();
  }

  public update(value: Partial<T>): void {
    this.value = {
      ...this.value,
      value,
    };
    this.data.next(this.value);
  }

  public set(value: T): void {
    this.value = value;
    this.data.next(this.value);
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
  }
}
