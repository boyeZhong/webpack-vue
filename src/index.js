//通过esm的模块引入方式引入vue
import Vue from 'vue';
//引入css文件模块
/**
 * webpack打包只认识js文件，图片，css，字体这些都不认识，所有先把css转换成webpack认识的东西
 * 通过在假期 css-loader style-loader
 */
import './style/style.css';

//new一个根组件
new Vue({
    el:'#app',
    data:{
        msg:'哈哈'
    },
    /**
     * 
     *  1.  具体找到 node_moduels   下面的vue文件夹
        2.  找到package.json中 main 和 moudule选项的值 都是 vue.runtime     运行时的版本------------>使用render函数渲染模板
        3.  如果    通过    commonJS require的方式引入vue。引入的是main选项指定的文件。
        4.  如果    通过    esm inport的方式引入vue。引入的是module选项指定的文件
     */
    // render:function(h){
    //     // h->等价于document.createElement
    //     // h('p','我是一个p')->等价于 var pE1=document.createElement('p'); pE1.innerHtml='我是一个p'
    //     return  h('p','我是一个p')
    // }
})