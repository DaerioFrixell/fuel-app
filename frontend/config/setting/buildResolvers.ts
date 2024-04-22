import { Configuration } from "webpack";
import { BuildOptions_T } from "./types/types";


export const buildResolvers = (options: BuildOptions_T): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    }
  }
}