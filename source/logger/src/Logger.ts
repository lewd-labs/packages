import type { LoggerOptions } from "../typings/utilTypes";
import colors from "./LoggerColors";

export class Logger {
  private readonly name?: string;
  public constructor(options?: LoggerOptions) {
    this.name = options?.name;
  }

  /*
    [Date] [MemUsed][Name] [Type] <value>
    */

  private base(type: string, value: string, color: string) {
    const used_mem: number = process.memoryUsage().heapUsed / 1024 / 1024

    let outputBuilder = "";

    outputBuilder +=
      `[${new Date().toLocaleTimeString()}|${new Date().toLocaleDateString()}]${color}${
        colors.DIM
      }`.trim();

    outputBuilder += `[${Math.round(used_mem * 100) / 100} MB]${
      this.name ? `[${this.name}]` : ""
    }[${type}]:${colors.BRIGHT}`.trim();

    return console.log(outputBuilder, value, colors.RESET);
  }

  /**
   * basic Log - output green
   * @param value
   * @returns
   */
  public log(value: string) {
    return this.base("INFO", value, colors.GREEN);
  }

  /**
   * Information logs - output cyan
   * @param value
   * @returns
   */
  public info(value: string) {
    return this.base("INFO", value, colors.CYAN);
  }

  /**
   * Warning logs - output yellow
   * @param value
   * @returns
   */
  public warn(value: string) {
    return this.base("WARN", value, colors.YELLOW);
  }

  /**
   * Error logs - output red
   * @param value
   * @returns
   */
  public error(value: string | Error) {
    return this.base(
      "ERR",
      value instanceof Error ? value.message : value,
      colors.RED
    );
  }
}
