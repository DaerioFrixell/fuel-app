import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions_T } from "./types/types";


export const buildDevServer = ({ port }: BuildOptions_T) => {
  return {
    port: port,
    open: true,
    historyApiFallback: true,
    hot: true
  }
}