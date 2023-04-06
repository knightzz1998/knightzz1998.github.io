import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "首页", icon: "discover", link: "/"},
    {
        text: "Java基础",
        icon: "java",
        prefix: "/java/",
        children: [
            {
                text: "面试篇",
                icon: "edit",
                link: "interview/",
            }
        ]
    },
    {
        text: "JVM",
        icon: "list",
        prefix: "/jvm/",
        children: [
            {
                text: "基础篇",
                icon: "edit",
                link: "note01/",
            },
            {
                text: "面试篇",
                icon: "edit",
                link: "interview01/",
            },
        ]
    },
    {
        text: "微服务",
        icon: "hot",
        prefix: "/service/",
        children: [
            {
                text: "Dubbo",
                icon: "edit",
                link: "Dubbo/",
            },
            {
                text: "Netty",
                icon: "edit",
                link: "Netty/",
            }
        ]
    },
    {
        text: "中间件",
        icon: "launch",
        prefix: "/middleware/",
        children: [
            {
                text: "RocketMQ",
                icon: "edit",
                link: "RocketMQ/",
            }
        ]
    },
    {
        text: "算法刷题",
        icon: "alias",
        prefix: "/leetcode/",
        children: [
            {
                text: "二叉树系列",
                icon: "edit",
                link: "binary_tree/",
            }
        ]
    },
    {
        text: "数据库",
        icon: "blog",
        prefix: "/db/",
        children: [
            {
                text: "Redis系列",
                icon: "edit",
                link: "redis/",
            }
        ]
    },
    {
        text: "Blog相关",
        icon: "blog",
        prefix: "/blog/",
        children: [
            {
                text: "issue",
                icon: "edit",
                link: "issue/",
            }
        ]
    },

]);
