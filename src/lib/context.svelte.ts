import { Context } from "runed";

export class RootContext {
  constructor(private readonly navbarHeightGetter: () => number) {}

  get navbarHeight(): number {
    return this.navbarHeightGetter();
  }
}

export const rootContext = new Context<RootContext>("rootContext");
