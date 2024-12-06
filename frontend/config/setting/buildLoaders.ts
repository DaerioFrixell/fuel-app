import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptionsType } from "./types";
import { babelLoader } from "./babel/babelLoader";


export const buildLoaders = (options: BuildOptionsType): ModuleOptions["rules"] => {
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
    use: 'ts-loader'
  }
  const _babelLoader = babelLoader(isDev)

  return [
    scssLoader,
    tsLoader,
    // _babelLoader
  ]
}