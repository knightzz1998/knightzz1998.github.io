---
title: 博客相关
---

## 配置

默认可以直接添加路径自动识别 "/jvm/", 
```js
import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "首页", icon: "discover", link: "/"},
    "/jvm/",
    "/service/",
    {
        text: "LeetCode刷题系列",
        icon: "note",
        prefix: "/leetcode/",
        children: [
            {
                text: "二叉树系列",
                icon: "edit",
                prefix: "binary_tree/",
                children: [
                    {
                        text: "二叉树的遍历",
                        icon: "edit",
                        link: "二叉树的遍历",
                    },
                    {
                        text: "其他",
                        icon: "edit",
                        link: "其他",
                    }
                ]
            }
        ]
    },
]);

```

其次就是需要在markdown文件中添加 formatter

```
---
title: dubbo环境搭建+整合SpringBoot
sidebar: heading
---

```

可以自动识别标题 
