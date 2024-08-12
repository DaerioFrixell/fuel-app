import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export const buildDevServer = ({ port }: DevServerConfiguration) => {
  return {
    port: port,
    open: true,
    historyApiFallback: true,
    hot: true,
  }
}