---
title: 项目打包页面空白问题
---

## 解决办法


.vuepress/config.ts 设置base 为 `base: "", dest: './dist',`
```ts
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "",
  dest: './dist',
  locales: {
    "/": {
      lang: "zh-CN",
      title: "兀坐晴窗独饮茶",
      description: "可惜这是你和的她的婚礼, 而我只是嘉宾",
    },
  },
  theme,

  shouldPrefetch: false,
});

```

第二步 : 
找到 node_modules/@vuepress/client/dist/app.js 

在开头的导入部分 添加 createWebHashHistory,
```ts
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
    // 添加以hash的方式去读取
  createWebHashHistory,
  START_LOCATION
} from "vue-router";
```

然后在后面修改路由模式为 createWebHashHistory 即可

```ts
// src/router.ts
// var historyCreator = __VUEPRESS_SSR__ ? createMemoryHistory : createWebHistory;
// TODO 修改路由模式
var historyCreator = __VUEPRESS_SSR__ ? createMemoryHistory : createWebHashHistory;
```
