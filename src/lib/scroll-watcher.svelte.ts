import { useEventListener } from "runed";
import { extract, type MaybeGetter } from "$lib/types";

type ScrollPosTarget = MaybeGetter<EventTarget | null>;

export interface ScrollPosOptions {
  fixMobileSafari?: boolean;
}

export class ScrollPos implements RawScrollPos {
  private scrollYCurrent: number = $state(0);
  private scrollXCurrent: number = $state(0);

  constructor(target: ScrollPosTarget, options: ScrollPosOptions = {}) {
    watchScroll(target, ({ scrollX, scrollY }) => {
      const extracted = extract(target);
      if (!extracted) return;

      if (options.fixMobileSafari) {
        // Fix mobile safari oddity with overscroll bounceback
        // The scroll position would end up at 1 rather than zero when scrolling on a page that fits in the viewport
        if (scrollY == 1) {
          scrollY = 0;
          scrollTo(extracted, { top: 0, behavior: "smooth" });
        }
        if (scrollX == 1) {
          scrollX = 0;
          scrollTo(extracted, { left: 0, behavior: "smooth" });
        }
      }

      this.scrollYCurrent = scrollY;
      this.scrollXCurrent = scrollX;
    });
  }

  get scrollY() {
    return this.scrollYCurrent;
  }

  get scrollX() {
    return this.scrollXCurrent;
  }
}

interface RawScrollPos {
  scrollY: number;
  scrollX: number;
}

function getRawScroll(target: EventTarget | null): RawScrollPos {
  if (target instanceof Document) {
    return { scrollY: target.documentElement.scrollTop, scrollX: target.documentElement.scrollLeft };
  } else if (target instanceof Window) {
    return { scrollY: target.scrollY, scrollX: target.scrollX };
  } else if (target instanceof HTMLElement) {
    return { scrollY: target.scrollTop, scrollX: target.scrollLeft };
  }
  return { scrollY: 0, scrollX: 0 };
}

function scrollTo(target: EventTarget | null, options: ScrollToOptions) {
  if (target instanceof Document) {
    target.documentElement.scrollTo(options);
  } else if (target instanceof Window) {
    target.scrollTo(options);
  } else if (target instanceof HTMLElement) {
    target.scrollTo(options);
  }
}

type ScrollWatcherCallback = (raw: RawScrollPos) => void;

function watchScroll(target: ScrollPosTarget, callback: ScrollWatcherCallback) {
  const onScrolled = (event: Event) => {
    callback(getRawScroll(event.target));
  };

  useEventListener(target, ["scroll", "scrollend", "resize"], onScrolled);
}
