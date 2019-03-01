<template>
    <li class="recommend-item">
    <img v-lazy="item.thumb_url" alt="" width="100%" v-if="item.thumb_url">
    <h4 class="item-title">{{item.short_name}}</h4>
    <div class="item-bottom">
      <span class="item-price">¥{{item.price/100}}</span>
      <span class="item-sales">{{item.sales_tip}}</span>
      <button class="item-btn" v-if="true" @click="clickCellBtn(item)">加入购物车</button>
      <span v-else class="item-user">
        <img src="http://t20img.yangkeduo.com/a/7bb7677358604fcc75c86f37a2a567cfa1107684-1534773680?imageMogr2/thumbnail/100x" alt="">
        <img src="http://t20img.yangkeduo.com/a/7bb7677358604fcc75c86f37a2a567cfa1107684-1534773680?imageMogr2/thumbnail/100x" alt="">
      </span>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      item: Object,
      clickCellBtn: {
        type: Function,
        default: ()=> {}
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/mixins.styl'
  
  .recommend-item
    padding-bottom 15px
    margin-bottom 15px
    width 49.5%
    background #f5f5f5
    &:nth-child(2n-1)
      margin-right 1%
    .item-title
      margin 5px 0
      padding 0 5px
      height 20px
      line-height 20px
      font-size 13px
      font-weight lighter
      overflow hidden
    .item-bottom
      padding 0 6px
      align-items center
      display flex
      .item-price
        flex 2
        color red
        font-size 12px
        font-weight bolder
      .item-sales
        flex 4
        font-size 10px
        color #666
      .item-btn
        flex 4
        height 26px
        border-radius 5px
        background transparent
        color red
        font-size: 12px
        border 1px solid orangered
      .item-user
        img
          width 30px
          border-radius 50%
          &:nth-child(2)
            margin-left -8px


</style>
