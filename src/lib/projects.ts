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
  new ProjectInfo(
    "hangar-publish-plugin",
    "HangarMC",
    "hangar-publish-plugin",
    "Gradle plugin for automated publishing to <a href='https://hangar.papermc.io' class='link'>Hangar</a>",
    [Link.gpp("io.papermc.hangar-publish-plugin")],
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
  new ProjectInfo("squaremap", "jpenilla", "squaremap", "World map renderer and web viewer for Minecraft servers", [
    Link.modrinth("squaremap"),
  ]),
  new ProjectInfo("ChessCraft", "jpenilla", "chesscraft", "Adds in-world chess matches between players and or CPUs", [
    Link.modrinth("chesscraft"),
  ]),
  new ProjectInfo("TabTPS", "jpenilla", "TabTPS", "Utility to monitor real-time server performance in-game", [
    Link.modrinth("tabtps"),
  ]),
  new ProjectInfo(
    "MiniMOTD",
    "jpenilla",
    "MiniMOTD",
    "Allows customizing the server icon and 'message of the day' text (shown on the server list) using <a href='https://docs.advntr.dev/minimessage/index.html' class='link' target='_blank'>MiniMessage</a>",
    [Link.modrinth("minimotd")],
  ),
  new ProjectInfo(
    "Better Fabric Console",
    "jpenilla",
    "better-fabric-console",
    "Server-side Fabric mod enhancing the console with tab completions, colored log output, command syntax highlighting, command history, and more",
    [Link.modrinth("better-fabric-console")],
  ),
  new ProjectInfo(
    "Mods Command",
    "jpenilla",
    "mods-command",
    "Fabric mod adding commands to list, search, and get information about installed mods",
    [Link.modrinth("mods-command")],
  ),
  new ProjectInfo(
    "CarbonChat",
    "Hexaoxide",
    "Carbon",
    "Featureful chat enhancement mod with support for multiple mod loaders and the <a href='https://papermc.io/software/velocity' class='link' target='_blank'>Velocity</a> proxy, cross-server chat, an extensible API, and more",
    [Link.modrinth("carbon")],
  ),
];

export const projectGroups = [
  new ProjectGroup("Web Apps", webApps, "ri--compass-line bg-primary"),
  new ProjectGroup("Libraries", libraries, "ri--book-shelf-line bg-primary"),
  new ProjectGroup("Gradle Plugins", gradlePlugins, "logos--gradle bg-gradle"),
  new ProjectGroup("Minecraft Mods", minecraftMods, "ri--settings-5-fill bg-primary"),
];
