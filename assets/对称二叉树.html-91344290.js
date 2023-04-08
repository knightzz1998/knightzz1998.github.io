import{_ as t,V as p,W as o,X as n,Y as s,Z as e,a0 as l,F as i}from"./framework-9b2b5024.js";const c={},u=n("h2",{id:"对称二叉树",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#对称二叉树","aria-hidden":"true"},"#"),s(" 对称二叉树")],-1),r={href:"https://leetcode.cn/problems/symmetric-tree/",target:"_blank",rel:"noopener noreferrer"},d={href:"https://www.programmercarl.com/0101.%E5%AF%B9%E7%A7%B0%E4%BA%8C%E5%8F%89%E6%A0%91.html#%E8%BF%AD%E4%BB%A3%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},k=l(`<h3 id="递归思路" tabindex="-1"><a class="header-anchor" href="#递归思路" aria-hidden="true">#</a> 递归思路</h3><p>首先在开始时, 一定要注意, <strong>对称二叉树对比的并不是一个节点的左右子树, 而是两棵树</strong>, 这个很关键!</p><figure><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111211254708.png" alt="image-20230111211254708" tabindex="0" loading="lazy"><figcaption>image-20230111211254708</figcaption></figure><p>对比时是内侧和内侧对比, 外侧和外侧对比,</p><p>递归三步 :</p><ol><li><p>确定递归的参数以及返回值</p><p>本题中需要去对比内侧和外侧节点是否对称, 所以返回值是 boolean 类型</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> left<span class="token punctuation">,</span> <span class="token class-name">TreeNode</span> right<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>确定终止条件 :</p><ul><li><p>我们在对比两棵树是否对称时, 主要分为以下几种情况</p></li><li><p>左节点为空, 右节点不为空, 不对称 (注意这里是左节点和右节点, 而不是左子树和右子树)</p></li><li><p>左节点不为空, 右节点为空, 不对称</p></li><li><p>左右节点都为空, 对称</p></li><li><p>左右节点都不为空, 此时要比较二者的值</p></li></ul></li></ol><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111211746071.png" alt="image-20230111211746071" style="zoom:50%;"><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code> 		<span class="token comment">// 终止条件 : 避免操作空指针</span>
        <span class="token comment">// 1. 左节点为空, 右节点不为空 不对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 2. 左节点不为空, 右节点为空 不对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 3. 左节点为空, 右节点为空 对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>确定当前层逻辑</li></ol><ul><li>在确定了终止条件为空的情况下, 当前层的逻辑是 判断两个节点值是否相同</li><li>然后分别对比两棵树的内侧和外侧的节点</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  		<span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>val <span class="token operator">!=</span> right<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 1. 对比内侧</span>
        <span class="token keyword">boolean</span> inside <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>right<span class="token punctuation">,</span> right<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 对比外侧</span>
        <span class="token keyword">boolean</span> outside <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>left<span class="token punctuation">,</span> right<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> inside <span class="token operator">&amp;&amp;</span> outside<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="递归流程" tabindex="-1"><a class="header-anchor" href="#递归流程" aria-hidden="true">#</a> 递归流程</h3><p>初始状态 : 传入 left 和 right</p><figure><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111213511399.png" alt="image-20230111213511399" tabindex="0" loading="lazy"><figcaption>image-20230111213511399</figcaption></figure><p>首先是会判断是否存在 left 或者 right 为空的情况(终止条件) , 这个也是为了防止处理空节点</p><p>然后我们要对比以 left 为根节点 和 以right 为根节点的树, 如下图所示, 这个很关键</p><figure><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111213710704.png" alt="image-20230111213710704" tabindex="0" loading="lazy"><figcaption>image-20230111213710704</figcaption></figure><p>首先对比内侧的 :</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">boolean</span> inside <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>right<span class="token punctuation">,</span> right<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111213848145.png" alt="image-20230111213848145" tabindex="0" loading="lazy"><figcaption>image-20230111213848145</figcaption></figure><p>同理, 我们对比内侧其实就是对比的 left.right 和 right.left 这两棵子树是否对称</p><p>我们假设, 当前的树不再向下延伸(这棵树就这么大), 此时的逻辑是</p><ol><li><p>先判断是否满足终止条件, 也就是存在 left.right 或者 right.left 为空的情况, 此时不对称, 直接就返回结果了</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">boolean</span> inside <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>right<span class="token punctuation">,</span> right<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>inside = false , 直接结束</p></li><li><p>假设没有到达终止条件, 先比较 left.right.val 和 right.left.val 是否相等</p></li><li><p>比较内侧和外侧的节点是否对称</p></li><li><p>最后会返回 left.right 和 right.left 这两棵树的是否对称的结果</p></li></ol><p>需要补充的是, 当最后到达叶子节点时, 其实叶子节点也可以看做左右子节点都为空的树</p><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111214540654.png" alt="image-20230111214540654" style="zoom:50%;"><p>如上图所示, 此时他们会被下面的代码处理</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 3. 左节点为空, 右节点为空 对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="递归代码" tabindex="-1"><a class="header-anchor" href="#递归代码" aria-hidden="true">#</a> 递归代码</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * public class TreeNode <span class="token punctuation">{</span>
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() <span class="token punctuation">{</span><span class="token punctuation">}</span>
 *     TreeNode(int val) <span class="token punctuation">{</span> this.val = val; <span class="token punctuation">}</span>
 *     TreeNode(int val, TreeNode left, TreeNode right) <span class="token punctuation">{</span>
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     <span class="token punctuation">}</span>
 * <span class="token punctuation">}</span>
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isSymmetric</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">compare</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">,</span> root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> left<span class="token punctuation">,</span> <span class="token class-name">TreeNode</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
        <span class="token comment">// 终止条件 : 避免操作空指针</span>
        <span class="token comment">// 1. 左节点为空, 右节点不为空 不对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 2. 左节点不为空, 右节点为空 不对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 3. 左节点为空, 右节点为空 对称</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 当前层的处理逻辑 : 左右子树都不为空</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>val <span class="token operator">!=</span> right<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 下一层</span>
        <span class="token comment">// 1. 对比内侧</span>
        <span class="token keyword">boolean</span> inside <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>right<span class="token punctuation">,</span> right<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 对比外侧</span>
        <span class="token keyword">boolean</span> outside <span class="token operator">=</span> <span class="token function">compare</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>left<span class="token punctuation">,</span> right<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> inside <span class="token operator">&amp;&amp;</span> outside<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="迭代思路" tabindex="-1"><a class="header-anchor" href="#迭代思路" aria-hidden="true">#</a> 迭代思路</h3><p>迭代思路和递归思路有一些相似, 都是外侧和外侧对比, 内侧和内侧对比 !</p><p>核心的点就是把每一层的取出来, 然后按照 内侧对内侧 和 外侧对外侧的顺序存入队列</p><p>这样的话, 每次取出栈顶的两个都是一对的</p><img src="https://haloos.oss-cn-beijing.aliyuncs.com/typero/image-20230111223028579.png" alt="image-20230111223028579" style="zoom:50%;"><p>如上图, 核心点是存入队列的时候, 存入的顺序是成对的!</p><p>因为取出来正好的成对的, 这样取出节点后, 我们只需要判断是否对称即可</p><ol><li>左右节点都为空, 不处理, 直接跳过 (对称)</li><li>左节点为空, 右节点不为空 (不对称)</li><li>左节点不为空, 右节点为空 (不对称)</li><li>左右节点都不为空, 比较两个节点的值是否相同</li></ol><h3 id="迭代代码" tabindex="-1"><a class="header-anchor" href="#迭代代码" aria-hidden="true">#</a> 迭代代码</h3><p>需要注意的是 , LinkedList 是可以存储null值的, 其他的数据结构不一定支持</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * Definition for a binary tree node.
 * public class TreeNode <span class="token punctuation">{</span>
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() <span class="token punctuation">{</span><span class="token punctuation">}</span>
 *     TreeNode(int val) <span class="token punctuation">{</span> this.val = val; <span class="token punctuation">}</span>
 *     TreeNode(int val, TreeNode left, TreeNode right) <span class="token punctuation">{</span>
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     <span class="token punctuation">}</span>
 * <span class="token punctuation">}</span>
 */</span>
<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isSymmetric</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Queue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TreeNode</span><span class="token punctuation">&gt;</span></span> queue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span>queue<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token class-name">TreeNode</span> left <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">TreeNode</span> right <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 判断</span>
            <span class="token comment">// 1. 左空, 右不空, 不对称</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 2. 左不为空, 右为空 不对称</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 左右都为空, 就不处理</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>left <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> right <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 左右都不为空的情况, 比较二者的值</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>val <span class="token operator">!=</span> right<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 将下一层子节点添加到队列</span>
            <span class="token comment">// 注意, 要按照对称的顺序, 外侧对外侧, 内侧对内侧</span>
            <span class="token comment">// left.left 和 right.right</span>
            <span class="token comment">// left.right 和 right.left</span>
            <span class="token comment">// 外侧</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>right<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 内侧</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>left<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
            queue<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>right<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,40);function v(m,b){const a=i("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("leetcode : "),n("a",r,[s("https://leetcode.cn/problems/symmetric-tree/"),e(a)])]),n("p",null,[s("参考 "),n("a",d,[s("对称二叉树"),e(a)])]),k])}const f=t(c,[["render",v],["__file","对称二叉树.html.vue"]]);export{f as default};
