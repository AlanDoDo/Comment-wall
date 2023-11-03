### 创建vue项目
```
vue create you-project
```

### md文件生成项目目录树
```
npm install mddir -g
```

### 目录
```
mddir
```

* |-- web
    * |-- .gitignore
    * |-- babel.config.js
    * |-- jsconfig.json
    * |-- Mr'Shi的开发文档.md
    * |-- package-lock.json
    * |-- package.json
    * |-- README.md
    * |-- vue.config.js
    * |-- mock/                // 模拟数据
    * |-- public/
        *  |-- favicon.ico
        *  |-- index.html
    * |-- src/
        *  |-- App.vue
        *  |-- main.js
        *  |-- api
        *  |-- assets/         // 静态资源目录
            *  |-- logo.png
            *  |-- fonts
            *  |-- images
        *  |-- components      // 公共组建目录
            *  |-- HelloWorld.vue
        *  |-- router/         // 路由配置目录
        *  |-- store/          // 状态管理目录
        *  |-- styles/         // 公共样式目录
        *  |-- utils/          // 工具函目录
        *  |-- views/          // 页面目录
    * |-- static/             // 静态资源目录，不会被打包

### 安装路由插件
```
npm install router --save
```

### 安装vuex插件
```
cnpm install vuex --save
```

### 安装less插件
```
cnpm install less less-loader --save
```

### 安装axios插件
```
cnpm install axios --save
```
如果在vue3中直接使用安装vue拓展axios插件
```
cnpm install vue-axios --save
```

### 安装lottie插件
```
cnpm install lottie-web --save
```


### main.js的插件引入
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(router);
app.use(store);
app.use(VueAxios,axios)

app.mount('#app')
```

### less全局引入
```
cnpm i style-resources-loader --save-dev
```

```
cnpm i vue-cli-plugin-style-resources-loader --save-dev
```

`vue.config.js`
```js
const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/commons.less")], // 引入全局less
    }
  },
}
```

### 引入iconfont字体图标
[iconfont](https://www.iconfont.cn/)

### video自动循环播放
其中自动循环播放: autoplay, 循环: loop, 如果有声音视频需要关闭声音才能自动播放: muted
```
<video src="@/assets/images/qm1.mp4" autoplay="autoplay" muted="muted" loop="loop" class="bg-video"></video>
```

### 引入mock模拟数据
```
cnpm install mockjs --save
```

### 字体包引入
```
@font-face {
    font-family: fa;
    src: url("@/assets/fonts/zysxt.ttf");
}

```

```
font-family: fa;
```

### 监听屏幕宽度变化
```
// 监听屏幕宽度变化
window.addEventListener('resize',this.noteWidth);
```

### 毛玻璃效果--样式
```
backdrop-filter: blur(10px);
```

### 打包
```
npm run build
```