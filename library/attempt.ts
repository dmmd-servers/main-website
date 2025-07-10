// Defines attempt handlers
export function execute<Value>(
    invoke: () => Value,
    fallback: Value
): Value {
    // Attempts value
    try {
        return invoke();
    }
    catch {
        return fallback;
    }
}
export async function resolve<Value>(
    invoke: () => Value | Promise<Value>,
    fallback: Value
): Promise<Value> {
    // Atttempts value
    try {
        return await invoke();
    }
    catch {
        return fallback;
    }
}

// Exports
export default {
    execute,
    resolve
};
