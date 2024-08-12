import { Configuration } from "webpack";
import { BuildOptionsType } from "./types";


export const buildResolvers = (options: BuildOptionsType): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    }
  }
}