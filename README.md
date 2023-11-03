# Comment-wall

Comment-wall一个简单而实用的网页功能，允许用户在网页上发布和显示留言。通过留言墙，用户可以互相交流、分享观点和参与讨论。

## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

##  Features

- **发布留言**：用户可以在留言墙上发布自己的留言或评论。每条留言包括作者信息、留言内容和发布时间。

- **显示留言**：留言墙会按照时间顺序将用户发布的留言显示出来。最新的留言会显示在最前面。

- **回复和互动**：其他用户可以对已发布的留言进行回复和互动，形成一种讨论的氛围。

- **匿名发布**：留言墙支持匿名发布功能，保护用户的隐私并鼓励更多人参与讨论。

- **管理和审核**：留言墙设有管理员账户，可以对留言进行监控和处理不适当的内容。

## 贡献和问题反馈

欢迎任何形式的贡献和问题反馈！如果你发现了 bug，或者有新的功能建议，请提交 issue 或者发送邮件给我。

## 开发记录

记录开发过程

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