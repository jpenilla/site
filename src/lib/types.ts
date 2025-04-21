import type { Component } from "svelte";

export type Getter<T> = () => T;
export type MaybeGetter<T> = T | Getter<T>;

export function extract<T>(value: MaybeGetter<T>): T {
  return typeof value === "function" ? (value as Getter<T>)() : value;
}

export type RestProps = Record<PropertyKey, unknown>;

export class Link {
  constructor(
    public readonly text: string,
    public readonly url: string,
    public readonly iconClasses: string = "",
    public readonly iconComponent?: Component,
  ) {}
}

export class Tech {
  constructor(
    public readonly name: string,
    public readonly iconClasses: string,
    public readonly url: string,
  ) {}
}

export class ProjectInfo {
  constructor(
    public readonly name: string,
    public readonly description: Component,
    public readonly githubOwner: string,
    public readonly githubRepo: string,
    public readonly links: Link[] = [],
    public readonly technologies: Tech[] = [],
  ) {}

  get id(): string {
    return this.name.toLowerCase().replace(/ /g, "-");
  }

  get githubUrl(): string {
    return `https://github.com/${this.githubOwner}/${this.githubRepo}`;
  }
}

export class ProjectGroup {
  constructor(
    public readonly name: string,
    public readonly projects: ProjectInfo[],
    public readonly iconClasses: string,
  ) {}

  get id(): string {
    return this.name.toLowerCase().replace(/ /g, "-");
  }
}

export class Organization {
  constructor(
    public readonly name: string,
    public readonly role: string,
    public readonly url: string,
    public readonly description: Component,
  ) {}
}
