const cssRouter = [
  {
    name: 'rotate',
    path: '/css/rotate',
    component: () => import('@/views/css/rotate.vue'),
    meta: { title: 'rotate', requiresAuth: true },
  },
  {
    name: 'text1',
    path: '/css/text1',
    component: () => import('@/views/css/text文字挨个显示.vue'),
    meta: { title: 'text文字挨个显示', requiresAuth: true },
  },
]

export default cssRouter