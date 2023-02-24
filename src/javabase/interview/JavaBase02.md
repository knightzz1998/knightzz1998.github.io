---
title: Java基础面试(中)
date: 2023-02-24
icon: note
category:
  - Java基础
  - 面试题
---
### 面向对象和面向过程的区别



两者的主要区别在于解决问题的方式不同

- 面向过程把解决问题的过程拆成一个个方法，通过一个个方法的执行解决问题。
- 面向对象会先抽象出对象，然后用对象执行方法的方式解决问题。

另外，面向对象开发的程序一般更易维护、易复用、易扩展。



### 创建一个对象用什么运算符?对象实体与对象引用有何不同?



new 运算符，new 创建对象实例（对象实例在堆内存中），对象引用指向对象实例（对象引用存放在栈内存中）。

一个对象引用可以指向 0 个或 1 个对象（一根绳子可以不系气球，也可以系一个气球）;一个对象可以有 n 个引用指向它（可以用 n 条绳子系住一个气球）。



### 对象的相等和引用相等的区别



- 对象的相等一般比较的是内存中存放的内容是否相等。
- 引用相等一般比较的是他们指向的内存地址是否相等



一个比较的是实际存储的内容, 一个是存储内容在内存中地址





### 类的构造方法的作用是什么?



构造方法是一种特殊的方法，主要作用是完成对象的初始化工作





### 对象的初始化工作主要做什么?



Java 对象的初始化工作主要是做以下几件事情：

1. 分配内存空间：在创建对象时，Java 虚拟机会为对象分配内存空间，用于存储对象的数据。
2. 初始化实例变量：在分配内存空间后，Java 虚拟机会对对象的实例变量进行初始化。如果实例变量没有被显式赋初值，则会被赋予默认值，如整数类型默认值为 0，布尔类型默认值为 false，对象类型默认值为 null 等。
3. 执行构造方法：在实例变量初始化完成后，Java 虚拟机会调用对象的构造方法来完成对象的初始化工作。构造方法是一种特殊的方法，用于对对象进行初始化，它可以被重载，可以有多个构造方法。
4. 父类的初始化：如果对象的父类还没有被初始化，则会先初始化父类，直到初始化完所有的父类。
5. 调用对象的构造方法：在完成父类的初始化后，Java 虚拟机会调用对象的构造方法来完成对象的初始化工作。构造方法的调用顺序是从父类到子类依次调用。

需要注意的是，Java 中对象的初始化工作是由 Java 虚拟机自动完成的，并且遵循一定的规则和顺序。程序员可以通过定义构造方法和实例变量来控制对象的初始化过程，但是不能直接操作对象的内存空间。




### 如果一个类没有声明构造方法，该程序能正确执行吗?



如果一个类没有声明构造方法，也可以执行！因为**一个类即使没有声明构造方法也会有默认的不带参数的构造方法**。

如果我们自己添加了类的构造方法（无论是否有参），Java 就不会再添加默认的无参数的构造方法了，我们一直在不知不觉地使用构造方法，这也是为什么我们在创建对象的时候后面要加一个括号（因为要调用无参的构造方法）。如果我们重载了有参的构造方法，记得都要把无参的构造方法也写出来（无论是否用到），因为这可以帮助我们在创建对象的时候少踩坑



### 构造方法有哪些特点？是否可被 override?



构造方法特点如下：

- 名字与类名相同。
- 没有返回值，但不能用 void 声明构造函数。
- 生成类的对象时自动执行，无需调用。

构造方法不能被 override（重写）,但是可以 overload（重载）,所以你可以看到一个类中有多个构造函数的情况





### 解释下封装的概念



**封装是指把一个对象的状态信息（也就是属性）隐藏在对象内部，不允许外部对象直接访问对象的内部信息**。

但是可以提供一些可以被外界访问的方法来操作属性。就好像我们看不到挂在墙上的空调的内部的零件信息（也就是属性），但是可以通过遥控器（方法）来控制空调。

如果属性不想被外界访问，我们大可不必提供方法给外界访问。

但是如果一个类没有提供给外界访问的方法，那么这个类也没有什么意义了。就好像如果没有空调遥控器，那么我们就无法操控空凋制冷，空调本身就没有意义了（当然现在还有很多其他方法 ，这里只是为了举例子）。





### Java中为什么要有封装这个概念, 不封装行不行?



Java 中的封装是一种面向对象编程的重要概念，它允许将数据和方法组合在一起，并将它们作为一个整体来对外部进行隐藏和保护。封装的目的是保护对象的数据和行为，同时允许对象与外部进行交互，提高代码的可维护性和可复用性。

封装的优点如下：

1. 隐藏细节：封装可以将对象的细节隐藏起来，只暴露必要的接口给外部使用，这样可以减少对外部的依赖，提高代码的安全性和稳定性。
2. 提高灵活性：封装可以使对象的实现细节与外部接口分离，这样可以使对象的实现细节发生变化时，不会对外部接口产生影响，提高了代码的灵活性和可维护性。
3. 保护数据：封装可以将对象的数据进行保护，只允许通过接口进行访问和修改，避免了外部直接修改对象的数据，保证了数据的安全性和正确性。

如果不使用封装，直接暴露对象的属性和方法给外部使用，容易造成以下问题：

1. 数据不安全：外部可以直接修改对象的属性，这会导致数据的不安全和不可控。
2. 实现细节暴露：外部可以直接调用对象的方法，这会暴露对象的实现细节，降低代码的灵活性和可维护性。
3. 外部依赖性高：外部直接依赖对象的实现细节，这会增加代码的耦合度，降低代码的可复用性。

因此，封装是面向对象编程的一个重要概念，可以提高代码的安全性、稳定性、可维护性和可复用性，是编写高质量代码的必要手段之一。





### 解释下继承的概念



不同类型的对象，相互之间经常有一定数量的共同点。例如，小明同学、小红同学、小李同学，都共享学生的特性（班级、学号等）。同时，每一个对象还定义了额外的特性使得他们与众不同。例如小明的数学比较好，小红的性格惹人喜爱；小李的力气比较大。

**继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。**

通过使用继承，**可以快速地创建新的类，可以提高代码的重用，程序的可维护性，节省大量创建新类的时间 ，提高我们的开发效率**。

**关于继承如下 3 点请记住：**

1. 子类拥有父类对象所有的属性和方法（**包括私有属性和私有方法**），但是父类中的私有属性和方法子类是无法访问，**只是拥有**。*Java 中的继承机制允许子类继承父类的属性和方法，但是父类中的私有属性和私有方法子类是无法直接访问的，需要通过父类的公有方法来访问*
2. 子类可以拥有自己属性和方法，即子类可以对父类进行扩展。
3. 子类可以用自己的方式实现父类的方法。（以后介绍）。





### 解释下多态的概念



多态，顾名思义，表示一个对象具有多种的状态，具体表现为父类的引用指向子类的实例。

**多态的特点:**

- 对象类型和引用类型之间具有继承（类）/实现（接口）的关系；
- **引用类型变量发出的方法调用的到底是哪个类中的方法，必须在程序运行期间才能确定**；
- **多态不能调用“只在子类存在但在父类不存在”的方法；**
- 如果子类重写了父类的方法，真正执行的是子类覆盖的方法，如果子类没有覆盖父类的方法，执行的是父类的方法





### 多态在JVM层面是如何实现的





参考 

- https://zofun.github.io/2020/04/23/JVM%E6%98%AF%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E5%A4%9A%E6%80%81%E7%9A%84/



在 Java 中，多态是一种重要的面向对象编程特性，它允许不同的对象以不同的方式响应同一消息或方法调用。在 JVM 层面，多态的实现是基于 Java 的虚拟方法表（Virtual Method Table，VMT）机制的。

每个 Java 类都有一个 VMT，其中存储了类的所有虚拟方法的地址。当一个对象被创建时，它的实例变量中包含一个指向该类的 VMT 的指针。在调用一个虚拟方法时，JVM 首先会根据对象的类型找到其 VMT，然后根据方法名在 VMT 中查找相应的方法地址，并调用该方法。

在多态中，当一个父类对象调用其子类的方法时，由于子类重写了该方法，因此子类中的方法地址已经存储在其 VMT 中，JVM 会在父类对象的 VMT 中查找子类方法的地址并调用子类方法，实现了多态的效果。

需要注意的是，对于非虚拟方法（即非重写的方法），JVM 会根据对象的类型直接调用该方法，而不是根据 VMT 中的地址进行调用。因此，多态只适用于虚拟方法，对于非虚拟方法，不会产生多态的效果。

总之，在 JVM 层面，多态是通过 Java 的虚拟方法表机制来实现的，它允许不同的对象以不同的方式响应同一消息或方法调用，提高了代码的灵活性和可扩展性。





### 接口和抽象类有什么共同点和区别？

**共同点** ：

- 都不能被实例化。
- 都可以包含抽象方法。
- 都可以有默认实现的方法（Java 8 可以用 `default` 关键字在接口中定义默认方法）。



接口中的默认方法 : 

```java
default int test02() {
        return 1;
}
```

抽象类中的默认方法

```java
public int abs01() {
        return 1;
    }
```





**区别** ：

- 接口主要用于对类的行为进行约束，你实现了某个接口就具有了对应的行为。抽象类主要用于代码复用，强调的是所属关系。
- 一个类只能继承一个类，但是可以实现多个接口。
- 接口中的成员变量只能是 `public static final` 类型的，不能被修改且必须有初始值，而抽象类的成员变量默认 default，可在子类中被重新定义，也可被重新赋值





### 深拷贝和浅拷贝区别了解吗？什么是引用拷贝



关于深拷贝和浅拷贝区别，我这里先给结论：

- **浅拷贝**：**浅拷贝会在堆上创建一个新的对象**（<u>区别于引用拷贝的一点</u>），不过，如果原对象内部的属性是引用类型的话，**浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原对象共用同一个内部对象。**
- **深拷贝** ：深拷贝会完全复制整个对象，包括这个对象所包含的内部对象。

上面的结论没有完全理解的话也没关系，我们来看一个具体的案例！





浅拷贝 



```java
public class Address implements Cloneable {
    private String name;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address(String name) {
        this.name = name;
    }

    // 省略构造函数、Getter&Setter方法
    @Override
    public Address clone() {
        try {
            return (Address) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

```



```java
public class Person implements Cloneable {
    private Address address;
    // 省略构造函数、Getter&Setter方法


    public Person() {
    }

    public Person(Address address) {
        this.address = address;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public Person clone() {
        try {
            Person person = (Person) super.clone();
            return person;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

```

```java
        Person person1 = new Person(new Address("武汉"));
        Person person1Copy = person1.clone();
        System.out.println(person1.getAddress() == person1Copy.getAddress()); // true
```

- 拷贝对象和原对象共用同一个内部对象。



深拷贝的话是需要对内部的引用对象一样进行拷贝

```java
@Override
public Person clone() {
    try {
        Person person = (Person) super.clone();
        person.setAddress(person.getAddress().clone());
        return person;
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}

```









![image-20230224152517398](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230224152517398.png)





### Object 类相关



```java
/**
 * native 方法，用于返回当前运行时对象的 Class 对象，使用了 final 关键字修饰，故不允许子类重写。
 */
public final native Class<?> getClass()
/**
 * native 方法，用于返回对象的哈希码，主要使用在哈希表中，比如 JDK 中的HashMap。
 */
public native int hashCode()
/**
 * 用于比较 2 个对象的内存地址是否相等，String 类对该方法进行了重写以用于比较字符串的值是否相等。
 */
public boolean equals(Object obj)
/**
 * naitive 方法，用于创建并返回当前对象的一份拷贝。
 */
protected native Object clone() throws CloneNotSupportedException
/**
 * 返回类的名字实例的哈希码的 16 进制的字符串。建议 Object 所有的子类都重写这个方法。
 */
public String toString()
/**
 * native 方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。
 */
public final native void notify()
/**
 * native 方法，并且不能重写。跟 notify 一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。
 */
public final native void notifyAll()
/**
 * native方法，并且不能重写。暂停线程的执行。注意：sleep 方法没有释放锁，而 wait 方法释放了锁 ，timeout 是等待时间。
 */
public final native void wait(long timeout) throws InterruptedException
/**
 * 多了 nanos 参数，这个参数表示额外时间（以毫微秒为单位，范围是 0-999999）。 所以超时的时间还需要加上 nanos 毫秒。。
 */
public final void wait(long timeout, int nanos) throws InterruptedException
/**
 * 跟之前的2个wait方法一样，只不过该方法一直等待，没有超时时间这个概念
 */
public final void wait() throws InterruptedException
/**
 * 实例被垃圾回收器回收的时候触发的操作
 */
protected void finalize() throws Throwable { }

```





### == 和 equals() 的区别



**`==`** 对于基本类型和引用类型的作用效果是不同的：

- 对于基本数据类型来说，`==` 比较的是值。
- 对于引用数据类型来说，`==` 比较的是对象的内存地址。



`equals()` 不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。`equals()`方法存在于`Object`类中，而`Object`类是所有类的直接或间接父类，因此所有的类都有`equals()`方法。

`Object` 类 `equals()` 方法：

```java
public boolean equals(Object obj) {
     return (this == obj);
}
```

`equals()` 方法存在两种使用情况：

- **类没有重写 `equals()`方法** ：通过`equals()`比较该类的两个对象时，等价于通过“==”比较这两个对象，使用的默认是 `Object`类`equals()`方法。
- **类重写了 `equals()`方法** ：一般我们都重写 `equals()`方法来比较两个对象中的属性是否相等；若它们的属性相等，则返回 true(即，认为这两个对象相等), 比如 String类



`String` 中的 `equals` 方法是被重写过的，因为 `Object` 的 `equals` 方法是比较的对象的内存地址，而 `String` 的 `equals` 方法比较的是对象的值。

当创建 `String` 类型的对象时，虚拟机会在常量池中查找有没有已经存在的值和要创建的值相同的对象，如果有就把它赋给当前引用。如果没有就在常量池中重新创建一个 `String` 对象。



### hashCode() 有什么用？



`hashCode()` 的作用是获取哈希码（`int` 整数），也称为散列码。这个哈希码的作用是确定该对象在哈希表中的索引位置。

`hashCode()`定义在 JDK 的 `Object` 类中，这就意味着 Java 中的任何类都包含有 `hashCode()` 函数。另外需要注意的是： `Object` 的 `hashCode()` 方法是本地方法，也就是用 C 语言或 C++ 实现的，**该方法通常用来将对象的内存地址转换为整数之后返回**。**hashCode()的返回值大多数情况是将对象的内部地址转换成整数并返回，少数情况不是这样，也就代表着不是内存地址**

散列表存储的是键值对(key-value)，它的特点是：**能根据“键”快速的检索出对应的“值”。这其中就利用到了散列码！（可以快速找到所需要的对象）**





#### 为什么要有 hashCode？



当你把对象加入 `HashSet` 时，`HashSet` 会先计算对象的 `hashCode` 值来判断对象加入的位置，同时也会与其他已经加入的对象的 `hashCode` 值作比较

如果没有相符的 `hashCode`，`HashSet` 会假设对象没有重复出现。但是如果发现有相同 `hashCode` 值的对象，这时会调用 `equals()` 方法来检查 `hashCode` 相等的对象是否真

的相同。如果两者相同，`HashSet` 就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。这样我们就大大减少了 `equals` 的次数，相应就大大提高了执行速度。



其实， `hashCode()` 和 `equals()`都是用于比较两个对象是否相等



#### 那为什么 JDK 还要同时提供这两个方法呢？

这是因为在一些容器（比如 `HashMap`、`HashSet`）中，有了 `hashCode()` 之后，判断元素是否在对应容器中的效率会更高（参考添加元素进`HashSet`的过程）！

我们在前面也提到了添加元素进`HashSet`的过程，如果 `HashSet` 在对比的时候，

同样的 `hashCode` 有多个对象，它会继续使用 `equals()` 来判断是否真的相同。也就是说 `hashCode` 帮助我们大大缩小了查找成本。



#### 那为什么不只提供 `hashCode()` 方法呢？

这是因为两个对象的`hashCode` 值相等并不代表两个对象就相等。



#### 那为什么两个对象有相同的 hashCode 值，它们也不一定是相等的？



因为 `hashCode()` 所使用的哈希算法也许刚好会让多个对象传回相同的哈希值。越糟糕的哈希算法越容易碰撞，但这也与数据值域分布的特性有关（所谓哈希碰撞也就是指的是不同的对象得到相同的 `hashCode` )。

总结下来就是 ：

- 如果两个对象的`hashCode` 值相等，那这两个对象不一定相等（哈希碰撞）。
- 如果两个对象的`hashCode` 值相等并且`equals()`方法也返回 `true`，我们才认为这两个对象相等。
- 如果两个对象的`hashCode` 值不相等，我们就可以直接认为这两个对象不相等。





### 为什么重写 equals() 时必须重写 hashCode() 方法？



因为两个相等的对象的 `hashCode` 值必须是相等。也就是说如果 `equals` 方法判断两个对象是相等的，那这两个对象的 `hashCode` 值也要相等。

如果重写 `equals()` 时没有重写 `hashCode()` 方法的话就可能会导致 `equals` 方法判断是相等的两个对象，`hashCode` 值却不相等。

**思考** ：重写 `equals()` 时没有重写 `hashCode()` 方法的话，使用 `HashMap` 可能会出现什么问题。





如果在 Java 中重写了 `equals()` 方法但没有重写 `hashCode()` 方法，那么就有可能导致在使用 `HashMap` 等散列表时出现问题。

`HashMap` 在存储键值对时，会首先计算键的哈希值，然后将其放入对应的桶中。在寻找键值对时，`HashMap` 也会先计算键的哈希值，然后到对应的桶中查找。如果两个键的哈希值不同，则它们会被分到不同的桶中，即使它们的 `equals()` 方法返回 `true`。

但是，如果两个键的 `equals()` 方法返回 `true`，但是它们的哈希值不同，那么它们就会被分到不同的桶中，这样在使用 `HashMap` 时就无法正确地找到相应的键值对了。因此，如果重写了 `equals()` 方法，就应该同时重写 `hashCode()` 方法，以保证它们的哈希值一致。

在重写 `hashCode()` 方法时，应该满足以下两个条件：

1. 如果两个对象的 `equals()` 方法返回 `true`，那么它们的 `hashCode()` 方法返回值必须相同。
2. 如果两个对象的 `equals()` 方法返回 `false`，那么它们的 `hashCode()` 方法返回值尽量不同，以避免它们被分到同一个桶中，从而影响 `HashMap` 的性能



添加时没问题, 但是查找时, 你传入的key对应的hash值和hashmap中的对应数据的key并不是同一个, 但是eqauls中返回的是同一个, 就会把错误的数据返回去





**总结** ：

- `equals` 方法判断两个对象是相等的，那这两个对象的 `hashCode` 值也要相等。
- 两个对象有相同的 `hashCode` 值，他们也不一定是相等的（哈希碰撞）。



更多关于 `hashCode()` 和 `equals()` 的内容可以查看：[Java hashCode() 和 equals()的若干问题解答](https://www.cnblogs.com/skywang12345/p/3324958.html)

### 将数据添加到HashMap会经历哪些过程



当向 HashMap 中添加一个键值对时，HashMap 会经历以下过程：

1. 计算键的哈希值：HashMap 首先会调用键的 `hashCode()` 方法来计算哈希值。哈希值是一个整数，用来确定键值对在哈希表中的位置。
2. 计算桶的索引：HashMap 内部维护了一个桶数组，用来存储键值对。根据哈希值，**HashMap 会使用位运算将哈希值和桶数组的长度进行取模，得到键值对所在的桶的索引**。
3. 如果桶为空，直接添加：如果桶为空，直接将键值对添加到桶中。
4. 如果桶不为空，遍历桶中的链表或红黑树：如果桶不为空，说明该桶中已经有其他键值对了。此时，HashMap 会遍历该桶中的链表或红黑树，查找是否已经存在相同的键。如果已经存在相同的键，则更新该键对应的值；否则，将新的键值对添加到链表或红黑树的末尾。
5. 如果链表或红黑树过长，转化为红黑树：在遍历链表或红黑树时，如果链表的长度超过了一个阈值（默认是 8），则会将链表转化为红黑树，以便更快地查找键值对。如果红黑树的大小小于等于 6，则会将红黑树转化回链表。

需要注意的是，HashMap 中的键值对是无序的，它们的顺序并不是按照添加的顺序来决定的。当使用迭代器或遍历 Map 中的键值对时，它们的顺序是不确定的。



### Java中的 HashMap 在根据key查找数据时要经历哪些过程



Java中的 HashMap 使用哈希表来存储键值对，当根据 key 查找数据时，需要经历以下过程：

1. 首先，根据 key 的哈希值找到对应的桶。哈希值的计算使用了 key 的 `hashCode()` 方法，然后对桶的数量取余得到桶的下标。
2. 在桶中查找对应的链表或红黑树（JDK1.8 引入了红黑树优化哈希冲突），遍历其中的节点，找到与 key 相等的节点。
3. 如果找到了相等的节点，则返回其对应的值；否则，返回 `null`。

需要注意的是，在查找时需要使用 key 的 `equals()` 方法来判断两个键是否相等。如果两个键的哈希值相同，但是 `equals()` 方法返回 `false`，则它们会被存储在同一个桶中，但是查找时会根据 `equals()` 方法进行比较，因此无法正确找到对应的键值对。

在实际应用中，为了避免哈希冲突，需要尽量让不同的 key 均匀地分布在不同的桶中，这需要在设计哈希函数时考虑到各种因素，如键的类型、键的数量、桶的数量等。同时，为了避免哈希冲突导致的性能问题，可以通过增加桶的数量、使用更好的哈希函数等方式来优化 HashMap 的性能。



### String、StringBuffer、StringBuilder 的区别？ 



#### 可变性

`String` 是不可变的

`StringBuilder` 与 `StringBuffer` 都继承自 `AbstractStringBuilder` 类，在 `AbstractStringBuilder` 中也是使用字符数组保存字符串，不过没有使用 `final` 和 `private` 关键字修饰，最关键的是这个 `AbstractStringBuilder` 类还提供了很多修改字符串的方法比如 `append` 方法

```java
abstract class AbstractStringBuilder implements Appendable, CharSequence {
    char[] value;
    public AbstractStringBuilder append(String str) {
        if (str == null)
            return appendNull();
        int len = str.length();
        ensureCapacityInternal(count + len);
        str.getChars(0, len, value, count);
        count += len;
        return this;
    }
  	//...
}

```



#### 线程安全性



`String` 中的对象是不可变的，也就可以理解为常量，线程安全。

`AbstractStringBuilder` 是 `StringBuilder` 与 `StringBuffer` 的公共父类，定义了一些字符串的基本操作，

如 `expandCapacity`、`append`、`insert`、`indexOf` 等公共方法。

`StringBuffer` 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。

`StringBuilder` 并没有对方法进行加同步锁，所以是非线程安全的



#### 性能



每次对 `String` 类型进行改变的时候，都会生成一个新的 `String` 对象，然后将指针指向新的 `String` 对象。

`StringBuffer` 每次都会对 `StringBuffer` 对象本身进行操作，而不是生成新的对象并改变对象引用。

相同情况下使用 `StringBuilder` 相比使用 `StringBuffer` 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。



**对于三者使用的总结：**

1. 操作少量的数据: 适用 `String`
2. 单线程操作字符串缓冲区下操作大量数据: 适用 `StringBuilder`
3. 多线程操作字符串缓冲区下操作大量数据: 适用 `StringBuffer`





在单线程的情况下，Java 中的 StringBuilder 的性能通常要优于 StringBuffer，因为 StringBuilder 是非线程安全的，不需要进行线程同步，相比之下，StringBuffer 是线程安全的，需要进行同步操作，因此在执行一些简单的字符串拼接时，StringBuilder 的性能会更高。

具体来说，StringBuilder 的优点在于：

1. 不需要进行线程同步，因此操作速度更快。
2. **内部实现更简单，因为不需要考虑线程安全问题，因此可以避免一些额外的开销**。

而 StringBuffer 的优点在于：

1. 线程安全，可以在多线程环境下使用。
2. 由于需要进行同步操作，可以保证多线程环境下的正确性。

因此，如果需要在多线程环境下进行字符串操作，应该使用 StringBuffer，否则可以优先考虑使用 StringBuilder。





### String为什么是不可变的?



`String` 类中使用 `final` 关键字修饰字符数组来保存字符串，所以`String` 对象是不可变的。

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    private final char value[];
	//...
}
```

我们知道被 `final` 关键字修饰的类不能被继承，修饰的方法不能被重写，修饰的变量是基本数据类型则值不能改变，修饰的变量是引用类型则不能再指向其他对象。因此，`final` 关键字修饰的数组保存字符串并不是 `String` 不可变的根本原因，因为这个数组保存的字符串是可变的（`final` 修饰引用类型变量的情况）

1. 保存字符串的数组被 `final` 修饰且为私有的，并且`String` 类没有提供/暴露修改这个字符串的方法。
2. `String` 类被 `final` 修饰导致其不能被继承，进而避免了子类破坏 `String` 不可变。



在 Java 9 之后，`String` 、`StringBuilder` 与 `StringBuffer` 的实现改用 `byte` 数组存储字符串

```java
public final class String implements java.io.Serializable,Comparable<String>, CharSequence {
    // @Stable 注解表示变量最多被修改一次，称为“稳定的”。
    @Stable
    private final byte[] value;
}

abstract class AbstractStringBuilder implements Appendable, CharSequence {
    byte[] value;
}
```



**Java 9 为何要将 `String` 的底层实现由 `char[]` 改成了 `byte[]` ?**

新版的 String 其实支持两个编码方案： Latin-1 和 UTF-16。如果字符串中包含的汉字没有超过 Latin-1 可表示范围内的字符，那就会使用 Latin-1 作为编码方案。Latin-1 编码方案下，`byte` 占一个字节(8 位)，`char` 占用 2 个字节（16），`byte` 相较 `char` 节省一半的内存空间。

JDK 官方就说了绝大部分字符串对象只包含 Latin-1 可表示的字符。

如果字符串中包含的汉字超过 Latin-1 可表示范围内的字符，`byte` 和 `char` 所占用的空间是一样的。





###  字符串拼接用“+” 还是 StringBuilder?

Java 语言本身并不支持运算符重载，“+”和“+=”是专门为 String 类重载过的运算符，也是 Java 中仅有的两个重载过的运算符

```java
String str1 = "he";
String str2 = "llo";
String str3 = "world";
String str4 = str1 + str2 + str3;
```



![img](https://guide-blog-images.oss-cn-shenzhen.aliyuncs.com/github/javaguide/java/image-20220422161637929.png)

可以看出，字符串对象通过“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

不过，在循环内使用“+”进行字符串的拼接的话，存在比较明显的缺陷：**编译器不会创建单个 `StringBuilder` 以复用，会导致创建过多的 `StringBuilder` 对象**。

```java
String[] arr = {"he", "llo", "world"};
String s = "";
for (int i = 0; i < arr.length; i++) {
    s += arr[i];
}
System.out.println(s);
```

`StringBuilder` 对象是在循环内部被创建的，这意味着每循环一次就会创建一个 `StringBuilder` 对象。

![img](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20220422161320823.png)

如果直接使用 `StringBuilder` 对象进行字符串拼接的话，就不会存在这个问题了。

```java
String[] arr = {"he", "llo", "world"};
StringBuilder s = new StringBuilder();
for (String value : arr) {
    s.append(value);
}
System.out.println(s);
```





### 字符串常量池的作用了解吗？



**字符串常量池** 是 JVM 为了提升性能和减少内存消耗针对字符串（String 类）专门开辟的一块区域，主要目的是为了避免字符串的重复创建。

```java
// 在堆中创建字符串对象”ab“
// 将字符串对象”ab“的引用保存在字符串常量池中
String aa = "ab";
// 直接返回字符串常量池中字符串对象”ab“的引用
String bb = "ab";
System.out.println(aa==bb);// true
```



### String s1 = new String("abc");这句话创建了几个字符串对象？

会创建 1 或 2 个字符串对象。

1、如果字符串常量池中不存在字符串对象“abc”的引用，那么会在堆中创建 2 个字符串对象“abc”

```java
String s1 = new String("abc");
```

![img](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20220413175809959.png)

`ldc` 命令用于判断字符串常量池中是否保存了对应的字符串对象的引用，如果保存了的话直接返回，如果没有保存的话，会在堆中创建对应的字符串对象并将该字符串对象的引用保存到字符串常量池中。

创建两个的原因是为了把字符串缓存, 下次创建的时候直接从常量池中拿



2、如果字符串常量池中已存在字符串对象“abc”的引用，则只会在堆中创建 1 个字符串对象“abc”。

```java
// 字符串常量池中已存在字符串对象“abc”的引用
String s1 = "abc";
// 下面这段代码只会在堆中创建 1 个字符串对象“abc”
String s2 = new String("abc");

```

对应的字节码：

![img](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20220413180021072.png)

7 这个位置的 `ldc` 命令不会在堆中创建新的字符串对象“abc”，这是因为 0 这个位置已经执行了一次 `ldc` 命令，已经在堆中创建过一次字符串对象“abc”了。7 这个位置执行 `ldc`

命令会直接返回字符串常量池中字符串对象“abc”对应的引用



### intern 方法有什么作用?



`String.intern()` 是一个 native（本地）方法，其作用是**将指定的字符串对象的引用保存在字符串常量池中**，可以简单分为两种情况

- 如果字符串常量池中保存了对应的字符串对象的引用，就直接返回该引用。
- 如果字符串常量池中没有保存了对应的字符串对象的引用，那就在常量池中创建一个指向该字符串对象的引用并返回。

```java
// 在堆中创建字符串对象”Java“
// 将字符串对象”Java“的引用保存在字符串常量池中
String s1 = "Java";
// 直接返回字符串常量池中字符串对象”Java“对应的引用
String s2 = s1.intern();
// 会在堆中在单独创建一个字符串对象
String s3 = new String("Java");
// 直接返回字符串常量池中字符串对象”Java“对应的引用
String s4 = s3.intern();
// s1 和 s2 指向的是堆中的同一个对象
System.out.println(s1 == s2); // true
// s3 和 s4 指向的是堆中不同的对象
System.out.println(s3 == s4); // false
// s1 和 s4 指向的是堆中的同一个对象
System.out.println(s1 == s4); //true

```



### String 类型的变量和常量做“+”运算时发生了什么？



先来看字符串不加 `final` 关键字拼接的情况（JDK1.8）：

```java
String str1 = "str";
String str2 = "ing";
String str3 = "str" + "ing";
String str4 = str1 + str2;
String str5 = "string";
System.out.println(str3 == str4);//false
System.out.println(str3 == str5);//true
System.out.println(str4 == str5);//false
```

> 比较 String 字符串的值是否相等，可以使用 `equals()` 方法。 `String` 中的 `equals` 方法是被重写过的。 `Object` 的 `equals` 方法是比较的对象的内存地址，而 `String` 的 `equals` 方法比较的是字符串的值是否相等。如果你使用 `==` 比较两个字符串是否相等的话，IDEA 还是提示你使用 `equals()` 方法替换。

**对于编译期可以确定值的字符串，也就是常量字符串 ，jvm 会将其存入字符串常量池。并且，字符串常量拼接得到的字符串常量在编译阶段就已经被存放字符串常量池，这个得益于编译器的优化。**

在编译过程中，Javac 编译器（下文中统称为编译器）会进行一个叫做 **常量折叠(Constant Folding)** 的代码优化。《深入理解 Java 虚拟机》中是也有介绍到：

![img](https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20210817142715396.png)

常量折叠会把常量表达式的值求出来作为常量嵌在最终生成的代码中，这是 Javac 编译器会对源代码做的极少量优化措施之一(代码优化几乎都在即时编译器中进行)。

对于 `String str3 = "str" + "ing";` 编译器会给你优化成 `String str3 = "string";` 。

并不是所有的常量都会进行折叠，只有编译器在程序编译期就可以确定值的常量才可以：

- 基本数据类型( `byte`、`boolean`、`short`、`char`、`int`、`float`、`long`、`double`)以及字符串常量。
- `final` 修饰的基本数据类型和字符串变量
- 字符串通过 “+”拼接得到的字符串、基本数据类型之间算数运算（加减乘除）、基本数据类型的位运算（<<、>>、>>> ）

**引用的值在程序编译期是无法确定的，编译器无法对其进行优化。**

对象引用和“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

```java
String str4 = new StringBuilder().append(str1).append(str2).toString();
```

我们在平时写代码的时候，尽量避免多个字符串对象拼接，因为这样会重新创建对象。如果需要改变字符串的话，可以使用 `StringBuilder` 或者 `StringBuffer`。

不过，字符串使用 `final` 关键字声明之后，可以让编译器当做常量来处理。

```java
final String str1 = "str";
final String str2 = "ing";
// 下面两个表达式其实是等价的
String c = "str" + "ing";// 常量池中的对象
String d = str1 + str2; // 常量池中的对象
System.out.println(c == d);// true
```

被 `final` 关键字修改之后的 `String` 会被编译器当做常量来处理，编译器在程序编译期就可以确定它的值，其效果就相当于访问常量。

如果 ，编译器在运行时才能知道其确切值的话，就无法对其优化。

示例代码（`str2` 在运行时才能确定其值）：

```java
final String str1 = "str";
final String str2 = getStr();
String c = "str" + "ing";// 常量池中的对象
String d = str1 + str2; // 在堆上创建的新的对象
System.out.println(c == d);// false
public static String getStr() {
      return "ing";
}
```

