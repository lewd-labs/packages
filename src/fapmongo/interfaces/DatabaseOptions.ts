import type { DatabaseSchema } from "./DatabaseSchema";
interface DatabaseOptions {
  mongoURI: string;
  schemas: Array<DatabaseSchema>;
}
export { DatabaseOptions };
