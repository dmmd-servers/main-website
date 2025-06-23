// Imports
import chalk from "chalk";
import anime from "./anime";
import games from "./games";
import tags from "./tags";
import audit from "../core/audit";

// Begins check
const hits: Map<string, number> = new Map();
audit("check", "Beginning check...", chalk.blue);

// Checks tags
for(let i = 0; i < tags.length; i++) {
    // Checks tag
    const tag = tags[i]!;
    if(hits.has(tag.id))
        audit("error", `Tag (${tag.id}) found duplicate!`, chalk.red);
    else hits.set(tag.id, 0);

    // Verifies id
    if(!/tag:[a-z0-9]/.test(tag.id))
        audit("warn", `Tag (${tag.id}) is invalid!`, chalk.yellow);

    // Verifies sorted
    if(i !== 0 && tag.id.localeCompare(tags[i - 1]!.id) < 0)
        audit("warn", `Tag (${tag.id}) out of place!`, chalk.yellow);
}
audit("check", `Total of ${tags.length} Tag(s) checked.`, chalk.green);

// Checks anime
for(let i = 0; i < anime.length; i++) {
    // Checks anime
    const work = anime[i]!;
    if(hits.has(work.id))
        audit("error", `Anime (${work.id}) found duplicate!`, chalk.red);
    else hits.set(work.id, 0);

    // Verifies id
    if(!/anime:[a-z0-9]/.test(work.id))
        audit("warn", `Anime (${work.id}) is invalid!`, chalk.yellow);

    // Verifies tags
    for(let j = 0; j < work.tags.length; j++) {
        // Increments hits
        const tagId = work.tags[j]!;
        const tagHits = hits.get(tagId);
        if(typeof tagHits === "undefined")
            audit("error", `Tag (${tagId}) in Anime (${work.id}) not found!`, chalk.red);
        else hits.set(tagId, tagHits + 1);

        // Verifies sorted
        if(j !== 0 && tagId.localeCompare(work.tags[j - 1]!) < 0)
            audit("warn", `Tag (${tagId}) in Anime (${work.id}) out of place!`, chalk.yellow);
    }

    // Verifies sorted
    if(i !== 0 && work.id.localeCompare(anime[i - 1]!.id) < 0)
        audit("warn", `Anime (${work.id}) out of place!`, chalk.yellow);
}
audit("check", `Total of ${anime.length} Anime check.`, chalk.green);

// Checks game
for(let i = 0; i < games.length; i++) {
    // Checks game
    const game = games[i]!;
    if(hits.has(game.id))
        audit("error", `Game (${game.id}) found duplicate!`, chalk.red);
    else hits.set(game.id, 0);

    // Verifies id
    if(!/game:[a-z0-9]/.test(game.id))
        audit("warn", `Game (${game.id}) is invalid!`, chalk.yellow);

    // Verifies tags
    for(let j = 0; j < game.tags.length; j++) {
        // Increments hits
        const tagId = game.tags[j]!;
        const tagHits = hits.get(tagId);
        if(typeof tagHits === "undefined")
            audit("error", `Tag (${tagId}) in Game (${game.id}) not found!`, chalk.red);
        else hits.set(tagId, tagHits + 1);

        // Verifies sorted
        if(j !== 0 && tagId.localeCompare(game.tags[j - 1]!) < 0)
            audit("warn", `Tag (${tagId}) in Game (${game.id}) out of place!`, chalk.yellow);
    }

    // Verifies sorted
    if(i !== 0 && game.id.localeCompare(games[i - 1]!.id) < 0)
        audit("warn", `Game (${game.id}) out of place!`, chalk.yellow);
}
audit("check", `Total of ${games.length} Game(s) checked.`, chalk.green);

// Ends check
audit("check", "Ending check...", chalk.blue);
hits.forEach((refs, id) => {
    if(id.startsWith("tag:") && refs === 0)
        audit("warn", `Tag (${id}) has 0 references!`, chalk.yellow);
});
