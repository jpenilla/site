import { Link, ProjectGroup, ProjectInfo, Tech } from "./types";
import ModrinthIcon from "./components/ModrinthIcon.svelte";
import { groupWithMetadata, type MetadataMapper } from "$lib/util";

const tech: Record<string, Tech> = {
  gradle: new Tech("Gradle", "iconify logos--gradle bg-gradle", "https://gradle.org"),
  bun: new Tech("Bun", "iconify-color logos--bun", "https://bun.sh"),
  svelteKit: new Tech("SvelteKit", "iconify-color logos--svelte-icon", "https://svelte.dev"),
  tailwind: new Tech("Tailwind CSS", "iconify-color logos--tailwindcss-icon", "https://tailwindcss.com"),
  java: new Tech("Java", "iconify-color logos--java", "https://java.com"),
  kotlin: new Tech("Kotlin", "iconify-color logos--kotlin-icon", "https://kotlinlang.org"),
  springBoot: new Tech("Spring Boot", "iconify-color logos--spring-icon", "https://spring.io/projects/spring-boot"),
};

const allProjects = import.meta.glob("/src/projects/*/*.svx", {
  eager: true,
});

const getProjectInfo: MetadataMapper<ProjectInfo> = (metadata, component) => {
  return new ProjectInfo(
    metadata.name,
    component,
    metadata.githubOwner,
    metadata.githubRepo,
    (metadata.links ?? []).map(makeLink),
    metadata.technologies.map((technology: string) => {
      return tech[technology];
    }),
  );
};

const gradlePlugins = groupWithMetadata(allProjects, "gradle-plugins", getProjectInfo);
const webApps = groupWithMetadata(allProjects, "web-apps", getProjectInfo);
const libraries = groupWithMetadata(allProjects, "libraries", getProjectInfo);
const minecraftMods = groupWithMetadata(allProjects, "minecraft-mods", getProjectInfo);

export const projectGroups = [
  new ProjectGroup("Web Apps", webApps, "ri--compass-line bg-primary"),
  new ProjectGroup("Libraries", libraries, "ri--book-shelf-line bg-primary"),
  new ProjectGroup("Gradle Plugins", gradlePlugins, "logos--gradle bg-gradle"),
  new ProjectGroup("Minecraft Mods", minecraftMods, "ri--settings-5-fill bg-primary"),
];

function makeLink(link: { type: string; value: string }) {
  switch (link.type) {
    case "modrinth":
      return new Link("Modrinth", `https://modrinth.com/mod/${link.value}`, "text-modrinth", ModrinthIcon);
    case "gpp":
      return new Link(
        "Gradle Plugin Portal",
        `https://plugins.gradle.org/plugin/${link.value}`,
        "iconify logos--gradle bg-gradle",
      );
    case "gpp-search":
      return new Link(
        "Gradle Plugin Portal",
        `https://plugins.gradle.org/search?term=${link.value}`,
        "iconify logos--gradle bg-gradle",
      );
    default:
      throw new Error(`Unknown link type: ${link.type}`);
  }
}
