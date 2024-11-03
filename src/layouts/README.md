# This is a guideline of layouts module, as detail as I can to make me fully understand the usage of it

## 1. Record<K,T>
### It is used to create an Object type, which with type[K] of <u>key</u> attribute and type[T] of <u>value</u> attribute
### ---The K has been restricted with four types in this case---
- [Major/index.vue](./index.vue) in Line 13

## 2. Major dir
### Store the major Container components like <u>Header,Footed,Main,Menu...</u>
- [Container](https://element-plus.org/zh-CN/component/container.html)
## 3. Few Layout(?) dir
### About the whole pages layout, In which layout will be rendered depends on the /layouts/index.vue file
```shell
    <component :is="LayoutComponents[layout]"></component>
```
- [the layout type (.ts)](../stores/interface/index.ts)
- [Layout-element-plus](https://element-plus.org/zh-CN/component/layout.html)

## 4. How does the router pass-by /layout
### I have to commit that it confused me for a time, but finally I work out with it!
### <li>1. In [staticRouter](../router/modules/staticRouter.ts) when the router go through in HOME_URL, it will pass <u>/layout</u> path since the parent/children relationship</li>
```shell
    path:'/layout',
    component:()=>import("@/layouts/index.vue"),
    redirect:HOME_URL,
    children:[
        {
            path:HOME_URL,
            component:()=>import("@/views/home/index.vue")
        }
    ]
```
### <li>2. The children part is use static path currently, but it will be replaced by a dynamic method to add into it</li>
## 5. About the menuList in [index.vue](./LayoutVertical/index.vue) to [SubMenu.vue](./Major/Submenu/SubMenu.vue)
### menuList is a reactive array computed by a computed method
```shell
  const menuList = computed(() => globalStore.showMenuList);
  console.log("menuList", menuList.value);  //Proxy(Array)
```
- This is a mock list in [Global.ts](../stores/modules/global.ts)