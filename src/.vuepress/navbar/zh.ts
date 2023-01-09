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
