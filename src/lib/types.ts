import type { Component } from "svelte";
import ModrinthIcon from "$lib/components/ModrinthIcon.svelte";

export class Link {
  constructor(
    public readonly text: string,
    public readonly url: string,
    public readonly iconClasses: string = "",
    public readonly iconComponent?: Component,
  ) {}

  static gppSearch(query: string): Link {
    return new Link(
      "Gradle Plugin Portal",
      `https://plugins.gradle.org/search?term=${query}`,
      "iconify logos--gradle bg-gradle",
    );
  }

  static gpp(id: string): Link {
    return new Link(
      "Gradle Plugin Portal",
      `https://plugins.gradle.org/plugin/${id}`,
      "iconify logos--gradle bg-gradle",
    );
  }

  static modrinth(id: string): Link {
    return new Link("Modrinth", `https://modrinth.com/mod/${id}`, "text-modrinth", ModrinthIcon);
  }
}

export class ProjectInfo {
  constructor(
    public readonly name: string,
    public readonly githubOwner: string,
    public readonly githubRepo: string,
    public readonly description: string,
    public readonly links: Link[] = [],
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
    public readonly description: string,
  ) {}
}
