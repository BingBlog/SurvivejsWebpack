const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');

const validate = require('webpack-validator');

const parts = require('./libs/parts');

const PATHS = {
    app:path.join(__dirname, 'app'),
    style:[
        path.join(__dirname,'node_modules','purecss'),
        path.join(__dirname,'app','index.css'),
    ],
    build:path.join(__dirname, 'build')
};

const common = {
    entry :{
        style:PATHS.style,
        app:PATHS.app
    },
    output:{
        path:PATHS.build,
        filename:'[name].js'
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|public)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },   
    plugins:[
        new HtmlWebpackPlugin({
            title:'Webpack demo',
            template:'./app/template.html'
        })
        
    ]
};

var config;

switch(process.env.npm_lifecycle_event){
    case 'build':
        config = merge(
            common,
            {
                devtool:'source-map',
                output:{
                    path:PATHS.build,
                    filename:'[name].[chunkhash].js',
                    chunkFilename:'[chunckhash.js]'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name:'vendor',
                entries:['react']
            }),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([PATHS.app])
            );
        break;
    default:
        config = merge(
            common,
            {
                devtool:'eval-source-map'
            },
            parts.setupCSS(PATHS.style),
            parts.devServer({
                host:process.env.HOST,
                port:process.env.PORT
            })
        );
}

module.exports =  validate(config);