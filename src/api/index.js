import ajax from './ajax'

// 0. 基础路径

const BASE_URL = 'http://localhost:8080/api'
const Other_URL = 'http://127.0.0.1:3000/api'

// 1. 请求首页轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/homecasual')

// 2. 请求首页nav数据
export const getHomeNav = () => ajax(BASE_URL + '/homenavdata')

// 3. 请求首页商品数据
export const getHomeShopList = () => ajax(BASE_URL + '/shoplistdata')

// 4. 请求推荐商品数据
export const getRecommendShopList = (params) => ajax(Other_URL + '/recommendshoplist',params)

// 5. 请求搜索商品列表数据
export const getSearchGoods = () => ajax(BASE_URL + '/searchdata')

// 6. 请求短信验证码
export const getPhoneCode = (phone) => ajax(Other_URL + '/send_code',{phone})

// 7.手机验证码登陆
export const phoneCodeLogin = (phone, code) => ajax(Other_URL + '/login_code', {
  phone,
  code
}, 'POST')

// 8.用户名和密码登录
export const pwdLogin = (name, pwd, captcha) => ajax(Other_URL + '/login_pwd',{name,pwd,captcha},'POST')

// 9.获取登陆的用户信息
export const getUserInfo = () => ajax(Other_URL + '/api/user_info')



