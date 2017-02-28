const webpack = require('webpack');

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