import { Collection } from "discord.js";
import TaminaruModuleError from "./util/error";

interface Provider {
  items: any | string | Number | never;
  model: any | string | Number;
}

class Provider {
  constructor() {
    /**
     * Cached entries.
     * @type {Collection<string, Object>}
     */
    this.items = new Collection();
  }

  /**
   * Initializes the provider.
   * @abstract
   * @returns {any}
   */
  init() {
    throw new TaminaruModuleError(
      "NOT_IMPLEMENTED",
      this.constructor.name,
      "init"
    );
  }
  /**
   * Gets a value.
   * @abstract
   * @param {string} id - ID of entry.
   * @param {string} key - The key to get.
   * @param {any} [defaultValue] - Default value if not found or null.
   * @returns {any}
   */
  get(id: string, key: string, defaultValue: any): any {
    throw new TaminaruModuleError(
      "NOT_IMPLEMENTED",
      this.constructor.name,
      "get"
    );
    id;
    key;
    defaultValue;
  }

  /**
   * Sets a value.
   * @abstract
   * @param {string} id - ID of entry.
   * @param {string} key - The key to set.
   * @param {any} value - The value.
   * @returns {any}
   */
  async set(id: string, key: string, value: any): Promise<any> {
    throw new TaminaruModuleError(
      "NOT_IMPLEMENTED",
      this.constructor.name,
      "set"
    );
    id;
    key;
    value;
  }

  /**
   * Deletes a value.
   * @abstract
   * @param {string} id - ID of entry.
   * @param {string} key - The key to delete.
   * @returns {any}
   */
  async delete(id: string, key: string): Promise<any> {
    throw new TaminaruModuleError(
      "NOT_IMPLEMENTED",
      this.constructor.name,
      "delete"
    );
    id;
    key;
  }

  /**
   * Clears an entry.
   * @abstract
   * @param {string} id - ID of entry.
   * @returns {any}
   */
  async clear(id: string): Promise<any> {
    throw new TaminaruModuleError(
      "NOT_IMPLEMENTED",
      this.constructor.name,
      "clear"
    );
    id;
  }
}

export default Provider;
