# About <u>ROUTER</u> modules, here is some references
## 1. Method of beforeEach  (Especially to,from,next)
### https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
## 2. The use of staticRouter and ... syntax
## 3. About layout component!!!
```typescript
    path:'/layout',
    component:()=>import("@/views/layout/index.vue"),
    redirect:HOME_URL,
    children:[]
```
**that means whenever the children components been visited, the /layout path will be throughout, because the <u>father/child</u> relationship**

### References
- 1. [A Blog](https://juejin.cn/post/7367549541958451252?searchId=20241103150501EE01096D06974611DE7E)
- 2. [Element Plus Official Doc](https://element-plus.org/zh-CN/component/layout.html)

## 4. Some verify step in dynamicRouter (will be improved soon...)
## 5. The slot usage on <router-view> component
```html
    <router-view v-slot="{ Component, route }">
```
![img.png](/png/router.png)
- [Slot in RouterView](https://router.vuejs.org/zh/guide/advanced/router-view-slot)
- [Transition](https://cn.vuejs.org/guide/built-ins/transition)
- [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive)
## 6. 