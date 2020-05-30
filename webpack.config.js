const path = require('path');

module.exports = {
    entry: {
        // layered: './src/demo/layered/ui/Index.tsx',
        stateless: './src/demo/stateless/ui/Index.tsx'
    },
    mode: 'development',
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
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};