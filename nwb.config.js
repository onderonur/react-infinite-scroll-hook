module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "ReactInfiniteScrollHook",
      externals: {
        react: "React",
        "react-dom": "ReactDom"
      }
    }
  },
  webpack: {
    extra: {
      module: {
        rules: [
          {
            test: /\.js$/,
            enforce: "pre",
            loader: "eslint-loader",
            exclude: /node_modules/
          }
        ]
      }
    }
  }
};
