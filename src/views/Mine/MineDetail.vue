<template>
  <div class="user-detail">
    <div class="user-detail-top">基本信息</div>
    <div class="user-detail-group">
      <div class="user-icon">
        <span>头像</span>
        <img src="./images/me_icon.png" alt="">
      </div>
      <div class="user-item">
        <span>手机</span>
        <span v-if="userInfo.user_phone">{{userInfo.user_phone | phoneFormat}}</span>
        <span v-else><input type="tel" maxlength="11" v-model="user_phone" placeholder="绑定手机号码"></span>
      </div>
      <div class="user-item">
        <span>昵称</span>
        <span><input type="text" v-model="user_name"></span>
      </div>
      <div class="user-item" @click="sheetVisible=true">
        <span>性别</span>
        <span>{{user_sex}}</span>
      </div>
      <div class="user-item">
        <span>常住地</span>
        <span><input type="text" v-model="user_address"></span>
      </div>
      <div class="user-item" @click="selectDate">
        <span>生日</span>
        <span>{{user_birthday}}</span>
      </div>
      <div class="user-item">
        <span>个性签名</span>
        <span><input type="text" v-model="user_sign"></span>
      </div>
      <button @click="saveUserInfo">修改</button>
    </div>
    <!--选择性别-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!--BirthDay-->
    <mt-datetime-picker
      ref="picker"
      type="date"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleBirthDay"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import moment from 'moment'
  import {mapState} from 'vuex'
  import {changeUserInfo} from '@/api/index'
  import {Toast} from 'mint-ui'

  export default {
    name: "MeDetail",
    data() {
      return {
        user_sign: '',
        user_address: '',
        user_name: '',
        user_sex: '',
        user_phone: '',
        user_birthday: '',
        // 性别
        sheetVisible: false,
        actions: [
          {name: 'Man', method: this.selectSex},
          {name: 'Woman', method: this.selectSex}],
        // Birthday
        startDate: new Date('1990-01-01'),
        endDate: new Date(),
      }
    },
    methods: {
      selectSex(props) {
        this.user_sex = props.name;
      },
      selectDate() {
        this.$refs.picker.open();
      },
      handleBirthDay(date) {
        this.user_birthday = moment(date).format('YYYY/MM/DD');
      },
      // 修改用户信息
      async saveUserInfo() {
        // 请求接口
        let result = await changeUserInfo(this.userInfo.id, this.user_name, this.user_sex, this.user_address, this.user_birthday, this.user_phone, this.user_sign)
        // console.log(result)
        Toast({message: result.message,position: 'bottom',duration: 2000});
        if (result.success_code === 200) {
          // 更新本地数据
          this.$store.dispatch('getUserInfo')
          // Back Main
          setTimeout(() => {
            this.$router.replace('/mine')
          },2000)
        }
      }
    },
    computed: {
      ...mapState(['userInfo']),
      phoneRight(user_phone) {
        return /^1[3-8][0-9]{9}$/.test(user_phone)
      }
    },
    created() {
      this.user_sign = this.userInfo.user_sign || ''
      this.user_address = this.userInfo.user_address || ''
      this.user_name = this.userInfo.user_name || ''
      this.user_phone = this.userInfo.user_phone || ''
      this.user_birthday = this.userInfo.user_birthday || ''
      this.user_sex = this.userInfo.user_sex || ''
    },
    filters:
      {
      phoneFormat(phone = '18888888888') {
        // 1.转换成数组
        let phoneArr = [...phone]
        //2.遍历
        let str = ''
        phoneArr.forEach((item, index) => {
          if (index >= 3 && index <= 6) {
            str += '*'
          } else {
            str += item;
          }
        })
        return str;
      }
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .user-detail
    width 100%
    height 100%
    .user-detail-top
      width 100%
      height 60px
      line-height 60px
      padding-left 10px
      font-weight bold
    .user-detail-group
      .user-icon
        height 60px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 40px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        input
          border none
          outline none
          text-align right
      button
        width 90%
        height 40px
        line-height 40px
        background-color #e9232c
        text-align center
        margin 20px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>
