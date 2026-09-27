import pg from "pg";
import { config } from "../config.ts";

// Always pass values as parameters ($1, $2, ...), never interpolate them into
// the SQL string. That's what prevents SQL injection.
export const pool = new pg.Pool({ connectionString: config.DATABASE_URL });
