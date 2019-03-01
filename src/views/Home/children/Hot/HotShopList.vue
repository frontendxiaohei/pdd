<template>
  <div class="shop-container">
    <ul class="shop-list" v-if="homeshoplist.length>0">
      <li class="shop-list-item" v-for="(item,index) in homeshoplist" :key="index">
        <img v-lazy="item.image_url" width="100%" alt="">
        <h4 class="list-item-title">{{item.goods_name}}</h4>
        <div class="list-item-bottom">
          <span class="item-price">￥{{item.normal_price/100}}</span>
          <span class="item-counter">{{item.sales_tip}}</span>
          <span class="item-user">
            <img v-lazy="user.avatar" alt="" v-for="(user,index1) in item.bubble" :key="index1">
          </span>
          <span class="item-buy">
            <button>去拼单 ></button>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    computed: {
      ...mapState(['homeshoplist'])
    }
  }
</script>

<style scoped lang="stylus">
 .shop-container
    margin-bottom 50px
    background #f5f5f5
    .shop-list
      .shop-list-item
        display flex
        flex-direction column
        margin-bottom 10px
        background #fff
        .list-item-title
          margin-left 3%
          width 94%
          height 44px
          overflow hidden
          line-height 22px
        .list-item-bottom
          display flex
          margin 10px 0
          justify-content space-around
          align-items center
          .item-price
            font-size 18px
            text-align center
            font-weight bolder
            color red
            flex 1
          .item-counter
            flex 2
            font-size 12px
            color #ccc
          .item-user
            display flex
            justify-content center
            align-items center
            flex 1
            img
              width 30px
              border-radius 50%
              &:nth-child(2)
                margin-left -8px
          .item-buy
            flex 2
            button
              display flex
              justify-content center
              align-items center
              margin-right 10px
              width 80%
              height 34px
              color #fff
              font-size 15px
              background red
              border-radius 5px
              border none

</style>
