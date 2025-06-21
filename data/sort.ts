// Imports
import type { Anime, Game, Tag } from "./types";
import nodePath from "node:path";
import chalk from "chalk";
import audit from "../core/audit";
import direct from "../core/direct";

// Begins sort
audit("sort", "Beginning sort...", chalk.blue);

// Sorts tags
const tagsFile = Bun.file(nodePath.resolve(direct.data, "./tags.json"));
const tagsData = await tagsFile.json() as Tag[];
tagsData.sort((a, b) => a.id.localeCompare(b.id));
await tagsFile.write(JSON.stringify(tagsData, null, 4));
audit("sort", `Sorted ${tagsData.length} Tag(s).`, chalk.green);

// Sorts anime
const animeFile = Bun.file(nodePath.resolve(direct.data, "./anime.json"));
const animeData = await animeFile.json() as Anime[];
animeData.sort((a, b) => a.id.localeCompare(b.id));
animeData.forEach((workData) => workData.tags.sort((a, b) => a.localeCompare(b)));
await animeFile.write(JSON.stringify(animeData, null, 4));
audit("sort", `Sorted ${animeData.length} Anime.`, chalk.green);

// Sorts anime
const gamesFile = Bun.file(nodePath.resolve(direct.data, "./games.json"));
const gamesData = await gamesFile.json() as Game[];
gamesData.sort((a, b) => a.id.localeCompare(b.id));
gamesData.forEach((gameData) => gameData.tags.sort((a, b) => a.localeCompare(b)));
await gamesFile.write(JSON.stringify(gamesData, null, 4));
audit("sort", `Sorted ${gamesData.length} Game(s).`, chalk.green);

// Ends sort
audit("sort", "Ending sort...", chalk.blue);
