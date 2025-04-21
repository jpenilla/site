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

const allProjects = import.meta.glob("/src/lib/projects/*/*.svx", {
  eager: true,
});

const gradlePlugins = importGroup(allProjects, "gradle-plugins");
const webApps = importGroup(allProjects, "web-apps");
const libraries = importGroup(allProjects, "libraries");
const minecraftMods = importGroup(allProjects, "minecraft-mods");

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
  throw new Error(`Unknown link type: ${link.type}`);
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

function importGroup(allProjects: Record<string, unknown>, path: string, order: string[] = []) {
  const importsMap = new Map<string, unknown>();
  for (const filePath of Object.keys(allProjects)) {
    const search = `/${path}/`;
    const idx = filePath.indexOf(search);
    if (idx === -1) continue;
    const slug = filePath.slice(idx + search.length, filePath.length - 4);
    importsMap.set(slug, allProjects[filePath]);
  }

  const ret: unknown[] = [];

  for (const string of order) {
    const entry = importsMap.get(string);
    if (entry) {
      importsMap.delete(string);
      ret.push(entry);
    }
  }
  for (const entry of importsMap.values()) {
    ret.push(entry);
  }

  return ret;
}
