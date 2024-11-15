import {createPinia} from "pinia";
import piniaPluginPersistedstat from "pinia-plugin-persistedstate"

const pinia= createPinia();
pinia.use(piniaPluginPersistedstat);

export default pinia