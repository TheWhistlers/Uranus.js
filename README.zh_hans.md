# *Uranus-@Preview*

### 一款新型的轻量级JavaScript框架

[English](./README.md) | 简体中文

* *__注意事项:__*
  * 本项目目前处于预览阶段，所以不要尝试安装！

* *__安装:__* 

```node
npm i uranus -g
```

* *__初始化项目:__*

```node
uranus init program-name
```

* *__配置打包指令 (在package.json内配置):__*

```json
"scripts": {
    "build": "esbuild ./src/index.jsx --bundle --jsx-factory=h --jsx-fragment=Fragment --outfile=./dist/index.out.js",
    //↑: 将jsx转译为js，最后可以执行.js文件
    "tsx-to-jsx": "npx tsc ./src/index.tsx --jsx preserve -t es2020 --outDir ./dist"
    //↑: 将tsx转译为jsx
  }
```
* *__打包生成指令:__*

```node
npm run tsx-to-jsx 
npm run build
```

* *__@特点:__*
    * 简单: 更简单的语法
    * 易读: 更简单的语法组合
    * 轻量: 占用很小的空间
    * 支持Typescript (TSX或JSX)
