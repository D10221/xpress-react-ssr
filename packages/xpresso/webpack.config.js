const path = require("path");
/** */
module.exports = {
  entry: path.resolve(__dirname, "src/views/browser/index.tsx"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/i,
      //   use: ['url-loader']
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader', options: {
            name: '[path][name].[ext]'
          }
        }],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
              compilerOptions: {
                target: "es5",
                module: "commonjs",
                lib: ["dom", "esnext"],
                jsx: "react",
                declaration: true,
                sourceMap: true,
                outDir: "./static",
                /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
                // "rootDir": "./src",
                /* Enable all strict type-checking options. */
                strict: true,
                /* Module Resolution Options */
                moduleResolution: "node",
                /* Base directory to resolve non-absolute module names. */
                baseUrl: "/",
                /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
                esModuleInterop: true,
                /* Do not resolve the real path of symlinks. */
                preserveSymlinks: true
                /* Source Map Options */
                // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
                // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
                // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
                // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
                /* Experimental Options */
                // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
                // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};
