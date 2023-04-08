import{_ as e,V as t,W as p,X as n,Y as s,Z as o,a0 as i,F as l}from"./framework-9b2b5024.js";const c={},r=n("h2",{id:"平衡二叉树",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#平衡二叉树","aria-hidden":"true"},"#"),s(" 平衡二叉树")],-1),u={href:"https://leetcode.cn/problems/balanced-binary-tree/submissions/",target:"_blank",rel:"noopener noreferrer"},d=i(`<h3 id="分治基本思路" tabindex="-1"><a class="header-anchor" href="#分治基本思路" aria-hidden="true">#</a> 分治基本思路</h3><p>一棵树是否是平衡二叉树, 是<strong>取决与它每个节点对应的子树是否是平衡二叉树</strong>, 只要有一个节点对应的子树不是, 这棵树就不是平衡二叉树</p><p>平衡二叉树 : 每个节点 的左右两个子树的高度差的绝对值不超过 1</p><p>基本思路其实很简单 :</p><ul><li>平衡二叉树<strong>需要判断每个节点的子树是否是平衡二叉树(大问题拆成小问题)</strong>, 所以, 我们需要遍历二叉树</li><li>当前节点的高度, 其实就是当前节点到叶子节点的最大深度</li><li>所以我们获取高度以后, 在后序位置进行判断</li></ul><h3 id="分治代码实现" tabindex="-1"><a class="header-anchor" href="#分治代码实现" aria-hidden="true">#</a> 分治代码实现</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
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

    <span class="token keyword">boolean</span> isBalance <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isBalanced</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">?</span> <span class="token boolean">false</span> <span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 如果是平衡二叉树就返回高度, 不是就返回 -1</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getHeight</span><span class="token punctuation">(</span><span class="token class-name">TreeNode</span> root<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">int</span> leftHeight <span class="token operator">=</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 一棵树是否是平衡二叉树, 是取决与它每个节点对应的子树是否是平衡二叉树, </span>
        <span class="token comment">// 只要有一个节点对应的子树不是, 这棵树就不是平衡二叉树</span>
        
        <span class="token keyword">if</span><span class="token punctuation">(</span>leftHeight <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">int</span> rightHeight <span class="token operator">=</span> <span class="token function">getHeight</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span><span class="token punctuation">(</span>rightHeight <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">abs</span><span class="token punctuation">(</span>leftHeight <span class="token operator">-</span> rightHeight<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 不是</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>leftHeight <span class="token punctuation">,</span> rightHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="迭代基本思路" tabindex="-1"><a class="header-anchor" href="#迭代基本思路" aria-hidden="true">#</a> 迭代基本思路</h3><p>层序遍历 + 获取每个节点的最大深度判断</p><h3 id="迭代代码实现" tabindex="-1"><a class="header-anchor" href="#迭代代码实现" aria-hidden="true">#</a> 迭代代码实现</h3><p>略, ...</p>`,11);function k(v,m){const a=l("ExternalLinkIcon");return t(),p("div",null,[r,n("blockquote",null,[n("p",null,[n("a",u,[s("https://leetcode.cn/problems/balanced-binary-tree/submissions/"),o(a)])])]),d])}const h=e(c,[["render",k],["__file","平衡二叉树.html.vue"]]);export{h as default};
