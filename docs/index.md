---
  layout: home
  hero:
    image: 
      src: /img/frog.gif
      alt: 动画库
    name: 动画库
    tagline: css、js动画。
    actions:
    - theme: brand
      text: 开始使用
      link: /components/css/base.md
  features:
  - icon: 🐸
    title: CSS
    link: /components/css/base.md
    linkText: 了解更多
  - icon: 🦊
    title: JS
    link: /components/css/base.md
    linkText: 了解更多
  - icon: 🐈
    title: MAP
    link: https://vitepress.dev/
  - icon: 🐏
    title: Chart
    link: https://pinia.vuejs.org/zh/
  - icon: 🐇
    title: Three.js
    link: https://vuex.vuejs.org/zh/
  - icon: 🐬
    title: Other
    link: https://router.vuejs.org/zh/
---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  --vp-home-hero-image-background-image: linear-gradient(315deg, #42d392 25%, #647eff);
  --vp-home-hero-image-filter: blur(56px);
}
.image-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  width: 192px;
  height: 192px;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
  transform: translate(-50%, -50%);
}
</style>