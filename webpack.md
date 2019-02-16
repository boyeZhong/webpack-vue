##  前端自己的模块化之路

1.  script标签要啥引啥
2.  AMD规范（require.js）
3.  CMD规范（sea.js）
4.  ESM规范（es6.js）

##  webpack(打包)   之路

1.  手动压缩，手动打包
2.  grunt   JavaScript
3.  gulp    
4.  webpack（最火，最热，用得最多）

##  结合   webpack  搭建起来VUE的开发环境

1.  mkdir创建文件夹：mkdir webpack-vue
2.  npm init -y 初始化
3.  下载项目需要的资源包
    -   生产环境
        -   vue
            1.  npm install --save vue
    -   开发环境
        -   webpack
            1.  他是基于nodeJs，所以要确保安装了nodeJs  --save-dev工具类型加dev
            2.  npm install --save-dev  webpack 或者    npm install --save-dev  webpack@<version> （提供核心功能）
            3.  npm install --save-dev  webpack-cli(提供命令命令行)或者npm  install --save-dev webpack-command
4.  项目根目录下创建一个src文件夹（source：源文件），这个文件夹下面放源文件
5.  项目根目录下创建一个webpack.config.js文件（webpack配置文件）
6.  src下面创建一个js文件作为项目的入口文件--index.js
    -var a=10;
    -alert(a)
7.  配置webpack的文件
    -   四大核心
        0.  模式    指定这次打包是大的开发环境用的包（不压缩），还是生产环境的包（压缩）。4.x版本的webpack支持的
        1.  入口    指定webpack需要打包的项目的入口文件
        2.  出口    打包之后生成的文件需要放到哪个位置
        3.  加载器  默认情况下，webpack只是简单的打包js文件，如果需要打包css，img之类的文件则需要添加相对应的加载器，去处理这种类型的文件。
        4.  插件    插件是加载器干不了的事情，就可以使用插件来干.
    -   前三个，模式，入口，出口。必须配置
    -   如何配置
        1.  就是在webpack.config.js文件中，暴露一个对象，使用commonjs方式暴露
            -   module.exports={
                //模式
                mode:'development'，//开发模式|production生产模式
                //入口
                entry:'./src/index.js',//入口js文件的路径，也可以写绝对路径用path模块
                //出口
                output：{
                    //出口文件必须是绝对路径
                    path:path.resolve(__dirname,'./dist'),//在项目根目录下生成dist文件夹
                    filename:'bundle.js'//打包之后文件的名字
                },
                //插件，将index.html文件自动打包到dist文件夹里面
                plugins:[
                    //自动生成一个index.html文件在出口位置，并且会自动在生成的文件中引入打包的js文件
                    new HtmlWebpackPlugin();
                ]
            } 
8.  如何调用webpack开始打包
    -   没有全局安装webpack要执行下列命令。否则直接$webpack
        1.  ./node_modules/.bin/webpack
        2.  npx webpack(npm 5.x+新增的功能)
        3.  配置package.json的npm脚本

9.  根目录下面，新建一个index.html文件，作为页面的入口文件

### 项目的目录结构
-   dist    （最终生成的文件，这个文件夹才是最终需要上传到服务器上的代码）
-   node_modules（放资源包）
-   src     (源文件，需要被webpack打包的文件，都需要放在这个文件夹下面，都是一些自己写的项目模块)
    -   index.js    （这个是项目打包入口）
-   index.html  （这个是我们的项目页面入口）
-   packge-lock.json(包锁文件)
-   packge.json（项目依赖的资源包与项目的描述信息的文件）
-   webpack.config.js(webpack的配置文件)

-   ?思考上面三个文件，这三个文件都不是真真需要上线（将项目放到服务器）的内容。于是我们需要webpack打包（抽取其中真真需要用的内容）

### 问题集合
1.  2行代码打包之后生成了100行
    -   因为webpack自身默认让我们的代码能够使用ems的功能，所以他默认给我们写了这些东西
2.  如何将根目录下的index.html文件，让其在打包的时候自动生成到  dist    文件夹下去
    -   使用一款插件：HtmlWebpackPlugin
        -   命令：npm install --save-dev  html-webpack-plugin    
3.  需要使用的资源都是通过npm的方式去安装
    -   vue
        -   npm install   --save  vue
        -   哪个代码要使用vue，就在哪里使用require的方式引入就ok
        -   commonJS方式：  var xx=require（'路径'）
        -   通过es6的模块引入方式
        -   inport  '路径'  ||  inport  xxx from '路径'
4.  inport  Vue from    'vue';引入的vue到底是个啥
    1.  具体找到 node_moduels   下面的vue文件夹
    2.  找到package.json中 main 和 moudule选项的值
    3.  如果    通过    commonJS require的方式引入vue。引入的是main选项指定的文件。
    4.  如果    通过    esm inport的方式引入vue。引入的是module选项指定的文件

5.  import Vue from 'vue';默认不ok?
    -   vue.common.js   commonJs规范暴露    require方式引入
    -   vue.esm.js esm规范暴露  import方式引入

    -   vue.runtime     运行时的版本------------>使用render函数渲染模板
    -   vue没有.runtime 运行时+编译器的版本------>组件是使用template形式渲染模板只能用这个版本，也叫完整版

    -   修改引入的vue文件为完整版的esm版本(实质就是修改引入vue时使用的路径)
    -   请不要直接修改node_moduels下面的vue文件名，通过webpack配置文件修改别名
        -   在webpack.config.js文件中
            -   //解析
                resolve:{
                    //别名
                            vue/dist/vue.esm.js->a
                    alias：{
                        a:'vue/dist/vue.esm.js'
                    }
                }

### 插件的使用
####    打包时复制根目录index.html文件到dist文件夹的插件-->html-webpack-plugin
1.  找到需要使用插件并安装他
    -   命令：npm install --save-dev  html-webpack-plugin
2.  在webpack.config.js中引入他
    -   const   HtmlWebpackPlugin=require('html-webpack-pligin')
3.  在plugins选项中调用他，并按照他的文档中区做配置
    -   //插件，将index.html文件自动打包到dist文件夹里面
                plugins:[
                    //自动生成一个index.html文件在出口位置，并且会自动在生成的文件中引入打包的js文件
                    new HtmlWebpackPlugin({filename:'重命名文件',template:'./index.html',});
                ]
####    打包时复制lib文件夹到dist目录的插件-->copy-webpack-plugin
1.  找到需要使用插件并安装他
    -   命令：npm install --save-dev  copy-webpack-plugin
2.  在webpack.config.js中引入他
    -   const   CopyWebpackPlugin=require('copy-webpack-plugin')
3.  在plugins选项中调用他，并按照他的文档中区做配置
    -   plugins:[new CopyWebpackPlugin({from:'需要复制文件的路径', to:'需要放在的位置路径'})]

### 自动打包（开发时的打包）

  webpack-dev-server 资源包

  1. npm install --save-dev webpack-dev-server
  2. 配置
  3. webpack 启动 换成 webpack-dev-server 启动
  4. 启动以后不能直接使用，他并不会帮我们把dist文件夹更新在硬盘，而是存放在内存中
    -    1. 并且他启动的web服务是以项目根目录作为根目录，并不是dist文件夹  
    -    2. 因此我们要在webpack.config.js文件中配置webpack-dev-server
    -    3. 我们可以在webpack文档中的开发中找到devServer.contentBase查阅并配置
            - //开发服务配置webpack-dev-server
                devServer:{
                            //配置以这个文件路径作为web服务的根路劲
                            contentBase:path.resolve(__dirname,'./dist')
                        } 

###. 引入模块的方式去引入样式文件时报错

  css-loader      对css文件做转换 转换成 webpack所能识别的模块css文件
  style-loader    对上一步转换之后的 css模块文件再做解析，解析到页面的 style 标签中去。

  1. npm install --save-dev css-loader style-loader
  2. 配置

  
### 项目中使用 sass

  1. 是什么？
    css 的预处理语言。能让使用 js那样去使用 css。可以定义变量了，定义方法

  2. 好处

    1. 写样式会快
    2. 嵌套写法

    .box h1 {

    }

    .box h1 span {}

    .box h1 span  a{}

    .box {

      h1 {

        span {

          a {}
        }
      }
    }

  3. 除了 sass 。less styules  

  4. webpack 配置中如何使用sass

    1. 安装 sass-loader  （注意：除了安装sass-loader node-sass）
    2. 配置
    3. 使用

  5. sass 有两个文件后缀
    .scss （最常用）
    .sass