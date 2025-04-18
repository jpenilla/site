import { Context } from "runed";

export class RootContext {
  constructor(private readonly navbarHeightGetter: () => number) {}

  get navbarHeight(): number {
    // Default to 72 before the DOM is ready (measured in-browser), prevents layout shift
    return this.navbarHeightGetter() || 72;
  }
}

export const rootContext = new Context<RootContext>("rootContext");
