import { Link, ProjectGroup, ProjectInfo, Tech } from "./types";
import ModrinthIcon from "./components/ModrinthIcon.svelte";
import { type MetadataMapper, withMetadata } from "$lib/util";

const tech: Record<string, Tech> = {
  gradle: new Tech("Gradle", "iconify logos--gradle bg-gradle", "https://gradle.org"),
  bun: new Tech("Bun", "iconify-color logos--bun", "https://bun.sh"),
  vite: new Tech("Vite", "iconify-color logos--vitejs", "https://vitejs.dev"),
  typescript: new Tech("TypeScript", "iconify-color logos--typescript-icon", "https://www.typescriptlang.org"),
  svelteKit: new Tech("SvelteKit", "iconify-color logos--svelte-icon", "https://svelte.dev"),
  tailwind: new Tech("Tailwind CSS", "iconify-color logos--tailwindcss-icon", "https://tailwindcss.com"),
  java: new Tech("Java", "iconify-color logos--java", "https://java.com"),
  kotlin: new Tech("Kotlin", "iconify-color logos--kotlin-icon", "https://kotlinlang.org"),
  springBoot: new Tech("Spring Boot", "iconify-color logos--spring-icon", "https://spring.io/projects/spring-boot"),
};

const allProjects = import.meta.glob("/src/projects/*/*.svx", {
  eager: true,
});

export const projectGroups = [
  projectGroup("web-apps", "Web Apps", "ri--compass-line bg-primary"),
  projectGroup("libraries", "Libraries", "ri--book-shelf-line bg-primary"),
  projectGroup("gradle-plugins", "Gradle Plugins", "logos--gradle bg-gradle"),
  projectGroup("minecraft-mods", "Minecraft Mods", "ri--settings-5-fill bg-primary"),
];

function projectGroup(path: string, name: string, iconClasses: string) {
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
  const projects = withMetadata(allProjects, getProjectInfo, { path });
  return new ProjectGroup(name, projects, iconClasses);
}

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
    case "demo":
      return new Link("Demo", link.value, "iconify ri--shapes-fill bg-primary");
    case "homepage":
      return new Link("Home", link.value, "iconify ri--home-4-fill bg-primary");
    default:
      throw new Error(`Unknown link type: ${link.type}`);
  }
}
