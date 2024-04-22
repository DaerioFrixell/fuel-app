export type BuildPaths_T = {
  entry: string
  html: string
  output: string
  src: string
}

export type BuildMode_T = 'production' | 'development';

export type BuildOptions_T = {
  port: number
  paths: BuildPaths_T
  mode: BuildMode_T

  analyzer?: boolean
}