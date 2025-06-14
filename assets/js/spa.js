// Initializes spa
export const pages = new Map();
export const main = document.getElementById("main");
if(main === null) throw new Error("No main field found.");

// Creates listeners
window.addEventListener("click", async (event) => {
    // Checks target
    const target = event.target;
    if(!(target instanceof HTMLAnchorElement)) return;
    if(target.origin !== window.location.origin) return;

    // Checks overrides
    const ignoreSpaOverride = target.attributes.getNamedItem("data-ignore-spa");
    if(ignoreSpaOverride !== null && ignoreSpaOverride.value === "true") return;

    // Overrides redirect
    event.preventDefault();
    if(target.pathname === location.pathname) return;
    await render(target.pathname);
});
window.addEventListener("popstate", async (event) => {
    // Overrides redirect
    main.innerHTML = event.state.page;
});

// Executes first render
await render(location.pathname);

// Defines methods
export async function preload(pathname) {
    // Checks cache
    const hit = pages.get(pathname);
    if(typeof hit !== "undefined") return hit;

    // Requests page
    const result = await fetch("/assets/pages" + pathname + ".html");
    if(!result.ok) throw new Error("Failed to request page.");
    const page = await result.text();
    pages.set(pathname, page);
    return page;
}
export async function render(pathname) {
    // Requests page
    let page;
    try {
        page = await preload(pathname === "/" ? "/home" : pathname);
    }
    catch {
        page = await preload("/error");
    }

    // Paints content
    const context = {
        page: page
    };
    main.innerHTML = page;
    window.history.pushState(context, "", pathname);

    // Executes scripts
    const scripts = main.querySelectorAll("script");
    scripts.forEach((script) => {
        const clone = document.createElement("script");
        for(let i = 0; i < script.attributes.length; i++) {
            const attribute = script.attributes[i];
            clone.setAttribute(attribute.name, attribute.value);
        }
        clone.text = script.text;
        script.parentNode.replaceChild(clone, script);
    });
}
