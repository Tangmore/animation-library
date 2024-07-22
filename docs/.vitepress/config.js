import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'
export default defineConfig({
  title: '动画库',
  description: 'css、js动画库',
  // 打包目录
  dest: './animation',
  themeConfig: {
    logo: '/img/logo.png',
    siteTitle: '动画库',
    // outline: 3,
    search: {
      provider: 'local',
    },
    nav: [
      { text: '动画视图', link: '/components/animation/base.md' },
      {
        text: 'Gitee码云地址',
        link: 'https://gitee.com/tangmore/animation-library',
      },
    ],
    sidebar: {
      '/components': [
        {
          text: 'CSS',
          items: [{ text: '普通动画', link: '/components/animation/base.md' }],
        },
      ],
    },
  },
  markdown: {
    headers: {
      level: [0, 0],
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },
    config: (md) => mdPlugin(md),
  },
})
