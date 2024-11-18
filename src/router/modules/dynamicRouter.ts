import router from "@/router";
import useUserStore from "@/stores/modules/user";
import {HOME_URL,LOGIN_URL} from "@/config/constants";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";




export const initDynamicRouter = (msg:number) => {
    const userStore = useUserStore();

    try {
        if(userStore.token != ""){
            ElMessage.success(msg)
            router.push(HOME_URL);
        }else {
            ElMessage.error(msg);
            userStore.setToken("");
            router.replace(LOGIN_URL);
        }
    }catch (e) {

        return Promise.reject(e);
    }
}