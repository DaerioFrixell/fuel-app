import { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import path from 'path';
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions_T } from "./types/types";


export function buildWebpack(options: BuildOptions_T): Configuration {
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

    /** TODO: Разделить на чанки до 244кб, тогда <performance> можно убрать. */
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
  }
}