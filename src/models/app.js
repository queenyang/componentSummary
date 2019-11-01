export default {
  namespace: 'app',
  state: {
    collapsed: false,
    panes: [
      { title: `dashboard`, content: '', key: '1', closable: false, url: '/dashboard' },
    ],
    theme: 'dark',
    menus: [{
      id: '1',
      name: 'dashboard',
      icon: 'dashboard',
      url: '/dashboard',
    }, {
      id: '2',
      name: 'd3组件',
      icon: 'user',
      url: '1',
      children: [
        {
          id: '21',
          name: '水波球',
          icon: 'user',
          url: '/liquidFill',
        },
        {
          id: '22',
          name: '柱状图',
          icon: 'user',
          url: '/barGraph',
        },
        {
          id: '23',
          name: '折线图',
          icon: 'user',
          url: '/lineChart',
        },
        {
          id: '24',
          name: '渐变镂空圆环',
          icon: 'user',
          url: '/gradientRing',
        },
      ]
    },
    {
      id: '3',
      name: 'canvas组件',
      icon: 'user',
      url: '1',
      children: [
        {
          id: '31',
          name: '粒子渲染图片',
          icon: 'user',
          url: '/particleImg',
        },
        {
          id: '32',
          name: '生成图片',
          icon: 'user',
          url: '/convertToImg',
        },
      ]
    }
    ],
  },
  subscriptions: {},
  effects: {},
  reducers: {
    handleCollapseChange(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
