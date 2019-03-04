import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_SHOP_LIST,
  RECOMMEND_SHOP_LIST,
  SEARCH_DATA,
  USER_INFO,
  RESET_USER_INFO,
} from './mutations_type'

export default {
  // 首页轮播图数据
  [HOME_CASUAL](state,{homecasual}) {
    state.homecasual = homecasual
  },
  [HOME_NAV](state,{homenav}) {
    state.homenav = homenav;
  },
  [HOME_SHOP_LIST](state,{homeshoplist}) {
    state.homeshoplist = homeshoplist
  },
  [RECOMMEND_SHOP_LIST](state,{recommendshoplist}) {
    state.recommendshoplist = recommendshoplist
  },
  [SEARCH_DATA](state,{searchdata}) {
    state.searchdata = searchdata
  },
  // 用户信息
  [USER_INFO](state, {
    userInfo
  }) {
    state.userInfo = userInfo
  },

  // 清空用户信息
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  }
}