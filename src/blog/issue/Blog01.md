---
title: GitHub Pages部署vuepress报错：JavaScript heap out of memory
---

## 常见问题


### GitHub Pages部署vuepress报错：JavaScript heap out of memory

- https://blog.csdn.net/qq_42937522/article/details/123387368

----

经过搜索常常得出了两种解决方案。

#### 1、使用 increase-memory-limit 插件

TypeScript 和 webpack 时的常见问题，项目过大时，使用 increase-memory-limit，增加node服务器内存限制。

安装：

npm install -g increase-memory-limit

进入工程目录执行：

increase-memory-limit

在执行上述操作后，然后执行npm run build 后，会报错：

'"node --max-old-space-size=4096"' 不是内部或外部命令，也不是可运行的程序

在高版本中移除了node命令，所以也不能解决。

2、修改cmd文件

在目录node_modules/.bin下打开ng.cmd和ngc.cmd文件，添加 --max_old_space_size=4096

但是因为最终部署在GitHub Pages，没有办法直接修改 node_modules 的文件，所以这种方法不行。

#### 解决方案

Node.js v8.0 开始，可以使用NODE_OPTIONS 环境变量来全局设置 max_old_space_size 来增加内存限制
```js
export NODE_OPTIONS=--max_old_space_size=4096
```
increase-memory-limit 将附加 --max-old-space-size=4096 到文件中的所有 node 调用中node_modules/.bin/*。

注意：如果在windows系统，可以使用命令

```shell
set NODE_OPTIONS=--max_old_space_size=4096
```
修改原来的github部署脚本
```yaml
name: Deploy GitHub Pages

# 触发条件：在 push 到 master 分支后
on:
  push:
    branches:
      - main

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 Ubuntu
    runs-on: ubuntu-latest
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      # 生成静态文件
      - name: Build
        run: npm install && export NODE_OPTIONS=--max_old_space_size=4096 &&npm run build

      # 部署到 GitHub Pages
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages
          FOLDER: docs/.vuepress/dist


```


### github pages 自定义域名失效
把 dist 目录下的文件全部提交到 gh-pages(或者 master) 分支上去作为 pages 的展示的内容，
但是 CNAME 文件没有提交上去，也就是说，vuepress 项目作为 blog 的 CNAME 文件（自定义域名）需要放在 .vuepress/public 中，而不是实际当前的根目录下（如果你的目录跟我类似的话）
