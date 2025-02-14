//工具

//获取浏览器当前语言
export function getBrowserLang(){
    let browserLang = navigator.language ? navigator.language : "zh"  //navigator.browserLanguage 后期接口定义
    let defaultBrowserLang = "";
    if(["cn","zh","zh-cn"].includes(browserLang.toLowerCase())){
        defaultBrowserLang = "zh";
    }else{
        defaultBrowserLang = "en"
    }
    return defaultBrowserLang;
}


export function getNormalLang(){
    let defaultLang = "";
    defaultLang = "zhCn";
    return defaultLang;
}

//------扁平化菜单------
export function getFlatMenuList(menuList){
    let newMenuList = JSON.parse(JSON.stringify(menuList));
    return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}