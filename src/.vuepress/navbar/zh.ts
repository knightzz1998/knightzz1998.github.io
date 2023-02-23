import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {text: "首页", icon: "discover", link: "/"},
    {
        text: "Java基础",
        icon: "note",
        prefix: "/javabase/",
        children: [
            {
                text: "面试篇",
                icon: "edit",
                prefix: "interview/",
                children: [
                    {
                        text: "Java基础知识面试篇(上)",
                        icon: "edit",
                        link: "JavaBase01",
                    },
                    {
                        text: "Java基础知识面试篇(中)",
                        icon: "edit",
                        link: "JavaBase02",
                    }
                ]
            }
        ]
    },
    {
        text: "JVM",
        icon: "book",
        prefix: "/jvm/",
        children: [
            {
                text: "基础篇",
                icon: "edit",
                prefix: "note01/",
                children: [
                    {
                        text: "垃圾回收算法",
                        icon: "edit",
                        link: "垃圾回收算法",
                    }
                ]
            },
            {
                text: "面试篇",
                icon: "edit",
                prefix: "interview01/",
                children: [
                    {
                        text: "垃圾回收面试题",
                        icon: "edit",
                        link: "垃圾回收面试题汇总",
                    }
                ]
            },
        ]
    },
    {
        text: "微服务",
        icon: "note",
        prefix: "/service/",
        children: [
            {
                text: "Dubbo",
                icon: "edit",
                prefix: "Dubbo/",
                children: [
                    {
                        text: "Dubbo环境搭建",
                        icon: "edit",
                        link: "Dubbo01",
                    }
                ]
            },
            {
                text: "Netty",
                icon: "edit",
                prefix: "Netty/",
                children: [
                    {
                        text: "BIO入门",
                        icon: "edit",
                        link: "BIO入门",
                    },
                    {
                        text: "NIO入门",
                        icon: "edit",
                        link: "NIO入门",
                    },
                    {
                        text: "Netty入门",
                        icon: "edit",
                        link: "Netty入门",
                    }
                ]
            }
        ]
    },
    {
        text: "中间件",
        icon: "note",
        prefix: "/middleware/",
        children: [
            {
                text: "RocketMQ",
                icon: "edit",
                prefix: "RocketMQ/",
                children: [
                    {
                        text: "RocketMQ环境搭建",
                        icon: "edit",
                        link: "RocketMQ环境搭建",
                    }
                ]
            }
        ]
    },
    {
        text: "LeetCode",
        icon: "note",
        prefix: "/leetcode/",
        children: [
            {
                text: "二叉树系列",
                icon: "edit",
                prefix: "binary_tree/",
                children: [
                    {
                        text: "二叉树题解",
                        icon: "edit",
                        link: "二叉树题解",
                    }
                ]
            }
        ]
    },
    "/blog/",
]);
