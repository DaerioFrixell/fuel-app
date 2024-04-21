import { Configuration } from 'webpack';
import { buildWebpack } from './config/build/buildWebpack';
import { BuildMode_T, BuildPaths_T } from './config/build/types/types';
import path from 'path';


export type env_T = {
  mode: BuildMode_T
  port: number

  analyzer?: boolean
}

export default (env: env_T) => {
  const paths: BuildPaths_T = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
  };

  const config: Configuration = buildWebpack({
    port: env.port ?? 3300,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer
  })

  return config;
}