export class Smth{
  a: [number]
  constructor() {
    this.a = $state([1]);
  }
  set(value: [number]) {
    this.a = value;
  }
}