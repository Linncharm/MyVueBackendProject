import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import {loadEnv,ConfigEnv,UserConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import {useRouter} from "vue-router";
import {envWrapper} from "./build/getEnv";
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
//通过解构赋值的方式从ConfigEnv中提取出data mode为string
export default defineConfig(({mode}:ConfigEnv):UserConfig => {
  //获取根目录
  const root = process.cwd();
  //根据mode和root的不同加载不同的 .env
  const env = loadEnv(mode,root);
  //获取环境变量
  /*
  Q：为什么不能直接用loadEnv加载的环境作为环境变量呢？？？
   */
  const viteEnv = envWrapper(env);

  ///调试
  console.log("mode",mode);
  console.log("root",root);
  console.log("env",env);
  console.log("viteEnv",viteEnv);

  return {
    root, //默认为index.html的根目录
    base:viteEnv.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server:{
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
    },
    plugins:[
        vue(),
    ]

  }
  /*plugins: [
    vue(),
    //vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },*/
  /*
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/var.scss";`
      }
    }
  },
   */
})
