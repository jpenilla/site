import { Link, ProjectGroup, ProjectInfo, Tech } from "./types";

const tech: Record<string, Tech> = {
  gradle: new Tech("Gradle", "iconify logos--gradle bg-gradle", "https://gradle.org"),
  bun: new Tech("Bun", "iconify-color logos--bun", "https://bun.sh"),
  svelteKit: new Tech("SvelteKit", "iconify-color logos--svelte-icon", "https://svelte.dev"),
  tailwind: new Tech("Tailwind CSS", "iconify-color logos--tailwindcss-icon", "https://tailwindcss.com"),
  java: new Tech("Java", "iconify-color logos--java", "https://java.com"),
  kotlin: new Tech("Kotlin", "iconify-color logos--kotlin-icon", "https://kotlinlang.org"),
  springBoot: new Tech("Spring Boot", "iconify-color logos--spring-icon", "https://spring.io/projects/spring-boot"),
};

const gradlePlugins = import.meta.glob("/src/lib/projects/gradle-plugins/*.svx", {
  eager: true,
});
const webApps = import.meta.glob("/src/lib/projects/web-apps/*.svx", {
  eager: true,
});
const libraries = import.meta.glob("/src/lib/projects/libraries/*.svx", {
  eager: true,
});
const minecraftMods = import.meta.glob("/src/lib/projects/minecraft-mods/*.svx", {
  eager: true,
});

export const projectGroups = [
  new ProjectGroup("Web Apps", webApps, "ri--compass-line bg-primary"),
  new ProjectGroup("Libraries", libraries, "ri--book-shelf-line bg-primary"),
  new ProjectGroup("Gradle Plugins", gradlePlugins, "logos--gradle bg-gradle"),
  new ProjectGroup("Minecraft Mods", minecraftMods, "ri--settings-5-fill bg-primary"),
];

function makeLink(link: { type: string; value: string }) {
  if (link.type === "modrinth") {
    return Link.modrinth(link.value);
  } else if (link.type === "gpp") {
    return Link.gpp(link.value);
  } else if (link.type === "gpp-search") {
    return Link.gppSearch(link.value);
  }
}

export function getProjectInfo(project: unknown): ProjectInfo {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const meta = project.metadata;

  return new ProjectInfo(
    meta.name,
    meta.githubOwner,
    meta.githubRepo,
    (meta.links ?? []).map(makeLink),
    meta.technologies.map((technology: string) => {
      return tech[technology];
    }),
  );
}
