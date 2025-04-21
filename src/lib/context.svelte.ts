import { Context } from "runed";
import { SvelteSet } from "svelte/reactivity";
import { onDestroy } from "svelte";

export class RootContext {
  private contentUnderNavbar = new SvelteSet<string>();

  constructor(private readonly navbarHeightGetter: () => number) {}

  watchContentUnderNavbar(content: string, underNavbar: () => boolean) {
    $effect(() => {
      this.updateContentUnderNavbar(content, underNavbar());
    });
    onDestroy(() => {
      this.contentUnderNavbar.delete(content);
    });
  }

  updateContentUnderNavbar(content: string, underNavbar: boolean) {
    if (underNavbar) {
      this.contentUnderNavbar.add(content);
    } else {
      this.contentUnderNavbar.delete(content);
    }
  }

  get isContentUnderNavbar(): boolean {
    return this.contentUnderNavbar.size !== 0;
  }

  get navbarHeight(): number {
    // Default to 68 before the DOM is ready (measured in-browser), prevents layout shift
    return this.navbarHeightGetter() || 68;
  }
}

export const rootContext = new Context<RootContext>("rootContext");
