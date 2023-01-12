---
title: Netty入门
icon: note
date: 2022-01-12
category:
  - Netty实战
sidebar: heading
---



## 编写第一个Netty程序



### 项目搭建



创建一个maven项目, 添加下面的依赖 

```xml
<dependencies>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
    </dependencies>
```



### Netty Server端



```java
package cn.knightzz.netty.start;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.sctp.nio.NioSctpServerChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import lombok.extern.slf4j.Slf4j;

/**
 * @author 王天赐
 * @title: NettyServer
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-04 14:35
 */
@SuppressWarnings("all")
@Slf4j
public class NettyServer {

    public static void main(String[] args) {

        // 1. 启动器, 用于组装netty组件
        new ServerBootstrap()
                // 2. Selector + Thread = EventLoop 用于处理当前线程的事件
                .group(new NioEventLoopGroup())
                // 3. 选择服务器的ServerSockerChannel 实现, 基于NIO的ServerSocketChannel
                .channel(NioServerSocketChannel.class)
                // 4. boss负责处理链接,处理读写, 决定work(child)能执行那些操作
                .childHandler(
                        // 代表和客户端进行数据读写的通道
                        new ChannelInitializer<NioSocketChannel>() {
                    @Override
                    protected void initChannel(NioSocketChannel ch) throws Exception {
                        // 添加具体的Handler
                        // 将ByteBuf 转换为字符串
                        ch.pipeline().addLast(new StringDecoder());
                        // 自定义的处理类
                        ch.pipeline().addLast(new ChannelInboundHandlerAdapter(){
                            @Override
                            public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
                                System.out.println(msg);
                            }
                        });
                    }
                })
                .bind(6789);


    }

}

```





### Netty Client 端



```java
package cn.knightzz.netty.start;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.sctp.nio.NioSctpChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.string.StringEncoder;
import lombok.extern.slf4j.Slf4j;

import java.net.InetSocketAddress;

/**
 * @author 王天赐
 * @title: NettyClient
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-04 14:35
 */
@SuppressWarnings("all")
@Slf4j
public class NettyClient {

    public static void main(String[] args) throws InterruptedException {

        new Bootstrap()
                // 2. 添加Eventloop
                .group(new NioEventLoopGroup())
                // 3. 选择客户端channel实现
                .channel(NioSocketChannel.class)
                // 添加处理器
                .handler(new ChannelInitializer<NioSocketChannel>() {

                    @Override
                    protected void initChannel(NioSocketChannel ch) throws Exception {
                        ch.pipeline().addLast(new StringEncoder());
                    }
                })
                .connect(new InetSocketAddress("localhost", 6789))
                .sync()
                .channel()
                .writeAndFlush("hello world!");


    }
}


```





## Netty组件详解



### Channel





