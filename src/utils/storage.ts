import { serialize } from './serialize';

export class Storage<T> {
  private _value: T | null;
  constructor(private readonly key: string) {
    const initialValue = localStorage.getItem(key);
    this._value =
      initialValue === null ? null : (JSON.parse(initialValue) as T);
  }
  set value(value: T | null) {
    if (value) {
      localStorage.setItem(this.key, JSON.stringify(value));
    } else {
      localStorage.removeItem(this.key);
    }
    this._value = serialize(value);
  }
  get value() {
    return serialize(this._value);
  }
}
