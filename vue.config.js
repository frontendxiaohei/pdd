const webpack = require('webpack');
const path = require('path');
const homecasualData = require('./data/homecasual.json')
const goodsList = require('./data/goods_list.json');
const HomeNav = require('./data/homenav.json');
const RecommendUsers = require('./data/recommend_users.json');
const Recommend = require('./data/recommend.json');
const Search = require('./data/search.json');
const ShopList = require('./data/shoplist.json');
const Test = require('./data/test.json');
const CasualData = homecasualData.data;
const GoodsListData = goodsList.goods_list;
const HomeNavData = HomeNav.data;
const RecommendUsersData = RecommendUsers.data;
const RecommendData = Recommend.data;
const SearchData = Search.data;
const ShopListData = ShopList.goods_list;
const TestData = Test.data;
function resolve(dir){
  return path.join(__dirname,dir);
}


module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('components',resolve('src/components'))
      .set('common',resolve('src/common'))
      .set('api',resolve('src/api'))
      .set('views',resolve('src/views'))
      .set('router',resolve('src/router'))
      .set('store',resolve('src/store'))
      .set('api',resolve('src/api'))
  },

  devServer: {
    before(app) {
      app.get('/api/homecasual', function (req,res) {
        res.json({
          errno: 0,
          data: CasualData
        })
      });
      app.get('/api/goodlistdata', function (req, res) {
        res.json({
          errno: 0,
          data: GoodsListData
        })
      });
      app.get('/api/goodlistdata', function (req, res) {
        res.json({
          errno: 0,
          data: GoodsListData
        })
      });
      app.get('/api/homenavdata', function (req, res) {
        res.json({
          errno: 0,
          data: HomeNavData
        })
      });
      app.get('/api/recommendusersdata', function (req, res) {
        res.json({
          errno: 0,
          data: RecommendUsersData
        })
      });
      app.get('/api/recommenddata', function (req, res) {
        res.json({
          errno: 0,
          data: RecommendData
        })
      });
      app.get('/api/searchdata', function (req, res) {
        res.json({
          errno: 0,
          data: SearchData
        })
      });
      app.get('/api/shoplistdata', function (req, res) {
        res.json({
          errno: 0,
          data: ShopListData
        })
      });
      app.get('/api/testdata', function (req, res) {
        res.json({
          errno: 0,
          data: TestData
        })
      });
    },
     proxy: {
         '/api': {
           target: 'http://127.0.0.1:8080',
           ws: true,
           changeOrigin: true,
           pathRewrite: {
             '^/api': '' //通过pathRewrite重写地址，将前缀/api转为/
           }
         }
       }
  },
}
