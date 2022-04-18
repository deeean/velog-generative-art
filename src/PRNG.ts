const MAX_INTEGER = 2147483647;

export class PRNG {
  seed: number;

  constructor(seed: number) {
    this.seed = seed % MAX_INTEGER;

    if (this.seed <= 0) {
      this.seed += MAX_INTEGER - 1;
    }
  }

  private next() {
    this.seed = this.seed * 16807 % MAX_INTEGER;
  }

  double() {
    this.next();
    return this.seed / MAX_INTEGER;
  }

  color() {
    return `rgb(${this.double() * 255}, ${this.double() * 255}, ${this.double() * 255})`;
  }
}