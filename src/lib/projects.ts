import { Link, ProjectGroup, ProjectInfo, Tech } from "./types";
import PatchRoulette from "./projects/PatchRoulette.svx";

const tech = {
  gradle: new Tech("Gradle", "iconify logos--gradle bg-gradle", "https://gradle.org"),
  bun: new Tech("Bun", "iconify-color logos--bun", "https://bun.sh"),
  svelteKit: new Tech("SvelteKit", "iconify-color logos--svelte-icon", "https://svelte.dev"),
  tailwind: new Tech("Tailwind CSS", "iconify-color logos--tailwindcss-icon", "https://tailwindcss.com"),
  java: new Tech("Java", "iconify-color logos--java", "https://java.com"),
  kotlin: new Tech("Kotlin", "iconify-color logos--kotlin-icon", "https://kotlinlang.org"),
  springBoot: new Tech("Spring Boot", "iconify-color logos--spring-icon", "https://spring.io/projects/spring-boot"),
};

export const gradlePlugins: ProjectInfo[] = [
  new ProjectInfo(
    "resource-factory",
    "jpenilla",
    "resource-factory",
    "Gradle plugin for generating resources at build time",
    [Link.gppSearch("xyz.jpenilla.resource-factory")],
    [tech.kotlin],
  ),
  new ProjectInfo(
    "gremlin",
    "jpenilla",
    "gremlin",
    "Gradle plugin and Java library for resolving Gradle Configurations at runtime",
    [Link.gpp("xyz.jpenilla.gremlin-gradle")],
    [tech.java, tech.kotlin],
  ),
  new ProjectInfo(
    "paperweight",
    "PaperMC",
    "paperweight",
    "Gradle plugin for building the Paper Minecraft server software, forks of Paper, and Paper plugins",
    [Link.gppSearch("io.papermc.paperweight")],
    [tech.kotlin],
  ),
  new ProjectInfo(
    "run-task",
    "jpenilla",
    "run-task",
    "Gradle plugins adding tasks to run Minecraft server and proxy software",
    [Link.gppSearch("xyz.jpenilla.run-")],
    [tech.kotlin],
  ),
  new ProjectInfo(
    "hangar-publish-plugin",
    "HangarMC",
    "hangar-publish-plugin",
    "Gradle plugin for automated publishing to <a href='https://hangar.papermc.io' class='link'>Hangar</a>",
    [Link.gpp("io.papermc.hangar-publish-plugin")],
    [tech.java, tech.kotlin],
  ),
];

export const webApps: ProjectInfo[] = [
  new ProjectInfo(
    "Patch Roulette",
    "PaperMC",
    "patch-roulette",
    PatchRoulette,
    [],
    [tech.svelteKit, tech.tailwind, tech.bun, tech.java, tech.springBoot, tech.gradle],
  ),
  new ProjectInfo(
    "site",
    "jpenilla",
    "site",
    "Personal portfolio website (this website)",
    [],
    [tech.svelteKit, tech.tailwind, tech.bun],
  ),
];

export const libraries: ProjectInfo[] = [
  new ProjectInfo(
    "Cloud Command Framework",
    "Incendo",
    "cloud",
    "Command framework & dispatcher for the JVM",
    [],
    [tech.java, tech.kotlin, tech.gradle],
  ),
  new ProjectInfo(
    "reflection-remapper",
    "jpenilla",
    "reflection-remapper",
    "Java reflection library with support for obfuscation mappings",
    [],
    [tech.java, tech.gradle],
  ),
];

export const minecraftMods: ProjectInfo[] = [
  new ProjectInfo(
    "squaremap",
    "jpenilla",
    "squaremap",
    "World map renderer and web viewer for Minecraft servers",
    [Link.modrinth("squaremap")],
    [tech.java, tech.gradle],
  ),
  new ProjectInfo(
    "ChessCraft",
    "jpenilla",
    "chesscraft",
    "Adds in-world chess matches between players and or CPUs",
    [Link.modrinth("chesscraft")],
    [tech.java, tech.gradle],
  ),
  new ProjectInfo(
    "TabTPS",
    "jpenilla",
    "TabTPS",
    "Utility to monitor real-time server performance in-game",
    [Link.modrinth("tabtps")],
    [tech.java, tech.gradle],
  ),
  new ProjectInfo(
    "MiniMOTD",
    "jpenilla",
    "MiniMOTD",
    "Allows customizing the server icon and 'message of the day' text (shown on the server list) using <a href='https://docs.advntr.dev/minimessage/index.html' class='link' target='_blank'>MiniMessage</a>",
    [Link.modrinth("minimotd")],
    [tech.java, tech.gradle],
  ),
  new ProjectInfo(
    "Better Fabric Console",
    "jpenilla",
    "better-fabric-console",
    "Server-side Fabric mod enhancing the console with tab completions, colored log output, command syntax highlighting, command history, and more",
    [Link.modrinth("better-fabric-console")],
    [tech.java, tech.gradle],
  ),
  new ProjectInfo(
    "Mods Command",
    "jpenilla",
    "mods-command",
    "Fabric mod adding commands to list, search, and get information about installed mods",
    [Link.modrinth("mods-command")],
    [tech.java, tech.gradle],
  ),
  new ProjectInfo(
    "CarbonChat",
    "Hexaoxide",
    "Carbon",
    "Featureful chat enhancement mod with support for multiple mod loaders and the <a href='https://papermc.io/software/velocity' class='link' target='_blank'>Velocity</a> proxy, cross-server chat, an extensible API, and more",
    [Link.modrinth("carbon")],
    [tech.java, tech.gradle],
  ),
];

export const projectGroups = [
  new ProjectGroup("Web Apps", webApps, "ri--compass-line bg-primary"),
  new ProjectGroup("Libraries", libraries, "ri--book-shelf-line bg-primary"),
  new ProjectGroup("Gradle Plugins", gradlePlugins, "logos--gradle bg-gradle"),
  new ProjectGroup("Minecraft Mods", minecraftMods, "ri--settings-5-fill bg-primary"),
];
