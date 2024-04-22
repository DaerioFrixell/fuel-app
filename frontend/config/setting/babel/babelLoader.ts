export const babelLoader = (isDev: boolean) => {

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        [
          '@babel/preset-react',
          {
            runtime: isDev ? 'automatic' : 'classic',
          }
        ]
      ]
    }
  }
}
