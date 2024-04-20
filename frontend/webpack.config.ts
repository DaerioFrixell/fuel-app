import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { ProgressPlugin, Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


export type mode_T = 'production' | 'development';

export type env_T = {
  mode: mode_T
}



export default (env: env_T) => {
  const isDev = env.mode === "development";

  const config: Configuration = {
    mode: env.mode ?? "development",

    entry: {
      index: path.resolve(__dirname, 'src', 'index.tsx')
    },

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    plugins: [
      new ProgressPlugin(),
      isDev && new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
    ].filter(Boolean),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: isDev ? 'inline-source-map' : false,

    devServer: isDev ? {
      open: true
    } : undefined,
  }

  return config;
}