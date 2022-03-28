# tetris 俄罗斯方块

> webpack + TS

环境：浏览器 + 模块化

webpakc:构建工具，根据入口文件寻找依赖，打包

# 工程搭建

1. 安装 `webpack` , 配置 `webpack.config.js`, 测试打包命令 `webpack --mode=production`

2. 安装 `html-webpack-plugin`  打包 html

3. 安装 `clean-webpack-plugin` 打包之前清空输出目录

4. 安装 `webpack-dev-server`

5. 安装`ts`的相应loader -> `ts-loader`(官方) or `awsome-typescript-loader`(民间) 
 - 它们依赖 `typescript`

# 游戏开发

单一职能原则：每个类只做更它相关的事
开闭原则：系统中的类，应该对扩展开发，对修改关闭

基于以上两个原则，系统中使用如下模式：
数据-界面分离模式
1. 所有的属性全部私有化
2. 使用公共的方法提供对属性的访问