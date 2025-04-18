import { Organization } from "./types";

export const organizations = [
  new Organization(
    "PaperMC",
    "Maintainer",
    "https://papermc.io",
    "Lead development of <a href='/projects#paperweight' class='link'>paperweight</a> and <a href='/projects#patch-roulette' class='link'>Patch Roulette</a>, general build tooling, maintenance of the Paper Minecraft server software",
  ),
  new Organization(
    "Incendo",
    "Maintainer",
    "https://github.com/Incendo",
    "Lead maintenance of <a href='/projects#cloud-command-framework' class='link'>Cloud Command Framework</a> and it's platform adapters",
  ),
  new Organization(
    "Tuinity",
    "Maintainer",
    "https://github.com/Tuinity",
    "Build tooling for all projects, Moonrise maintainer",
  ),
];
