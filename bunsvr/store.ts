// Imports
import BunSqlite from "bun:sqlite";

// Defines primitive type
export type Primitive = string | number | boolean | null | { [ key: string ]: Primitive } | Primitive[];

// Defines store class
export class Store<Key extends string, Value extends Primitive> {
    // Defines fields
    private readonly _database: BunSqlite;
    private readonly _table: string;
    
    // Defines constructor
    constructor(filepath: string, table: string) {
        // Initializes fields
        this._database = new BunSqlite(filepath);
        this._table = table;
    }

    // Defines table methods
    create(): void {
        // Creates table
        this._database
            .prepare(`CREATE TABLE IF NOT EXISTS ${this._table} (key TEXT PRIMARY KEY, value TEXT)`)
            .run();
    }
    clear(): void {
        // Clears entries
        this._database
            .prepare(`DELETE FROM ${this._table}`)
            .run();
    }
    drop(): void {
        // Drops table
        this._database
            .prepare(`DROP TABLE IF EXISTS ${this._table}`)
            .run();
    }
    poke(): boolean {
        // Performs poke
        const result = this._database
            .prepare(`SELECT EXISTS(SELECT 1 FROM sqlite_master WHERE type = "table" AND name = $table) AS "exists"`)
            .get({ "$table": this._table }) as { exists: 0 | 1 };
        return result.exists === 1;
    }

    // Defines single query methods    
    delete(key: Key): boolean {
        // Deletes entry
        const result = this._database
            .query(`DELETE FROM ${this._table} WHERE key = $key`)
            .run({ "$key": key });
        return result.changes !== 0;
    }
    ensure(key: Key, value: Value): boolean {
        // Serializes value
        const json = JSON.stringify(value);

        // Writes entry
        const result = this._database
            .query(`INSERT OR IGNORE INTO ${this._table} (key, value) VALUES ($key, $value)`)
            .run({ "$key": key, "$value": json });
        return result.changes !== 0;
    }
    get(key: Key): Value | null {
        // Queries entry
        const entry = this._database
            .query(`SELECT value FROM ${this._table} WHERE key = $key`)
            .get({ "$key": key }) as { value: string } | null;
        if(entry === null) return null;

        // Parses value
        const value = JSON.parse(entry.value) as Value;
        return value;
    }
    set(key: Key, value: Value): void {
        // Serializes value
        const json = JSON.stringify(value);

        // Writes entry
        this._database
            .query(`
                INSERT INTO ${this._table} (key, value) VALUES ($key, $value)
                ON CONFLICT(key) DO UPDATE SET value = $value
            `)
            .run({ "$key": key, "$value": json });
    }
    test(key: Key): boolean {
        // Performs test
        const result = this._database
            .query(`SELECT EXISTS(SELECT 1 FROM ${this._table} WHERE key = $key) AS "exists"`)
            .get({ "$key": key }) as { exists: 0 | 1 };
        return result.exists === 1;
    }

    // Defines bulk query methods
    keys(): Key[] {
        // Queries entries
        const entries = this._database
            .query(`SELECT key FROM ${this._table}`)
            .all() as { key: string }[];

        // Returns keys
        const keys = entries.map((entry) => entry.key) as Key[];
        return keys;
    }
    pairs(): [ Key, Value ][] {
        // Queries entries
        const entries = this._database
            .query(`SELECT key, value FROM ${this._table}`)
            .all() as { key: string, value: string }[];

        // Returns pairs
        const pairs = entries.map((entry) => [ entry.key, JSON.parse(entry.value) ]) as [ Key, Value ][];
        return pairs;
    }
    values(): Value[] {
        // Queries entries
        const entries = this._database
            .query(`SELECT value FROM ${this._table}`)
            .all() as { value: string }[];

        // Returns values
        const values = entries.map((entry) => JSON.parse(entry.value)) as Value[];
        return values;
    }
}

// Exports
export default Store;
