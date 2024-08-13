import { Configuration } from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptionsType } from "./types";


export function buildWebpack(options: BuildOptionsType): Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? buildDevServer(options) : undefined,
    cache: false,
    // TODO: Разделить на чанки до 244кб, тогда <performance> можно убрать.
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
  }
}