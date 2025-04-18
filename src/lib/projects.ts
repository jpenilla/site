import { Link, ProjectGroup, ProjectInfo } from "./types";

export const gradlePlugins: ProjectInfo[] = [
  new ProjectInfo(
    "resource-factory",
    "jpenilla",
    "resource-factory",
    "Gradle plugin for generating resources at build time",
    [Link.gppSearch("xyz.jpenilla.resource-factory")],
  ),
  new ProjectInfo(
    "gremlin",
    "jpenilla",
    "gremlin",
    "Gradle plugin and Java library for resolving Gradle Configurations at runtime",
    [Link.gpp("xyz.jpenilla.gremlin-gradle")],
  ),
  new ProjectInfo(
    "paperweight",
    "PaperMC",
    "paperweight",
    "Gradle plugin for building the Paper Minecraft server software, forks of Paper, and Paper plugins",
    [Link.gppSearch("io.papermc.paperweight")],
  ),
  new ProjectInfo(
    "run-task",
    "jpenilla",
    "run-task",
    "Gradle plugins adding tasks to run Minecraft server and proxy software",
    [Link.gppSearch("xyz.jpenilla.run-")],
  ),
];

export const webApps: ProjectInfo[] = [
  new ProjectInfo(
    "Patch Roulette Diff Viewer",
    "PaperMC",
    "patch-roulette",
    "Featureful and performant multi-file diff viewer",
  ),
  new ProjectInfo("site", "jpenilla", "site", "Personal portfolio website built with SvelteKit (this website)"),
];

export const libraries: ProjectInfo[] = [
  new ProjectInfo("Cloud Command Framework", "Incendo", "cloud", "Command framework & dispatcher for the JVM"),
  new ProjectInfo(
    "reflection-remapper",
    "jpenilla",
    "reflection-remapper",
    "Java reflection library with support for obfuscation mappings",
  ),
];

export const minecraftMods: ProjectInfo[] = [
  new ProjectInfo("squaremap", "jpenilla", "squaremap", "World map renderer and web frontend for Minecraft servers", [
    Link.modrinth("squaremap"),
  ]),
];

export const projectGroups = [
  new ProjectGroup("Gradle Plugins", gradlePlugins, "logos--gradle bg-gradle"),
  new ProjectGroup("Web Apps", webApps, "ri--compass-line bg-primary"),
  new ProjectGroup("Libraries", libraries, "ri--book-shelf-line bg-primary"),
  new ProjectGroup("Minecraft Mods", minecraftMods, "ri--settings-5-fill bg-primary"),
];
