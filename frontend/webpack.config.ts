import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';


export default (env: any) => {
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
  }

  return config;
}