// Imports
import type { Anime } from "./types";
import nodePath from "node:path";
import chalk from "chalk";
import audit from "../core/audit";
import direct from "../core/direct";

// Begins autosort
audit("autosort", "Beginning autosort...", chalk.blue);

// Autosorts tags
const tagsFile = Bun.file(nodePath.resolve(direct.data, "./tags.json"));
const tagsData = await tagsFile.json() as Anime[];
tagsData.sort((a, b) => a.id.localeCompare(b.id));
await tagsFile.write(JSON.stringify(tagsData, null, 4));
audit("autosort", `Autosorted ${tagsData.length} Tag(s).`, chalk.green);

// Autosorts anime
const animeFile = Bun.file(nodePath.resolve(direct.data, "./anime.json"));
const animeData = await animeFile.json() as Anime[];
animeData.sort((a, b) => a.id.localeCompare(b.id));
await animeFile.write(JSON.stringify(animeData, null, 4));
audit("autosort", `Autosorted ${animeData.length} Anime.`, chalk.green);

// Autosorts anime
const gamesFile = Bun.file(nodePath.resolve(direct.data, "./games.json"));
const gamesData = await gamesFile.json() as Anime[];
gamesData.sort((a, b) => a.id.localeCompare(b.id));
await gamesFile.write(JSON.stringify(gamesData, null, 4));
audit("autosort", `Autosorted ${gamesData.length} Game(s).`, chalk.green);

// Ends autosort
audit("autosort", "Ending autosort...", chalk.blue);
