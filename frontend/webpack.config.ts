
import path from 'path';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  entry: './src/index.ts', // Точка входа
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devtool: 'source-map',
  mode: 'development',
};