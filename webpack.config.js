const path = require('path');

module.exports = {
    entry: {
        index: './src/index.ts',
        layered: './src/demo/layered/ui/Index.tsx',
        stateless: './src/demo/stateless/ui/Index.tsx'
    },
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
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ozone',
        libraryTarget: 'umd'
    },
};
