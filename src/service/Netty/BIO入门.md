---
title: JavaBIO编程
icon: note
date: 2022-01-12
category:
  - Netty实战
---

## JavaBIO模型



### 1.基本概念



IO模型 : 使用什么样的通道去接收和发送数据, IO模型很大程度上决定了程序通信的性能

BIO模型 ：同步并阻塞传统的IO模型(阻塞型), 阻塞就是一个请求过来, 服务端必须要有一个线程去处理, 当连接成功以后, 进行数据传输时(IO), 此时已经不需要线程(CPU), 但是线程被阻塞, 不能处理别的任务, 就会造成资源的浪费



<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230113154315459.png" alt="image-20230113154315459" style="zoom: 67%;" />



1. Java BIO 就是传统的java io编程，其相关的类和接口在 java.io 

2. BIO(blocking I/O) ： 同步阻塞，服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销，可以通过**线程池机制改**善(实现多个客户连接服务器)。

3. BIO方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，程序简单易理解



### 2.适用场景





BIO方式适用于连接数目比较小且固定的架构,这种方式对服务器资源要求比较高,并发局限于应用中,JDK1.4以前的唯一选择，但程序简单易理解。



#### 2.1 存在的问题



- 每个请求都需要创建独立的线程，与对应的客户端进行数据Read，业务处理，数据 Write 。
- 当并发数较大时，需要创建大量线程来处理连接，系统资源占用较大。
- 连接建立后，如果当前线程暂时没有数据可读，则线程就阻塞在 Read 操作上，造成线程资源浪费



### 3.编程流程



1. 服务器端启动一个ServerSocket
2. 客户端启动Socket对服务器进行通信，默认情况下服务器端需要对每个客户 建立一个线程与之通讯
3. 客户端发出请求后, 先咨询服务器是否有线程响应，如果没有则会等待，或者被拒绝
4. 如果有响应，客户端线程会等待请求结束后，在继续执行





### 4.应用实例



#### 4.1 Server端



```java
package cn.knightzz.bio;


import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * @author 王天赐
 * @title: BIOServer
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-13 16:03
 */
@SuppressWarnings("all")
public class BIOServer {
    public static void main(String[] args) throws Exception {

        //线程池机制

        //思路
        //1. 创建一个线程池
        //2. 如果有客户端连接，就创建一个线程，与之通讯(单独写一个方法)

        ExecutorService newCachedThreadPool = Executors.newCachedThreadPool();

        //创建ServerSocket
        ServerSocket serverSocket = new ServerSocket(6666);

        System.out.println("服务器启动了");

        while (true) {

            System.out.println("线程信息 id =" + Thread.currentThread().getId() + " 名字=" + Thread.currentThread().getName());
            //监听，等待客户端连接
            System.out.println("等待连接....");
            final Socket socket = serverSocket.accept();
            System.out.println("连接到一个客户端");

            //就创建一个线程，与之通讯(单独写一个方法)
            newCachedThreadPool.execute(new Runnable() {
                public void run() { //我们重写
                    //可以和客户端通讯
                    handler(socket);
                }
            });

        }


    }

    //编写一个handler方法，和客户端通讯
    public static void handler(Socket socket) {

        try {
            System.out.println("线程信息 id =" + Thread.currentThread().getId() + " 名字=" + Thread.currentThread().getName());
            byte[] bytes = new byte[1024];
            //通过socket 获取输入流
            InputStream inputStream = socket.getInputStream();

            //循环的读取客户端发送的数据
            while (true) {

                System.out.println("线程信息 id =" + Thread.currentThread().getId() + " 名字=" + Thread.currentThread().getName());

                System.out.println("read....");
                int read =  inputStream.read(bytes);
                if(read != -1) {
                    System.out.println(new String(bytes, 0, read
                    )); //输出客户端发送的数据
                } else {
                    break;
                }
            }


        }catch (Exception e) {
            e.printStackTrace();
        }finally {
            System.out.println("关闭和client的连接");
            try {
                socket.close();
            }catch (Exception e) {
                e.printStackTrace();
            }

        }
    }
}

```



使用线程池优化, 每当有一个新的连接过来,就开一个线程去处理, 线程由线程池管理



#### 4.2 Client端



```java
package cn.knightzz.bio;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

/**
 * @author 王天赐
 * @title: BioClient
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-13 16:08
 */
public class BioClient {

    public static void main(String[] args) throws IOException {

        for (int i = 0; i < 10; i++) {
            int num = i;
            new Thread() {
                @Override
                public void run() {
                    try {
                        Socket socket = new Socket();
                        socket.connect(new InetSocketAddress("127.0.0.1", 6666));

                        OutputStream outputStream = socket.getOutputStream();

                        while(true) {
                            String msg = "我是" + num + "号";
                            outputStream.write(msg.getBytes());
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }.start();
        }
    }
}

```



开10个线程模拟10个客户端不停地向服务端请求连接并发送消息



