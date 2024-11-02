import { PersistedStateOptions } from "pinia-plugin-persistedstate"

/*

用于配置pinia持久化

 */

const piniaPersistConfig = (key:string,path?:string[])=>{
    const persist:PersistedStateOptions = {
        key,
        storage:localStorage,
        paths
    };
    return persist;
};

export default piniaPersistConfig