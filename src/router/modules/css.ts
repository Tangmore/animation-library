const cssRouter = [ 
  {
    name: 'text1',
    path: '/css/text1',
    component: () => import('@/views/css/text文字挨个显示.vue'),
    meta: { title: 'text文字挨个显示', requiresAuth: true },
  },
  {
    name: 'scss',
    path: '/scss',
    component: () => import('@/views/scss/scss编译.vue'),
    meta: { title: 'scss编译', requiresAuth: true },
  },
]

export default cssRouter