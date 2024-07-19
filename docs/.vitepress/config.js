export default {
  title: '动画库',
  description: 'css、js动画库',
  // 打包目录
  dest: './dist',
  themeConfig: {
    logo: '/img/logo.png',
    siteTitle: '动画库',
    // outline: 3,
    search: {
      provider: 'local',
    },
    nav: [
      { text: '动画视图', link: '/components/TSelect/base.md' },
      {
        text: 'Gitee码云地址',
        link: 'https://gitee.com/tangmore/animation-library',
      },
    ],
    sidebar: {
      '/components': [
        {
          text: 'CSS',
          items: [{ text: 'Button组件', link: '/components/TButton/base.md' }],
        },
        {
          text: 'JS',
          items: [
            {
              text: '下拉选择表格组件',
              link: '/components/TSelect/base.md',
            },
          ],
        },
      ],
    },
  },
}
