# This is a guideline of layouts module, as detail as I can to make me fully understand the usage of it

## 1. Record<K,T>
### It is used to create an Object type, which with type[ K ] of <u>key</u> attribute and type[ T ] of <u>value</u> attribute
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

## 6. About the `h() , Map()` and `createComponentWrapper()` function in vue
```shell
  import {h} from "vue";
  
  const wrapperMap = new Map();
  function createComponentWrapper(component,route){
  if(!component){
    return;
  }
  console.log("route",route);
  console.log("component",component);
  const wrapperName = route.fullPath
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper){
    wrapper= {name:wrapperName,render:()=>h(component)};
  }
}
```
### The `h()` function is a core function in vue, it's an abbr for <u>*hyperscript*</u>,</br> used to create virtual DOM
### This createComponentWrapper function takes two parameters: component and route. Here is a detailed analysis of the function:

- The function first checks if the `component` parameter is falsy (null, undefined, etc.), and if so, it returns early, exiting the function.

- It then generates a unique `wrapper name` using the `fullPath` property of the `route` object.

- Next, it attempts to retrieve a wrapper component from a `wrapperMap` based on the generated `wrapperName`.

- If a wrapper component does not exist in the wrapperMap, the function creates a new wrapper object with the following properties:

  -   `name`: Set to the generated `wrapperName` for uniqueness.
  - `render`: A function that renders the original component using the `h()` function, which is typically used in Vue.js to create virtual DOM nodes.
  The newly created wrapper component is then added to the `wrapperMap` using the wrapperName as the key.

### Finally, the function returns the result of calling h(wrapper), which essentially wraps the original component inside the created wrapper component and returns a virtual node representing the wrapped component.
## 7. About module `@vueuse/core`
```shell

```
### Reference 
- [VueUse - Official Doc](https://vueuse.nodejs.cn/guide/)