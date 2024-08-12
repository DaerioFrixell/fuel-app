import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, ProgressPlugin } from "webpack";
import { BuildOptionsType } from "./types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';


export const buildPlugins = ({
  mode,
  paths,
  analyzer
}: BuildOptionsType): Configuration['plugins'] => {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html }),
  ];

  if (isDev) {
    plugins.push(new ProgressPlugin())
    plugins.push(new ForkTsCheckerWebpackPlugin())
    plugins.push(new ReactRefreshWebpackPlugin())
  };

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }))
  };

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins;
}