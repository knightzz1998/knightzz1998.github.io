---
title: NIO入门
icon: note
date: 2022-01-12
category:
  - Netty实战
sidebar: heading
---



## NIO基础概念篇



简单介绍下NIO的一些基本的组件

### 1.NIO基础组件关系图

如下图所示, NIO的基本组件由 Selector、Channel、Buffer组成

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230112132056748.png" alt="image-20230112132056748" style="zoom:80%;" />

- 一个Thread对应一个Selector, 一个 `Thread` 对应多个Channel

- Selector(选择器), 作用是为了监听每个Channel的事件, 比如客户端有连接请求, 就会经过 Buffer, 发送到 Channel(这就是一个连接请求的事件(Event)), 被Selector监听到的话,就会由Selector绑定的Thread去处理, 这样的话, 假设没有事件发生的情况下, thread 可以去处理其他的任务, 不用一直阻塞

- Buffer就是一个数据块, 底层是由数组实现的, 可以实现双向读写, 它可以从Channel读取数据, 也可以向Channel写入数据, 需要使用flip 方法切换即可

  这一点和 BIO中有差别, BIO只能是输入流或者输出流





### 2.Buffer



