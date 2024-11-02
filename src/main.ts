
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as Icons from "@element-plus/icons-vue"

import App from './App.vue'
import router from './router'
import pinia from "@/stores";

import "@/styles/reset.scss"

//引入flex的相关样式，如flx-center
import '@/styles/common.scss'

//需要引入element-plus中的全局样式，不然局部样式不会生效！！
import 'element-plus/dist/index.css'

const app = createApp(App)


//全局注册Icon组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof Icons]);
})

app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
