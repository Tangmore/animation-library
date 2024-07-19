import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate' 

export default createStore({
  state: { 
    themeName:sessionStorage.getItem('themeName') || 'defaultTheme',
    userId: '',
    mapConfig:  {
      internetUrl: "http://t0.tianditu.gov.cn/DataServer",//互联网地址
      governmentUrl: "https://23.157.99.54:1443/DataServer",//政务网地址
      mapKey: '9337647a52919b1dd3bc009c730b07a7',
  },
  },
  mutations: {
    saveUserId(state,userId){
      state.userId = userId
    },
     // 主题
     handleThemeName: (state, themeName) => {
      state.themeName = themeName 
      sessionStorage.setItem('themeName', themeName)
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
