import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions_T } from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { babelLoader } from "./babel/babelLoader";


export const buildLoaders = (options: BuildOptions_T): ModuleOptions["rules"] => {
  const isDev = options.mode === "development";

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
    ],
  }

  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
        },
      }
    ],
  }

  const _babelLoader = babelLoader(isDev)

  return [
    scssLoader,
    // tsLoader,
    _babelLoader
  ]
}