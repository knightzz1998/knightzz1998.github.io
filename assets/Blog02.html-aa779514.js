import{_ as s,V as n,W as a,a0 as e}from"./framework-9b2b5024.js";const t={},o=e(`<h2 id="解决办法" tabindex="-1"><a class="header-anchor" href="#解决办法" aria-hidden="true">#</a> 解决办法</h2><p>.vuepress/config.ts 设置base 为 <code>base: &quot;&quot;, dest: &#39;./dist&#39;,</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vuepress&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> theme <span class="token keyword">from</span> <span class="token string">&quot;./theme.js&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  base<span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
  dest<span class="token operator">:</span> <span class="token string">&#39;./dist&#39;</span><span class="token punctuation">,</span>
  locales<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;/&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      lang<span class="token operator">:</span> <span class="token string">&quot;zh-CN&quot;</span><span class="token punctuation">,</span>
      title<span class="token operator">:</span> <span class="token string">&quot;兀坐晴窗独饮茶&quot;</span><span class="token punctuation">,</span>
      description<span class="token operator">:</span> <span class="token string">&quot;可惜这是你和的她的婚礼, 而我只是嘉宾&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  theme<span class="token punctuation">,</span>

  shouldPrefetch<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步 : 找到 node_modules/@vuepress/client/dist/app.js</p><p>在开头的导入部分 添加 createWebHashHistory,</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
  createMemoryHistory<span class="token punctuation">,</span>
  createRouter<span class="token punctuation">,</span>
  createWebHistory<span class="token punctuation">,</span>
    <span class="token comment">// 添加以hash的方式去读取</span>
  createWebHashHistory<span class="token punctuation">,</span>
  <span class="token constant">START_LOCATION</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue-router&quot;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后在后面修改路由模式为 createWebHashHistory 即可</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// src/router.ts</span>
<span class="token comment">// var historyCreator = _<wbr>_VUEPRESS_SSR__ ? createMemoryHistory : createWebHistory;</span>
<span class="token comment">// TODO 修改路由模式</span>
<span class="token keyword">var</span> historyCreator <span class="token operator">=</span> _<wbr>_VUEPRESS_SSR__ <span class="token operator">?</span> createMemoryHistory <span class="token operator">:</span> createWebHashHistory<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),p=[o];function i(c,l){return n(),a("div",null,p)}const u=s(t,[["render",i],["__file","Blog02.html.vue"]]);export{u as default};
