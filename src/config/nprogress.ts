import NProgress from "nprogress"
import "/nprogress/nprogress.css"


//配置进度条
NProgress.configure({
    easing: "ease",
    speed: 300,
    minimum:0.5 //初始化时的最小百分比
})


//记得要导出
export default NProgress