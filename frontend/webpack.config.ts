import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


export type mode_T = 'production' | 'development';

export type env_T = {
  mode: mode_T
}

export default (env: env_T) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? "production",
    entry: path.resolve(__dirname, 'src', 'index.ts'),

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },

    plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
    ],
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
    devServer: {
      open: true
    }
  }

  return config;
}