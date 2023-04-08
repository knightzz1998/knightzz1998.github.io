import{_ as n,V as s,W as a,a0 as t}from"./framework-9b2b5024.js";const p={},e=t(`<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>默认可以直接添加路径自动识别 &quot;/jvm/&quot;,</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>navbar<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress-theme-hope&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> zhNavbar <span class="token operator">=</span> <span class="token function">navbar</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;首页&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;discover&quot;</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/jvm/&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;/service/&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;LeetCode刷题系列&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;note&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">&quot;/leetcode/&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;二叉树系列&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;edit&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">&quot;binary_tree/&quot;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;二叉树的遍历&quot;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;edit&quot;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;二叉树的遍历&quot;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    <span class="token punctuation">{</span>
                        <span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">&quot;其他&quot;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;edit&quot;</span><span class="token punctuation">,</span>
                        <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">&quot;其他&quot;</span><span class="token punctuation">,</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其次就是需要在markdown文件中添加 formatter</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>---
title: dubbo环境搭建+整合SpringBoot
sidebar: heading
---

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以自动识别标题</p>`,6),o=[e];function i(l,r){return s(),a("div",null,o)}const u=n(p,[["render",i],["__file","index.html.vue"]]);export{u as default};
