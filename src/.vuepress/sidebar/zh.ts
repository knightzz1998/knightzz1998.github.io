import {sidebar} from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    "/jvm/": [
        {
            // 必要的，分组的标题文字
            text: "基础篇",
            // 可选的, 分组标题对应的图标
            icon: "lightbulb",
            // 可选的, 分组标题对应的链接
            link: "note01/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "note01/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            collapsible: true,
            children: [
                "垃圾回收算法.md"
            ]
        },
        {
            // 必要的，分组的标题文字
            text: "面试篇",
            // 可选的, 分组标题对应的图标
            icon: "lightbulb",
            // 可选的, 分组标题对应的链接
            link: "interview01/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "interview01/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            collapsible: true,
            children: [
                "垃圾回收面试题汇总.md"
            ]
        },
    ],
    "/service/": [
        {
            // 必要的，分组的标题文字
            text: "Dubbo",
            // 可选的, 分组标题对应的图标
            icon: "IO",
            // 可选的, 分组标题对应的链接
            link: "Dubbo/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "Dubbo/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            // collapsible: true,
            children: [
                "Dubbo01.md"
            ]
        },
        {
            // 必要的，分组的标题文字
            text: "Netty",
            // 可选的, 分组标题对应的图标
            icon: "community",
            // 可选的, 分组标题对应的链接
            link: "Netty/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "Netty/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            // collapsible: true,
            children: [
                "BIO入门.md",
                "BIO入门.md",
                "Netty入门.md",
            ]
        }
    ],
    "/blog/": "structure",
    "/leetcode/": [
        {
            // 必要的，分组的标题文字
            text: "二叉树",
            // 可选的, 分组标题对应的图标
            icon: "launch",
            // 可选的, 分组标题对应的链接
            link: "binary_tree/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "binary_tree/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            collapsible: true,
            children: [
                "二叉树的深度.md",
                "二叉树的遍历.md",
                "对称二叉树.md",
                "平衡二叉树.md",
            ]
        }
    ],
    "/middleware/": [
        {
            // 必要的，分组的标题文字
            text: "RocketMQ",
            // 可选的, 分组标题对应的图标
            icon: "acitvate",
            // 可选的, 分组标题对应的链接
            link: "RocketMQ/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "RocketMQ/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            collapsible: true,
            children: [
                "RocketMQ环境搭建.md"
            ]
        }
    ],
    "/javabase/": [
        {
            // 必要的，分组的标题文字
            text: "Java基础面试题",
            // 可选的, 分组标题对应的图标
            icon: "java",
            // 可选的, 分组标题对应的链接
            link: "db/",
            // 可选的，会添加到每个 item 链接地址之前
            prefix: "db/",
            // 可选的, 设置分组是否可以折叠，默认值是 false,
            collapsible: true,
            children: [
                "JavaBase01.md",
                "JavaBase02.md"
            ]
        }
    ]
});
