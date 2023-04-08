---
title: GitHub Pages部署vuepress报错：JavaScript heap out of memory
---

## 常见问题


GitHub Pages部署vuepress报错：JavaScript heap out of memory

- https://blog.csdn.net/qq_42937522/article/details/123387368

github pages 自定义域名失效
把 dist 目录下的文件全部提交到 gh-pages(或者 master) 分支上去作为 pages 的展示的内容，
但是 CNAME 文件没有提交上去，也就是说，vuepress 项目作为 blog 的 CNAME 文件（自定义域名）需要放在 .vuepress/public 中，而不是实际当前的根目录下（如果你的目录跟我类似的话）
