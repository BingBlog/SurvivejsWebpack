const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function(options){
    return {
        devServer:{
            //
            historyApiFallback:true,
            //热加载配置
            hot:true,
            inline:true,
            //仅输出错误信息
            stats:'errors-only',

            host:options.host,//默认是 localhost
            port:options.port//默认是8080
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin({
                multiStep:true
            })
        ]
    }
}

exports.setupCSS = function(paths){
    return {
        module:{
            loaders:[
                {
                    test:/\.css$/,
                    loaders:['style','css'],
                    include:paths
                }
            ]
        }
    }
}

exports.minify = function(){
    return {
        plugins:[
            new webpack.optimize.UglifyJsPlugin({
                beautify:false,
                comments:false,
                compress:{
                    warnings:false,
                    drop_console:true
                },
                mangle:{
                    except:['$','webpackJsonp'],
                    screw_ie8:true,
                    keep_fnames:true
                }
            })
        ]
    };
}

exports.setFreeVariable = function(key,value){
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins:[
            new webpack.DefinePlugin(env)
        ]
    }
}

exports.extractBundle = function(options){
    const entry = {};
    entry[options.name] = options.entries;

    return {
        entry:entry,
        plugins:[
            new webpack.optimize.CommonsChunkPlugin({
                names:[options.name,'manifest']
            })
        ]
    };
}

exports.clean = function(path){
    return {
        plugins:[
            new CleanWebpackPlugin([path],{
                root:process.cwd()
            })
        ]
    }
}


// exports.extractCSS = function(paths){
//     return{
//         module:{
//             loaders:[
//                 {
//                     test:/\.css$/,
//                     loader:ExtractTextPlugin.extract('style','css'),
//                     include:paths
//                 }
//             ]
//         },
//         plugins:[
//             new ExtractTextPlugin('[name].[chunkhash].css')
//         ]
//     };
// }
exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
}