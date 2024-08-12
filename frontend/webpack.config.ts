import { Configuration } from 'webpack';
import { buildWebpack } from './config/setting/buildWebpack';
import { BuildModeType, BuildPathsType } from './config/setting/types';
import path from 'path';


export type envType = {
  mode: BuildModeType
  port: number
  analyzer?: boolean
}

export default (env: envType) => {
  const paths: BuildPathsType = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
    output: path.resolve(__dirname, "build"),
    src: path.resolve(__dirname, "src"),
  };

  const config: Configuration = buildWebpack({
    port: env.port ?? 3300,
    mode: env.mode ?? "development",
    paths,
    analyzer: env.analyzer
  })

  return config;
}