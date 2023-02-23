---
title: dubbo环境搭建
icon: note
---

## Windows环境搭建



### 1. 安装Zookeeper



下载 zookeeper3.5 下载地址 https://zookeeper.apache.org/releases.html#download



下载完成以后, 解压到一个目录下 



![image-20230108204601006](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108204601006.png)



然后把 zoo_sample.cfg 复制一份, 重命名为 zoo.cfg

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108204642138.png" alt="image-20230108204642138" style="zoom:80%;" />



修改配置文件 zoo.cfg 中的 dataDir 这个配置 修改为 `dataDir=../zkdata`

```java
# The number of milliseconds of each tick 
tickTime=2000
# The number of ticks that the initial 
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between 
# sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just 
# example sakes.
dataDir=../zkdata
# the port at which the clients will connect
clientPort=2181
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the 
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1

```

然后再根目录下面创建一个 zkdata的目录

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108204857557.png" alt="image-20230108204857557" style="zoom:80%;" />

然后在bin目录下, 打开控制台 执行 ` .\zkServer.cmd`  注意和linux下区分, linux下的命令是 `zkServer.sh start` 

![image-20230108205016838](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108205016838.png)

上面这样就是启动成功了





### 2. 安装Dubbo-Admin



我安装的版本是 dubbo-admin-0.1.0 , 其他版本应该也可以, 安装dubbo-admin 之前需要你有maven和nodejs的环境

下载地址 https://github.com/apache/dubbo-admin/releases

下载完成以后需要解压到一个目录下 

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108205456132.png" alt="image-20230108205456132" style="zoom: 67%;" />



然后找到 dubbo-admin-server/src/main/resource/application.properties  修改配置 

```properties

# centers in dubbo2.7
admin.registry.address=zookeeper://127.0.0.1:2181
admin.config-center=zookeeper://127.0.0.1:2181
admin.metadata-report.address=zookeeper://127.0.0.1:2181

admin.root.user.name=root
admin.root.user.password=root
#group
admin.registry.group=dubbo
admin.config-center.group=dubbo
admin.metadata-report.group=dubbo

admin.apollo.token=e16e5cd903fd0c97a116c873b448544b9d086de9
admin.apollo.appId=test
admin.apollo.env=dev
admin.apollo.cluster=default
admin.apollo.namespace=dubbo
# 防止端口占用
server.port=8081
```

一般来说我们需要修改的配置只有以下, 但是因为我们是在windows下配置的, 所以 127.0.0.1 就不用改, 如果你是虚拟机或者在云服务器上的 , 就要改成相应的ip 

```properties
# centers in dubbo2.7
admin.registry.address=zookeeper://127.0.0.1:2181
admin.config-center=zookeeper://127.0.0.1:2181
admin.metadata-report.address=zookeeper://127.0.0.1:2181
```

然后就是需要自己定义dubbo-admin端口, 因为默认是8080, 但是多半会被其他引用占用, 所以我们改成 8081

```properties
# 防止端口占用
server.port=8081
```



修改完成以后我们回到 dubbo-admin的根目录 打开控制命令台执行, `mvn clean package` 打包 

```shell
PS E:\DevAppSpace\dubbo-admin-develop\dubbo-admin-develop> mvn clean package
```

打包结果是下面这样的 

![1578300464726](https://haloos.oss-cn-beijing.aliyuncs.com/typero/1578300464726.png)

打包完成以后我们会在下面的目录看到一个jar包

![image-20230108210048989](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108210048989.png)



然后执行这个jar包即可

![image-20230108210150282](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108210150282.png)



这样的话就算是启动了, 我们只需要去访问 http://localhost:8081/#/ 即可, 默认的账号密码都是 root

----

**其他事项** : 以上教程适用于dubbo-admin-0.1.0 , 高版本其他内容大致一样, 但是如果访问http://localhost:8081/#/不行的话, 可能需要dubbo-admin-ui目录下执行

```shell
npm run dev
```



```shell
npm run dev
```

![1578300677041](https://haloos.oss-cn-beijing.aliyuncs.com/typero/1578300677041.png)





## Dubbo整合SpringBoot



dubbo整合Spring在dubbo官网上就有, 我就不再写了, 主要是讲一下怎么和SpringBoot工程整合



### 1. 创建SpringBoot项目



我们需要分别创建两个SpringBoot项目, 分别是 dubbo-spring-consumer 和 dubbo-spring-provider, 一个是消费者, 一个是提供者

创建完成以后我们需要添加相关依赖 : 

springboot-start 的依赖我使用的是 2.3.5.RELEASE 版本的

```xml
	<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.5.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
```

其他的核心依赖主要是下面的 , 消费者和 生产者的依赖是相同的

```xml
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.7.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo-spring-boot-starter</artifactId>
            <version>2.7.1</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>2.8.0</version>
        </dependency>
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>2.8.0</version>
        </dependency>
```



### 2. 添加配置



首先是 dubbo-spring-provider

```yaml
server:
  port: 9091

spring:
  application:
    name: dubbo-provier

dubbo:
  # dubbo 应用名称
  application:
    name: dubbo-provier
  # 注册中心地址, 就是我们之前的 zookeeper的地址
  registry:
    address: zookeeper://127.0.0.1:2181
  # dubbo服务提供的扫描的包
  scan:
    base-packages: cn.knightzz.service.impl
  # 使用的协议以及端口号
  protocol:
    name: dubbo
    port: 20880
```



其次是 dubbo-spring-consumer



```yaml
server:
  port: 9090

spring:
  application:
    name: dubbo-consumer

dubbo:
  application:
    name: dubbo-consumer # 消费方应用名，用于计算依赖关系，不是匹配条件，不要与提供方一样
  registry:
    address: zookeeper://127.0.0.1:2181
  scan:
    base-packages: cn.knightzz.service.impl
  protocol:
    name: dubbo
    port: 20880
```





### 3. 编写代码



首先是 dubbo-spring-provider 项目框架 如下 

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108211203924.png" alt="image-20230108211203924" style="zoom:67%;" />



在 UserService 里面我们编写一个接口 

```java
package cn.knightzz.service;

/**
 * @author 王天赐
 * @title: ConsumerService
 * @projectName dubbo-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-08 10:08
 */
public interface UserService {

    String sayHello(String name);
}

```

在 UserServiceImpl 添加实现

```java
package cn.knightzz.service.impl;

import cn.knightzz.service.UserService;
import org.apache.dubbo.config.annotation.Service;

/**
 * @author 王天赐
 * @title: ConsumerServiceImpl
 * @projectName dubbo-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-08 10:08
 */
@Service // 这里的service注解不能使用spring的注解，要使用dubbo中的注解
public class UserServiceImpl implements UserService {
    @Override
    public String sayHello(String name) {
        return "Hello" + name;
    }
}

```

**在这里我们需要重点注意的是**, 我们使用的 `@Service` 这个注解并非是 Spring 提供的注解, 而是 dubbo提供的, 

注解包名是 `org.apache.dubbo.config.annotation.Service;`



最后我们需要在启动类上加上开启 Dubbo的注解 `@EnableDubbo`

```java
package cn.knightzz;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * @author 王天赐
 * @title: ProviderApplication
 * @projectName dubbo-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-08 10:00
 */
@SpringBootApplication
@EnableDubbo
public class ProviderApplication {

    public static void main(String[] args) {

        SpringApplication.run(ProviderApplication.class, args);
    }
}

```





----



其次是dubbo-spring-consumer 部分的代码, 项目结构如下 

<img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108211624927.png" alt="image-20230108211624927" style="zoom: 80%;" />

另外就是, 服务是可以相互提供的, 并不是固定的

UserService 这里和之前的一样, 我们不需要具体的实现 因为我们要调用 dubbo-spring-provider

```java
package cn.knightzz.service;

/**
 * @author 王天赐
 * @title: ConsumerService
 * @projectName dubbo-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-08 10:08
 */
public interface UserService {

    String sayHello(String name);
}

```

然后的话就是需要编写 Controller

```java
package cn.knightzz.controller;

import cn.knightzz.service.UserService;
import org.apache.dubbo.config.annotation.Reference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 王天赐
 * @title: UserController
 * @projectName dubbo-codes
 * @description:
 * @website <a href="http://knightzz.cn/">http://knightzz.cn/</a>
 * @github <a href="https://github.com/knightzz1998">https://github.com/knightzz1998</a>
 * @create: 2023-01-08 10:28
 */
@RestController
public class UserController {

    @Reference
    UserService userService;

    @RequestMapping("/test")
    public String test() {
        return userService.sayHello("test");
    }

}

```

`@Reference` 用的也是dubbo的注解, 同样我们也需要在启动类开启 Dubbo的支持

```java
package cn.knightzz;

import org.apache.dubbo.config.spring.context.annotation.EnableDubbo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author knightzz98
 */
@SpringBootApplication
@EnableDubbo
public class ConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsumerApplication.class, args);
    }

}

```



### 4. 测试



分别启动两个项目 

![image-20230108212147378](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108212147378.png)



然后访问 http://localhost:9090/test 

![image-20230108212208011](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230108212208011.png)

这里可以看到打印的结果, 说明我们的项目已经连通了, Over !

