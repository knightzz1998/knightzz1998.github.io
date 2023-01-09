import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  // dest: './dist',
  locales: {
    "/": {
      lang: "zh-CN",
      title: "兀坐晴窗独饮茶",
      description: "可惜这是你和的她的婚礼, 而我只是嘉宾",
    },
  },
  theme,

  shouldPrefetch: false,
});
