
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as Icons from "@element-plus/icons-vue"

import App from './App.vue'
import router from './router'
import pinia from "@/stores";
const app = createApp(App)


//全局注册Icon组件
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof Icons]);
})

app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')
