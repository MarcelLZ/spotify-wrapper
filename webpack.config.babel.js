import { join } from 'path'

const PATH = {
  SRC: join(__dirname, 'src'),
  DIST: join(__dirname, 'dist')
}

module.exports = {
  entry: join(PATH.SRC, 'index'),
  output: {
    path: PATH.DIST,
    libraryTarget: 'umd',
    library: 'spotifyWrapper'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: PATH.SRC
      }
    ]
  }
}
