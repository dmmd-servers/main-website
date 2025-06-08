// Executes script
void function() {
    // Defines quotes
    const quotes = [
        "No idea where you're heading...",
        "How'd you get here?",
        "Welp, I guess we're lost?",
        "Yeah, no. This doesn't seem like the right place.",
        "Oh well, the 'back' button is always available.",
        "No clue what happened.",
        "Something weird is going on.",
        "Don't look at me, I don't know either.",
        "Huh?"
    ];
    const element = document.getElementById("quote");
    if(element === null) throw new Error("No quote field found.");
    element.innerText = quotes[Math.floor(Math.random() * quotes.length)];
}();
