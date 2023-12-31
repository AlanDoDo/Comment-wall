import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// import axios from 'axios'
// import VueAxios from 'vue-axios'

// 注册自己的组件
import YIKE from '@/components/yike/index'

const app = createApp(App)
app.use(router);
app.use(store);
// app.use(VueAxios,axios);
app.use(YIKE);

app.mount('#app')