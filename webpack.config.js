
const HtmlWebpackPlugin=require('html-webpack-plugin');
const path=require('path');
const CopyWebpackPlungin=require('copy-webpack-plugin');
module.exports={
    //模式
    mode:'development',//开发模式||production生成模式
    //入口
    entry:'./src/index.js',//入口js文件的路劲，也可以使用绝对路径。但需要引入path模块
    //出口：
    output:{
        //出口文件必须使用绝对路径
        path:path.resolve(__dirname,'./dist'),//会在项目根目录下生成dist文件夹
        //设置文件打包之后的名字
        filename:'bundle.js'
    },
    //加载器
    module:{
        //定义加载器的规则
        rules:[
            {
                test:/\.css$/,//用正则的方式找到匹配的模块
                //注意这个加载器书写时有顺序，必须倒叙写，第一步骤写在最底下
                use:[
                    'style-loader',
                    'css-loader'
                ]//使用什么加载器去处理这个模块
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',//最后通过style-loader写到 网页上去
                    'css-loader',//将css文件转换成webpack认识的模块文件
                    'sass-loader'//将sass文件转换成css文件
                ]
            }
        ]

    },
    //插件，将index.html文件自动打包到dist文件夹里面使用HtmlWebpackPlugin插件，可以在webpack文档查询
    plugins:[
        //因为插件可能是多个，所以使用数组类型
        //自动生成一个index.html文件在出口位置，并且自动在生成的文件中引入js文件
        //详细配置可以在webpack官网的插件选项里面找到
        //https://github.com/jantimon/html-webpack-plugin#configuration
        new HtmlWebpackPlugin({
            filename:'entry.html',
            //让这个文件内容和根目录的html完全一致
            template:'./index.html',
        }),
        new CopyWebpackPlungin([{
            from:'./lib/jquery.min.js',
            to:'./lib'
        }])
    ],
    //解析
    resolve:{
        //别名  vue/dist/vue.esm.js->把这个路径赋值给vue。这个路径是node_modules里面我们安装的vue文件夹下的路径
        //因为我们是使用inport方式引入，所以要引入esm的js，并且要是完整版的vue文件
       alias:{
        vue:'vue/dist/vue.esm.js'
       }
    },
    //开发服务配置webpack-dev-server
    devServer:{
        //配置以这个文件路径作为web服务的根路劲
        contentBase:path.resolve(__dirname,'./dist')
    }
    

}