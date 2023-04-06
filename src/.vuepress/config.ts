import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  // 打包时设置为 base: ""
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "十里平湖霜满天",
      description: "不过是些许风霜罢了",
    },
  },
  theme,
  shouldPrefetch: false,
});
