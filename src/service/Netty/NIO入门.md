---
title: JavaNIO编程
icon: note
date: 2022-01-12
category:
  - Netty实战
---

# JavaNIO编程



## 1.NIO基本介绍



> **Java NIO** 全称 `java non-blocking IO`，是指 JDK 提供的新API。从 JDK1.4 开始，Java 提供了一系列改进的输入/输出
> 的新特性，被统称为 NIO(即 New IO)，是同步非阻塞的

- NIO 相关类都被放在 java.nio 包及子包下，并且对原 `java.io` 包中的很多类进行改写
- NIO 有三大核心部分：Channel(通道)，Buffer(缓冲区), Selector(选择器)
- NIO是 面向缓冲区 ，或者面向 块 编程的。数据读取到一个它稍后处理的缓冲区，需要时可在缓冲区中前后移动，这就增加了处理过程中的灵活性，使用它可以提供非阻塞式的高伸缩性网络
- Java NIO的非阻塞模式，使一个线程从某通道发送请求或者读取数据，但是它仅能得到目前可用的数据，如果目前没有数据可用时，就什么都不会获取，而不是保持线
  程阻塞，所以直至数据变的可以读取之前，该线程可以继续做其他的事情。 非阻塞写也是如此，一个线程请求写入一些数据到某通道，但不需要等待它完全写入，这
  个线程同时可以去做别的事情。【后面有案例说明】
- 通俗理解：NIO是可以做到用一个线程来处理多个操作的。假设有10000个请求过来,根据实际情况，可以分配50或者100个线程来处理。不像之前的阻塞IO那样，非得分
  配10000个。
- HTTP2.0使用了多路复用的技术，做到同一个连接并发处理多个请求，而且并发请求的数量比HTTP1.1大了好几个数量级。





## 2.NIO与BIO的比较



- BIO 以流的方式处理数据,而 NIO 以块的方式处理数据,块 I/O 的效率比流 I/O 高很多

- BIO 是阻塞的，NIO 则是非阻塞的

- **BIO基于字节流和字符流**进行操作，而 **NIO 基于 Channel(通道)和 Buffer(缓冲区)**进行操作，数据总是从通道读取到缓冲区中，或者从缓冲区写入到通道中。

  Selector(选择器)用于监听多个通道的事件（比如：连接请求，数据到达等），因此使用**单个线程就可以监听多个客户端**通道





## 3.NIO核心原理



### 核心组件关系图



<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230112132056748.png" alt="image-20230112132056748" style="zoom:80%;" />

- 每个 channel 都会对应一个Buffer 
- Selector 对应一个线程， 一个线程对应多个channel(连接)
- 该图反应了有三个channel 注册到 该 Selector
- 程序切换到哪个 channel 是有事件决定的, Event 就是一个重要的概念
- Buffer 就是一个内存块 ， 底层是有一个数组
- 数据的读取写入是通过Buffer, 这个和BIO , BIO 中要么是输入流，或者是输出流, 不能双向，但是NIO的Buffer 是可以读也可以写, 需要 flip 方法切换
- channel 是双向的, 可以返回底层操作系统的情况, 比如`Linux`, 底层的操作系统通道就是双向的.





### 缓冲区

#### 基本介绍 



**缓冲区**（Buffer）：

- 缓冲区本质上是一个可以读写数据的内存块，可以理解成是一个容器对象(含数组)
- 该对象提供了一组方法，可以更轻松地使用内存块，，缓冲区对象内置了一些机制，能够跟踪和记录缓冲区的状态变化情况。
- Channel 提供从文件、网络读取数据的渠道，但是读取或写入的数据都必须经由 Buffer



 <img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230113192829335.png" alt="image-20230113192829335" style="zoom:67%;" />

#### Buffer类



在 NIO 中，Buffer 是一个顶层父类，它是一个抽象类, 类的层级关系图

![image-20230113193057119](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230113193057119.png)



**常用Buffer子类一览**



- ByteBuffer，存储字节数据到缓冲区
- ShortBuffer，存储字符串数据到缓冲区
- CharBuffer，存储字符数据到缓冲区
- IntBuffer，存储整数数据到缓冲区
- LongBuffer，存储长整型数据到缓冲区
- DoubleBuffer，存储小数到缓冲区
- FloatBuffer，存储小数到缓冲区





Buffer类定义了所有的缓冲区都具有的四个属性来提供关于其所包含的数据元素 : 

|   属性   |                             描述                             |
| :------: | :----------------------------------------------------------: |
| Capacity | 容量，即可以容纳的最大数据量；在缓冲区创建时被设定并且不能改变 |
|  Limit   | 表示缓冲区的当前终点，不能对缓冲区超过极限的位置进行读写操作。且极限 |
| Position | 位置，下一个要被读或写的元素的索引，每次读写缓冲区数据时都会改变改值， |
|   Mark   |                             标记                             |



mark 是标记一个指定的下标, 调用相关方法可以回到这个标记的位置



#### 相关方法



```java
public abstract class Buffer {
		//JDK1.4时，引入的api
    	public final int capacity( )//返回此缓冲区的容量
        public final int position( )//返回此缓冲区的位置
        public final Buffer position (int newPositio)//设置此缓冲区的位置
        public final int limit( )//返回此缓冲区的限制
        public final Buffer limit (int newLimit)//设置此缓冲区的限制
        public final Buffer mark( )//在此缓冲区的位置设置标记
        public final Buffer reset( )//将此缓冲区的位置重置为以前标记的位置
        public final Buffer clear( )//清除此缓冲区, 即将各个标记恢复到初始状态，但是数据并没有真正擦除, 后面操作会覆盖
        public final Buffer flip( )//反转此缓冲区
        public final Buffer rewind( )//重绕此缓冲区
        public final int remaining( )//返回当前位置与限制之间的元素数
        public final boolean hasRemaining( )//告知在当前位置和限制之间是否有元素
        public abstract boolean isReadOnly( );//告知此缓冲区是否为只读缓冲区
    //JDK1.6时引入的api
    public abstract boolean hasArray();//告知此缓冲区是否具有可访问的底层实现数组
    public abstract Object array();//返回此缓冲区的底层实现数组
    public abstract int arrayOffset();//返回此缓冲区的底层实现数组中第一个缓冲区元素的偏移量
    public abstract boolean isDirect();//告知此缓冲区是否为直接缓冲区
}
```





#### ByteBuffer



从前面可以看出对于 Java 中的基本数据类型(boolean除外)，都有一个 Buffer 类型与之相对应

最常用的自然是 `ByteBuffer`类(二进制数据), 该类的主要方法如下 : 



```java
public abstract class ByteBuffer {
//缓冲区创建相关api
    public static ByteBuffer allocateDirect(int capacity)//创建直接缓冲区
    public static ByteBuffer allocate(int capacity)//设置缓冲区的初始容量
    public static ByteBuffer wrap(byte[] array)//把一个数组放到缓冲区中使用
    //构造初始化位置offset和上界length的缓冲区
    public static ByteBuffer wrap(byte[] array,int offset, int length)
    //缓存区存取相关API
    public abstract byte get();//从当前位置position上get，get之后，position会自动+1
    public abstract byte get (int index);//从绝对位置get
    public abstract ByteBuffer put (byte b);//从当前位置上添加，put之后，position会自动+1
    public abstract ByteBuffer put (int index, byte b);//从绝对位置上put
}
```





### 通道



#### 基本介绍



1. NIO的通道类似于流，但有些区别如下 : 

- 通道可以同时进行读写，而流只能读或者只能写
- 通道可以实现异步读写数据
- 通道可以从缓冲读数据，也可以写数据到缓冲



2. BIO 中的 stream 是单向的，例如 FileInputStream 对象只能进行读取数据的操作，而 NIO 中的通道(Channel)是双向的，可以读操作，也可以写操作

3. Channel在NIO中是一个接口 `public interface Channel extends Closeable{}` 

4. 常用的 Channel 类有：FileChannel、DatagramChannel、ServerSocketChannel 和SocketChannel。
   ServerSocketChanne 类似 ServerSocket , SocketChannel 类似 Socket

5. FileChannel 用于文件的数据读写, DatagramChannel 用于 UDP 的数据读写, ServerSocketChannel 和 SocketChannel 用于 TCP

   的数据读写



#### FileChannel



FileChannel主要用来对本地文件进行 IO 操作，常见的方法有 ： 

```java
// 从通道读取数据并放到缓冲区中
public int read(ByteBuffer dst)
//把缓冲区的数据写到通道中
public int write(ByteBuffer src)
//从目标通道中复制数据到当前通道
public long transferFrom(ReadableByteChannel src, long position, long count)
//把数据从当前通道复制给目标通道
public long transferTo(long position, long count, WritableByteChannel target)
```



### 选择器



#### 基本介绍



Java 的 NIO，用非阻塞的 IO 方式。可以用一个线程，处理多个的客户端连接，就会使用到`Selector`(选择器)

Selector 能够检测多个注册的通道上是否有事件发生, (注意:多个Channel以事件的方式可以注册到同一个Selector) 

- 如果有事件发生，便获取事件然后针对每个事件进行相应的处理。
- 这样就可以只用一个单线程去管理多个通道，也就是管理多个连接和请求



只有在 连接/通道 真正有读写事件发生时，才会进行读写，就大大地减少了系统开销，并且不必为每个连接都创建一个线程，不用去维护多个线程

避免了多线程之间的上下文切换导致的开销



#### 特别说明 



1. Netty 的 IO 线程 `NioEventLoop` 聚合了 `Selector`(选择器，也叫多路复用器)，可以同时并发处理成百上千个客户端连接。

2. 当线程从某客户端 `Socket` 通道进行读写数据时，若没有数据可用时，该线程可以进行其他任务。

3. 线程通常将非阻塞 IO 的空闲时间用于在其他通道上执行 IO 操作，所以单独的线程可以管理多个输入和输出通道。

4. 由于读写操作都是非阻塞的，这就可以充分提升 IO线程的运行效率，避免由于频繁 I/O 阻塞导致的线程挂起。

5. 一个 I/O 线程可以并发处理 N 个客户端连接和读写操作，这从根本上解决了传统同步阻塞 I/O 一连接一线程模型，架构的性能、弹性伸缩能力和可靠性都得到了极大的提升。



#### 注意事项



**关于Buffer 和 Channel的注意事项和细节** 



1. `ByteBuffer` 支持类型化的`put`和`get`,`put`放入的是什么数据类型，get就应该使用相应的数据类型来取出，

   否则可能有`BufferUnderflowException` 异常。

2) 可以将一个普通Buffer 转成只读Buffer
3) NIO 还提供了 MappedByteBuffer， 可以让文件直接在内存（堆外的内存）中进行修改， 而如何同步到文件由NIO 来完成. 
4) 前面我们讲的读写操作，都是通过一个Buffer 完成的，NIO 还支持 通过多个`Buffer` (即 Buffer 数组) 完成读写操作，即 Scattering 和 Gathering





#### 相关方法 



```java
Selector 类是一个抽象类, 常用方法和说明如下:
public abstract class Selector implements Closeable {
//得到一个选择器对象
public static Selector open();
//监控所有注册的通道，当其中有 IO 操作可以进行时
// 将对应的 SelectionKey 加入到内部集合中并返回，参数用来设置超时时间
public int select(long timeout);
//从内部集合中得到所有的 SelectionKey
public Set<SelectionKey> selectedKeys();
// 返回所有绑定的 SelectionKey
public abstract Set<SelectionKey> keys();
}
```



注意 : 

- `selector.keys` 返回当前所有注册在selector中channel的selectionKey
- `selector.selectedKeys()` 返回注册在selector中等待IO操作(及有事件发生)`channel`的`selectionKey`。
- 参考 https://blog.csdn.net/weixin_39802680/article/details/115458231



#### 注意事项



- NIO中的 `ServerSocketChannel`功能类似`ServerSocket`，`SocketChannel`功能类似Socket

- Selector 相关方法 

  ```java
  selector.select()//阻塞
  selector.select(1000);//阻塞1000毫秒，在1000毫秒后返回
  selector.wakeup();//唤醒selector
  selector.selectNow();//不阻塞，立马返还
  ```



下面的 Selector 轮训的代码 

```java
 try {

            int count = selector.select();

            if (count > 0) {

                // 获取的所有事件数, SelectionKey 就代表这个是事件, 注意和 Channel与Selector 绑定区分
                // 每个 SelectionKey代表的就是对应通道的就绪事件, Selector不会自己移除这些事件, 我们需要在迭代末尾手动移除,

                // 注意区分
                // selector.keys 返回当前所有注册在selector中channel的selectionKey
                // selector.selectedKeys() 返回注册在selector中等待IO操作(及有事件发生)channel的selectionKey。
                // https://blog.csdn.net/weixin_39802680/article/details/115458231
                Iterator<SelectionKey> keyIterator = selector.selectedKeys().iterator();
                while (keyIterator.hasNext()) {

                    // 拿到key
                    SelectionKey key = keyIterator.next();

                    // 确定是否是读事件
                    if (key.isReadable()) {
                        // 获取channel
                        SocketChannel currentChannel = (SocketChannel) key.channel();

                        // 创建缓冲区
                        ByteBuffer buffer = ByteBuffer.allocate(1024);

                        currentChannel.read(buffer);

                        String msg = new String(buffer.array());

                        log.debug("{}", msg);
                    }

                    // SelectionKey在被轮询后需要remove()。注册过的channel信息会以SelectionKey的形式存储在selector.keys()中。
                    // 也就是说每次select()后的selectedKeys迭代器中是不能还有成员的，但keys()中的成员是不会被删除的(以此来记录channel信息)。
                    // selector不会自己删除selectedKeys()集合中的selectionKey，那么如果不人工remove()，
                    // 将导致下次select()的时候selectedKeys()中仍有上次轮询留下来的信息，这样必然会出现错误。

                    // remove移除的是当前指针指向的元素, 也就是 key
                    keyIterator.remove();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

```

重点注意, 在轮询完当前的 SelectionKey 的时候, 需要移除 SelectionKey, 否则它会一直存在在Set集合中

- SelectionKey在被轮询后需要remove()。注册过的channel信息会以SelectionKey的形式存储在selector.keys()中。也就是说每次select()后的selectedKeys迭代器中是不能还有成员的，但keys()中的成员是不会被删除的(以此来记录channel信息)。
- selector不会自己删除selectedKeys()集合中的selectionKey，那么如果不人工remove()，将导致下次select()的时候selectedKeys()中仍有上次轮询留下来的信息，这样必然会出现错误。



### NIO非阻塞编程



1. 当客户端连接时，会通过 ServerSocketChannel 得到 SocketChannel
2. Selector 进行监听 select 方法, 返回有事件发生的通道的个数. 
3. 将 socketChannel 注册到 Selector上, register(Selector sel, int ops), 一个 selector 上可以注册多个 SocketChannel
4. 注册后返回一个 SelectionKey, 会和该 Selector 关联(集合)
5. 进一步得到各个 SelectionKey (有事件发生)
6. 在通过 SelectionKey 反向获取 SocketChannel , 方法 channel()
7. 可以通过得到的 channel, 完成业务处理





## 4.NIO编程



### NIO入门案例 



编写一个 NIO 入门案例，实现服务器端和客户端之间的数据简单通讯(非阻塞)



#### NIO Server



```java

package cn.knightzz.nio.start.noblock;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.util.Iterator;
import java.util.Set;

/**
 * @author 王天赐
 * @title: NioServer
 * @projectName hm-netty-codes
 * @description: NIO服务端
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-12 14:21
 */
@Slf4j
public class NioServer {

    public void run(){

        try{
            // 1. 创建ServerSocketChannel对象
            ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
            // 绑定监听的端口
            serverSocketChannel.socket().bind(new InetSocketAddress(6666));
            // 设置为非阻塞
            // https://developer.aliyun.com/article/455617
            // 注意阻塞与非阻塞的区别, 线程 == CPU , 而 IO操作是不需要CPU的,
            // 假设 client => "hello world" server, 在 client与server连接完成以后, 就不需要线程去处理了, 剩下的就是 IO操作
            // 也就是说 读取传过来的 "hello world" 这个过程 (IO并不只限于本地文件读取, 也包括网络信息的传输)
            // 在这个过程, 线程就空闲下来了, 但是由于是阻塞的, 线程就需要挂起等待, 等待IO结束, 也无法去处理其他的任务
            // 所以, 一个线程只能处理一个连接,如果同时来10个client 连接server, server就要创建10个线程去处理
            // 非阻塞的话, 当一个连接在在执行IO操作时, 这个线程就可以去处理别的连接请求或者其他需要CPU的任务

            serverSocketChannel.configureBlocking(false);

            // 2. 创建Selector对象
            Selector selector = Selector.open();

            // 3. 将ServerSocketChannel注册到 Selector, 注册事件为 ACCEPT, 当触发这个事件的时候, Select就会监听到
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

            // 4. 循环等待客户端连接

            while(true) {


                // select 的返回值是监听到SelectionKey的个数, 也就是事件的个数
                while(selector.select(1000) == 0) {
                    log.debug("服务器等待了 1s, 无事发生 ... ");
                    continue;
                }

                // 获取监听到的事件的个数
                Set<SelectionKey> selectionKeys = selector.selectedKeys();
                // 遍历 selectionKeys
                Iterator<SelectionKey> selectionKeyIterator = selectionKeys.iterator();

                while(selectionKeyIterator.hasNext()) {
                    // 获取事件类型
                    SelectionKey key = selectionKeyIterator.next();

                    // 根据具体的事件类型去处理
                    solutionByEvent(key, serverSocketChannel, selector);

                    // 移除当前的key, 防止重复处理
                    // 迭代器除了自己提供的修改集合方法, 不能使用其他的迭代器修改集合内的方法
                    selectionKeyIterator.remove();
                }

            }
        }catch (IOException e){
            e.printStackTrace();
        }

    }

    private void solutionByEvent(SelectionKey key, ServerSocketChannel serverSocketChannel,Selector selector) throws IOException {

        // 如果是 ACCEPT , 也就是说有新客户端连接
        if(key.isAcceptable()) {

            // 对应该客户端生成一个SocketChannel
            SocketChannel socketChannel = serverSocketChannel.accept();
            log.debug("客户端连接成功, 创建 SocketChannel {}", socketChannel.hashCode());
            // 设置客户端为非阻塞
            socketChannel.configureBlocking(false);
            // 将SocketChannel注册到Selector, 类型为 READ, 同时绑定一个Buffer, 用于缓存数据
            socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));


        }else if(key.isReadable()) {
            // 发生 READ 事件

            // 1. 通过key反向获取到channel
            SocketChannel channel = (SocketChannel) key.channel();
            // 2. 获取到该Channel关联的Buffer
            ByteBuffer buffer = (ByteBuffer) key.attachment();
            // 将channel中的数据写入到Buffer
            channel.read(buffer);

            log.debug("client_{}: {}", channel.hashCode(), new String(buffer.array()));

            String msg = "Hello , I am server , I receive your message!" ;
            ByteBuffer wrap = ByteBuffer.wrap(msg.getBytes());
            channel.write(wrap);
        }
    }

    public static void main(String[] args) throws IOException {

        NioServer server = new NioServer();
        server.run();
    }

}

```



#### NIO Client



```java

package cn.knightzz.nio.start.noblock;

import io.netty.buffer.ByteBuf;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;

/**
 * @author 王天赐
 * @title: NioClient
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-12 14:21
 */
@Slf4j
public class NioClient {


    public void run() throws IOException {

        // 创建一个网络通道
        SocketChannel channel = SocketChannel.open();
        // 设置非阻塞
        channel.configureBlocking(false);

        // 服务器的ip和端口
        InetSocketAddress address = new InetSocketAddress("127.0.0.1", 6666);

        if(!channel.connect(address)) {

            while (!channel.finishConnect()) {
                log.debug("因为连接需要时间, 客户端不会被阻塞, 可以去执行其他的任务");
            }
        }
        // 连接成功的话, 就
        String string = "Hello I am a NIO client";
        // 使用ByteBuffer包裹
        ByteBuffer buffer = ByteBuffer.wrap(string.getBytes());

        // 写入数据
        channel.write(buffer);

        ByteBuffer buf = ByteBuffer.allocate(1024);
        // read 返回值是读取的字节数、0、或者-1。 如果是阻塞式Channel，read 至少返回1 或者-1；如果是非阻塞式Chanel，read 可能会返回0

        while(channel.read(buf) == 0) {
        }

        log.debug("server : {}", new String(buf.array()));

        System.in.read();
    }

    public static void main(String[] args) throws IOException {

        NioClient client = new NioClient();
        client.run();
    }

}

```





### SelectionKey



#### 事件状态 



SelectionKey，表示 Selector 和网络通道的注册关系, 共四种:

- int OP_ACCEPT：有新的网络连接可以 accept，值为 16
- int OP_CONNECT：代表连接已经建立，值为 8
- int OP_READ：代表读操作，值为 1
- int OP_WRITE：代表写操作，值为 4

源码中：

**public static final int** **OP_READ = 1 << 0;**

**public static final int** **OP_WRITE = 1 << 2;**

**public static final int** **OP_CONNECT = 1 << 3;**

**public static final int** **OP_ACCEPT = 1 << 4;**





#### 相关方法



```java
public abstract class SelectionKey {
    public abstract Selector selector();//得到与之关联的Selector 对象
    public abstract SelectableChannel channel();//得到与之关联的通道
    public final Object attachment();//得到与之关联的共享数据
    public abstract SelectionKey interestOps(int ops);//设置或改变监听事件
    public final boolean isAcceptable();//是否可以 accept
    public final boolean isReadable();//是否可以读
    public final boolean isWritable();//是否可以写
}
```





### ServerSocketChannel



ServerSocketChannel 在服务器端监听新的客户端 Socket 连接

**相关方法如下** ; 

```java
public abstract class ServerSocketChannel extends AbstractSelectableChannel implements NetworkChannel{
    // 得到一个 ServerSocketChannel 通道
    public static ServerSocketChannel open()，
    // 设置服务器端端口号
    public final ServerSocketChannel bind(SocketAddress local)
    // 设置阻塞或非阻塞模式，取值 false 表示采用非阻塞模式
    public final SelectableChannel configureBlocking(boolean block)
    // 接受一个连接，返回代表这个连接的通道对象
    public SocketChannel accept()
    // 注册一个选择器并设置监听事件
    public final SelectionKey register(Selector sel, int ops)
}
```





### SocketChannel



SocketChannel 网络 IO 通道，具体负责进行读写操作。NIO 把缓冲区的数据写入通道，或者把通道里的数据读到缓冲区

相关方法如下 : 

```java
public abstract class SocketChannel
extends AbstractSelectableChannel
implements ByteChannel, ScatteringByteChannel, GatheringByteChannel, NetworkChannel{

    //得到一个 SocketChannel 通道
    public static SocketChannel open();
    //设置阻塞或非阻塞模式，取值 false 表示采用非阻塞模式
    public final SelectableChannel configureBlocking(boolean block);
    //连接服务器
    public boolean connect(SocketAddress remote);
    //如果上面的方法连接失败，接下来就要通过该方法完成连接操作
    public boolean finishConnect();
    //往通道里写数据
    public int write(ByteBuffer src);
    //从通道里读数据
    public int read(ByteBuffer dst);
    //注册一个选择器并设置监听事件，最后一个参数可以设置共享数据
    public final SelectionKey register(Selector sel, int ops, Object att);
    //关闭通道
    public final void close();
}
```





### 群聊系统实现



#### 实例要求



- 编写一个 NIO 群聊系统，实现服务器端和客户端之间的数据简单通讯（非阻塞）
- 实现多人群聊
- 服务器端：可以监测用户上线，离线，并实现消息转发功能
- 客户端：通过 channel 可以无阻塞发送消息给其它所有用户，同时可以接受其它用户发送的消息(由服务器转发得到)





#### 基本思路



上线的实现思路 : 

- 客户端去连接服务端时, 会触发绑定的 SelectionKey 的 ACCEPT 事件
- 然后服务端获取 SocketChannel 并与 Selector 绑定



群聊的实现思路 : 

- 服务端接收到某一个客户端的信息后, 将该信息转发到其他的客户端
- 通过 `selector.keys()` 可以得到所有绑定的 `channel` 



下线的实现思路 : 

- 服务端在转发信息的时候, channel 出现IO异常, 说明这个通道已经断开



#### Server端



```java
package cn.knightzz.im.v1.server;

import lombok.extern.slf4j.Slf4j;
import sun.util.resources.cldr.lg.CurrencyNames_lg;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.nio.channels.*;
import java.util.Iterator;
import java.util.Set;

/**
 * @author 王天赐
 * @title: ImServer
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-12 15:51
 */
@Slf4j
public class ImServer {

    private ServerSocketChannel serverSocketChannel = null;
    private Selector selector = null;

    public void run() {

        try {

            // 1. 创建ServerSocketChannel
            serverSocketChannel = ServerSocketChannel.open();
            // 设置非阻塞
            serverSocketChannel.configureBlocking(false);
            // 绑定服务端端口号
            serverSocketChannel.bind(new InetSocketAddress(6667));

            // 2. 创建选择器
            selector = Selector.open();

            // 3. 注册selector
            serverSocketChannel.register(selector, SelectionKey.OP_ACCEPT);

            log.debug("server 启动 ... ");

            // select 返回的是
            while (true) {
                int count = selector.select();
                if (count > 0) {
                    // 监听到的事件数不为0
                    Set<SelectionKey> selectionKeys = selector.selectedKeys();
                    // 遍历
                    Iterator<SelectionKey> keyIterator = selectionKeys.iterator();

                    while (keyIterator.hasNext()) {
                        SelectionKey key = keyIterator.next();
                        // 根据不同的事件类型去处理
                        solutionByEvent(key);
                        // 这里一定要移除掉, 否则会出现只能监听到第一个client客户端上线的bug
                        keyIterator.remove();
                    }
                }
            }

        } catch (IOException e) {
        }


    }

    private void solutionByEvent(SelectionKey key) throws IOException {
        if (key.isAcceptable()) {
            acceptEvent(key);
        }

        if (key.isReadable()) {
            readEvent(key);
        }
    }

    private void acceptEvent(SelectionKey key) throws IOException {
        // 如果是 accept

        SocketChannel socketChannel = serverSocketChannel.accept();
        log.debug("用户 : {} 上线 ...", socketChannel.getRemoteAddress().toString().substring(1));
        // 设置非阻塞
        socketChannel.configureBlocking(false);
        // 绑定buffer
        socketChannel.register(selector, SelectionKey.OP_READ, ByteBuffer.allocate(1024));
    }

    private void readEvent(SelectionKey key) {

        SocketChannel channel = null;
        try {
            // 监听到 client 向 server写入数据
            // 获取 channel
            channel = (SocketChannel) key.channel();
            // 获取channel绑定的Buffer
            ByteBuffer buffer = (ByteBuffer) key.attachment();
            int count = channel.read(buffer);

            if(count > 0) {
                String msg = new String(buffer.array());
                log.debug("from 客户端 : {}" , msg);
                transmit(msg, channel);
            }

        } catch (IOException e) {
            // 当我们从某个通道读取数据的时候, 出现异常,
            try {
               log.debug("用户 : {} 离线 ...", channel.getRemoteAddress().toString().substring(1));

                // 解除关联
                key.cancel();
                // 关闭通道
                channel.close();

            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
    }

    /**
     * 将客户端发送的消息转发到其他客户端
     * @param msg 消息
     * @param self 当前的SocketChannel
     * @throws IOException
     */
    private void transmit(String msg, SocketChannel self) throws IOException {

        // https://blog.csdn.net/weixin_39802680/article/details/115458231
        Set<SelectionKey> selectionKeys = selector.keys();

        for (SelectionKey selectionKey : selectionKeys) {

            // 取出对应的SocketChannel
            Channel currentChannel = selectionKey.channel();

            // 排除自己 并且保证 currentChannel 是 Socketchannel , 因为ServerSocketChannel也绑定到了Selector
            if(currentChannel instanceof SocketChannel && currentChannel != self) {

                SocketChannel target = (SocketChannel) currentChannel;
                // 使用Buffer包裹
                ByteBuffer buf = ByteBuffer.wrap(msg.getBytes());
                target.write(buf);
                log.debug("{} 转发到 {} 完成 !", msg, ((SocketChannel) currentChannel).getRemoteAddress().toString().substring(1));
            }
        }
    }


    public static void main(String[] args) {

        ImServer server = new ImServer();

        server.run();
    }

}

```





#### Client端



```java
package cn.knightzz.im.v1.client;

import lombok.extern.flogger.Flogger;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectableChannel;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Scanner;
import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * @author 王天赐
 * @title: ImClient
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-12 15:51
 */
@Slf4j
public class ImClient {

    private SocketChannel channel = null;

    private Selector selector = null;

    private String username = null;

    /**
     * 初始化客户端
     */
    public void init() {
        try {
            InetSocketAddress address = new InetSocketAddress("127.0.0.1", 6667);
            // 连接服务器
            channel = SocketChannel.open(address);
            // 设置非阻塞
            channel.configureBlocking(false);
            // 创建选择器
            selector = Selector.open();

            // 将channel注册到selector
            channel.register(selector, SelectionKey.OP_READ);

            // 获取username
            username = channel.getLocalAddress().toString().substring(1);
            log.debug("client {} is running .... ", username);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    /**
     * 向服务器发送消息
     *
     * @param msg 消息
     */
    public void sendInfo(String msg) {

        String info = username + " 说 : " + msg;
        try {
            ByteBuffer buffer = ByteBuffer.wrap(info.getBytes());
            channel.write(buffer);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void readInfo() {

        try {

            int count = selector.select();

            if (count > 0) {

                // 获取的所有事件数, SelectionKey 就代表这个是事件, 注意和 Channel与Selector 绑定区分
                // 每个 SelectionKey代表的就是对应通道的就绪事件, Selector不会自己移除这些事件, 我们需要在迭代末尾手动移除,

                // 注意区分
                // selector.keys 返回当前所有注册在selector中channel的selectionKey
                // selector.selectedKeys() 返回注册在selector中等待IO操作(及有事件发生)channel的selectionKey。
                // https://blog.csdn.net/weixin_39802680/article/details/115458231
                Iterator<SelectionKey> keyIterator = selector.selectedKeys().iterator();
                while (keyIterator.hasNext()) {

                    // 拿到key
                    SelectionKey key = keyIterator.next();

                    // 确定是否是读事件
                    if (key.isReadable()) {
                        // 获取channel
                        SocketChannel currentChannel = (SocketChannel) key.channel();

                        // 创建缓冲区
                        ByteBuffer buffer = ByteBuffer.allocate(1024);

                        currentChannel.read(buffer);

                        String msg = new String(buffer.array());

                        log.debug("{}", msg);
                    }

                    // SelectionKey在被轮询后需要remove()。注册过的channel信息会以SelectionKey的形式存储在selector.keys()中。
                    // 也就是说每次select()后的selectedKeys迭代器中是不能还有成员的，但keys()中的成员是不会被删除的(以此来记录channel信息)。
                    // selector不会自己删除selectedKeys()集合中的selectionKey，那么如果不人工remove()，
                    // 将导致下次select()的时候selectedKeys()中仍有上次轮询留下来的信息，这样必然会出现错误。

                    // remove移除的是当前指针指向的元素, 也就是 key
                    keyIterator.remove();
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {

        ImClient client = new ImClient();

        client.init();

        // 创建一个线程用于接收服务器传来的数据
        Thread readThread = new Thread(){
            @Override
            public void run() {
               while (true) {
                   client.readInfo();
                   try {
                       sleep(300);
                   } catch (InterruptedException e) {
                       e.printStackTrace();
                   }
               }
            }
        };

        // 启动读取数据线程
        readThread.start();

        // 发送数据给服务器
        Scanner sc = new Scanner(System.in);

        while (sc.hasNextLine()) {
            String msg = sc.nextLine();
            client.sendInfo(msg);
        }
    }
}

```



## 5.NIO与零拷贝





### 零拷贝



#### 基本介绍



- 零拷贝是网络编程的关键，很多性能优化都离不开。
- 在 Java 程序中，常用的零拷贝有 mmap(内存映射) 和 sendFile



#### 传统IO数据读写



Java 传统 IO 和 网络编程的一段代码 : 

```java
File file = new File("test.txt");
RandomAccessFile raf = new RandomAccessFile(file, "rw");

byte[] arr = new byte[(int) file.length()];
raf.read(arr);

Socket socket = new ServerSocket(8080).accept();
socket.getOutputStream().write(arr);
```



<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230113212755614.png" alt="image-20230113212755614" style="zoom:50%;" />



传统的IO需要从硬件进行 DMA 拷贝到内核缓存, 然后从内核缓存通过 CPU copy 复制到内核态, 在到 Socket Buffer



#### MMAP优化



mmap 通过内存映射，将文件映射到内核缓冲区，同时，用户空间可以共享内核空间的数据。

这样，在进行网络传输时，就可以减少内核空间到用户控件的拷贝次数。如下图

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230113212909279.png" alt="image-20230113212909279" style="zoom:50%;" />



#### SendFile优化



Linux 2.1 版本 提供了sendFile 函数，其基本原理如下：

- 数据根本不经过用户态，直接从内核缓冲区进入到 SocketBuffer
- 同时，由于和用户态完全无关，就减少了一次上下文切换
- **零拷贝从操作系统角度，是没有cpu拷贝**





#### 零拷贝的理解 



- 零拷贝，是从操作系统的角度来说的。因为内核缓冲区之间，没有数据是重复的(只有 kernel buffer 有一份数据)。
- 零拷贝不仅仅带来更少的数据复制，还能带来其他的性能优势，例如更少的上下文切换，更少的 CPU 缓存伪共享以及无 CPU 校验和计算



#### mmap和sendFile的区别



- mmap 适合小数据量读写，sendFile 适合大文件传输。
- mmap 需要 4 次上下文切换，3 次数据拷贝；sendFile 需要 3 次上下文切换，最少 2 次数据拷贝。
- sendFile 可以利用 DMA 方式，减少 CPU 拷贝，mmap 则不能(必须从内核拷贝到 Socket 缓冲区)





### 零拷贝案例 



#### 传统IO



Server

```java
package cn.knightzz.nio.zero_copy.old;

import java.io.DataInputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 * @author 王天赐
 * @title: OldIOServer
 * @projectName hm-netty-codes
 * @description: 零拷贝
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-13 15:10
 */
public class OldIOServer {

    public static void main(String[] args) throws Exception {
        ServerSocket serverSocket = new ServerSocket(7001);

        while (true) {
            Socket socket = serverSocket.accept();
            DataInputStream dataInputStream = new DataInputStream(socket.getInputStream());

            try {
                byte[] byteArray = new byte[4096];

                while (true) {
                    int readCount = dataInputStream.read(byteArray, 0, byteArray.length);

                    if (-1 == readCount) {
                        break;
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }
}

```





Client



```java
package cn.knightzz.nio.zero_copy.old;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.DataOutputStream;
import java.net.Socket;


/**
 * @author 王天赐
 * @title: OldIOClient
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-13 15:09
 */
public class OldIOClient {

    public static void main(String[] args) throws Exception {
        Socket socket = new Socket("localhost", 7001);

        String fileName = "lib/protoc-3.6.1-win32.zip";
        InputStream inputStream = new FileInputStream(fileName);

        DataOutputStream dataOutputStream = new DataOutputStream(socket.getOutputStream());

        byte[] buffer = new byte[4096];
        long readCount;
        long total = 0;

        long startTime = System.currentTimeMillis();

        while ((readCount = inputStream.read(buffer)) >= 0) {
            total += readCount;
            dataOutputStream.write(buffer);
        }

        System.out.println("发送总字节数： " + total + ", 耗时： " + (System.currentTimeMillis() - startTime));

        dataOutputStream.close();
        socket.close();
        inputStream.close();
    }
}

```



#### NIO拷贝



Server

```java
package cn.knightzz.nio.zero_copy.new_;

/**
 * @author 王天赐
 * @title: NewIOServer
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-13 15:13
 */
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.nio.ByteBuffer;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;

//服务器
public class NewIOServer {
    public static void main(String[] args) throws Exception {

        InetSocketAddress address = new InetSocketAddress(7001);

        ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();

        ServerSocket serverSocket = serverSocketChannel.socket();

        serverSocket.bind(address);

        //创建buffer
        ByteBuffer byteBuffer = ByteBuffer.allocate(4096);

        while (true) {
            SocketChannel socketChannel = serverSocketChannel.accept();

            int readcount = 0;
            while (-1 != readcount) {
                try {

                    readcount = socketChannel.read(byteBuffer);

                }catch (Exception ex) {
                    // ex.printStackTrace();
                    break;
                }
                //
                byteBuffer.rewind(); //倒带 position = 0 mark 作废
            }
        }
    }
}


```





Client



```java
package cn.knightzz.nio.zero_copy.new_;

/**
 * @author 王天赐
 * @title: NewIOClient
 * @projectName hm-netty-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-13 15:12
 */
import java.io.FileInputStream;
import java.net.InetSocketAddress;
import java.nio.channels.FileChannel;
import java.nio.channels.SocketChannel;

public class NewIOClient {
    public static void main(String[] args) throws Exception {

        SocketChannel socketChannel = SocketChannel.open();
        socketChannel.connect(new InetSocketAddress("localhost", 7001));
        String filename = "lib/protoc-3.6.1-win32.zip";

        //得到一个文件channel
        FileChannel fileChannel = new FileInputStream(filename).getChannel();

        //准备发送
        long startTime = System.currentTimeMillis();

        //在linux下一个transferTo 方法就可以完成传输
        //在windows 下 一次调用 transferTo 只能发送8m , 就需要分段传输文件, 而且要主要
        //传输时的位置 =》 课后思考...
        //transferTo 底层使用到零拷贝
        long transferCount = fileChannel.transferTo(0, fileChannel.size(), socketChannel);

        System.out.println("发送的总的字节数 =" + transferCount + " 耗时:" + (System.currentTimeMillis() - startTime));

        //关闭
        fileChannel.close();

    }
}
```





## 6.NIO存在的问题



1. NIO 的类库和 API 繁杂，使用麻烦：需要熟练掌握 Selector、ServerSocketChannel、SocketChannel、ByteBuffer 等。

2. 需要具备其他的额外技能：要熟悉 Java 多线程编程，因为 NIO 编程涉及到 Reactor 模式，你必须对多线程和网络编程非常熟悉，才能编写出高质量的 NIO 程序。
3. 开发工作量和难度都非常大：例如客户端面临**断连重连、网络闪断、半包读写、失败缓存、网络拥塞和异常流**的处理等等。
4. JDK NIO 的 Bug：例如臭名昭著的 Epoll Bug，它会导致 Selector 空轮询，最终导致 CPU 100%。直到 JDK 1.7 版本该问题仍旧存在，没有被根本解决



## 7.JavaAIO



JDK 7 引入了 Asynchronous I/O，即 AIO。在进行 I/O 编程中，常用到两种模式：Reactor和 Proactor。

Java 的 NIO 就是 Reactor，当有事件触发时，服务器端得到通知，进行相应的处理

AIO 即 NIO2.0，叫做异步不阻塞的 IO。AIO 引入异步通道的概念，采用了Proactor 模式，简化了程序编写，有效的请求才启动线程，它的特点是先由操作

系统完成后才通知服务端程序启动线程去处理，一般适用于连接数较多且连接时间较长的应用



