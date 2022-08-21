# *Uranus-@Preview*

### New javascript frame.

English | [简体中文](./README.zh_hans.md)

* *__Pay Attention:__*
  * This project is Preview Version, so don't try to install!    

* *__Install:__* 

```node
npm i uranus -g
```

* *__Init Project:__*

```node
uranus init program-name
```

* *__ Configurating Packing Project Loacally (in package.json):__*

```json
"scripts": {
    "build": "esbuild ./src/index.jsx --bundle --jsx-factory=h --jsx-fragment=Fragment --outfile=./dist/index.out.js",
    //↑: Turning jsx into js, finally you can run this!
    "tsx-to-jsx": "npx tsc ./src/index.tsx --jsx preserve -t es2020 --outDir ./dist"
    //↑: Turning tsx into jsx
  }
```
* *__Packing Project Loacally:__*

```node
npm run tsx-to-jsx 
npm run build
```

* *__@Characteristics:__*
    * Simple: Esaiser syntax
    * Readable: Simple pattern
    * Lightweight: Taking smaller room
    * Supported Typescript (Typescript or Javascript Xml)
