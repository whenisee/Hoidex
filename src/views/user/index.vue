<template>
  <div class="user" @click="closeMenu" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- 头部信息 -->
    <div class="user_info" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <div>
        <img src="@/assets/login.png" />
      </div>
      <div :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <p>
          <span>{{$t('user.nickname')}}</span>
          <span>{{$t('user.change')}}</span>
        </p>
        <p>{{userinfo_name | reg(3,4)}}</p>
        <p>ID：{{userinfo.id}}</p>
      </div>
    </div>

    <!-- tab页 -->
    <div class="tabs">
      <div class="tabs_nav flex" :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <!-- Tab01 -->
        <div @click="handleTab" id="0">
          <p
            :class="[{line:active==0? true : false},{white:active==0? true : false}]"
          >{{$t('user.security')}}</p>
        </div>
        <!-- Tab02 -->
        <div @click="handleTab" id="1">
          <p
            :class="[{line:active==1? true : false},{white:active==1? true : false}]"
          >{{$t('user.safety')}}</p>
        </div>
      </div>

      <!-- tabs内容区 -->
      <div class="tab1_content" v-if="active==0" >
        <!-- 1 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"></i>
          </li>
          <li>
            <p>{{$t('user.password')}}</p>
            <p></p>
            <p>{{$t('user.change')}}</p>
          </li>
        </ul>
        <!-- 2 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"></i>
          </li>
          <li>
            <p>{{$t('user.verify')}}</p>
            <p></p>
            <p>{{$t('user.verification')}}</p>
          </li>
        </ul>
        <!-- 3 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"></i>
          </li>
          <li>
            <p>{{$t('user.email')}}</p>
            <p>{{userinfo.email | reg(1,9)}}</p>
            <p>{{$t('user.change')}}</p>
          </li>
        </ul>
        <!-- 4 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"></i>
          </li>
          <li>
            <p>{{$t('user.phone')}}</p>
            <p>{{userinfo.mobile | reg(3,4)}}</p>
            <p>{{$t('user.change')}}</p>
          </li>
        </ul>
        <!-- 5 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"  :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
          </li>
          <li>
            <p>{{$t('user.google')}}</p>
            <p></p>
            <p>{{$t('user.connect')}}</p>
          </li>
        </ul>
        <!-- 6 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"  :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
          </li>
          <li>
            <p style="flex: 4">{{$t('user.base')}}</p>
            <p style="text-align: center;">
              <van-switch inactive-color="rgb(63,77,102)" v-model="checked" size="16" />
            </p>
          </li>
        </ul>
        <!-- 7 -->
        <ul :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
          <li>
            <i class="iconfont iconyouxiang"  :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
          </li>
          <li>
            <p>{{$t('user.invitation')}}</p>
            <p></p>
            <p>{{$t('user.view')}}</p>
          </li>
        </ul>
      </div>
      <div class="tab2_content" v-else>
        <!-- 菜单选择 -->
        <div class="head">
          <div class="mode" @click="handleShow">
            <span id="mode">{{current}}</span>
            <i class="iconfont iconjiantouarrow486" id="mode_icon" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
            <!-- 菜单 -->
            <div class="menu" v-if="menuShow">
              <p
                v-for="(item, index) of menuList"
                :key="index"
                :class="{current: choosed==index}"
                @click="handleChoose(index)"
              >{{item}}</p>
            </div>
          </div>
        </div>
        <!-- 登录记录 -->
        <div class="desc" v-if="loginInfo == 'record'" >
          <ul >
            <li class="flex">
              <p>{{$t('user.time')}}</p>
              <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{userinfo.expires_in | handleFormat}}</p>
            </li>
            <li class="flex">
              <p>{{$t('user.type')}}</p>
              <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">2020-05-12 11:55:40</p>
            </li>
            <li class="flex">
              <p>{{$t('user.ip')}}</p>
              <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">2020-05-12 11:55:40</p>
            </li>
            <li class="flex">
              <p>{{$t('user.status')}}</p>
              <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">2020-05-12 11:55:40</p>
            </li>
          </ul>
        </div>
        <!-- 安全记录 -->
        <div class="desc" v-if="loginInfo == 'history'">
          <ul>
            <li class="flex">
              <p>{{$t('user.time')}}</p>
              <p>2020-05-12 11:55:40</p>
            </li>
            <li class="flex">
              <p>{{$t('user.time')}}</p>
              <p>2020-05-12 11:55:40</p>
            </li>
            <li class="flex">
              <p>{{$t('user.time')}}</p>
              <p>2020-05-12 11:55:40</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tabs当前页
      active: 0,
      //   登录记录菜单显示隐藏
      menuShow: false,
      //   登录记录菜单
      menuList: [this.$t("user.loginhistory"), this.$t("user.securitysetting")],
      //   当前选择菜单
      choosed: 0,
      current: this.$t("user.loginhistory"),
      loginInfo: "record",
      //   用户信息
      userinfo: {},
      userinfo_name: "",
      // 是否选中平台币作为手续费
      checked: false
    };
  },
  created() {},
  computed: {},
  methods: {
    //   跳转tabs
    handleTab(e) {
      this.active = e.currentTarget.id;
    },

    // 登录记录菜单显示隐藏
    handleShow() {
      this.menuShow = !this.menuShow;
    },

    // 点击窗口其他位置关闭菜单
    closeMenu(e) {
      if (e.target.id !== "mode" && e.target.id !== "mode_icon") {
        this.menuShow = false;
      }
    },

    // 选择菜单
    handleChoose(index) {
      this.choosed = index;
      this.current = this.menuList[index];
      if (index == 0) {
        this.loginInfo = "record";
      } else {
        this.loginInfo = "history";
      }
    }
  },
  mounted() {
    var userinfo = localStorage.getItem("userinfo");
    if (userinfo) {
      userinfo = JSON.parse(userinfo);
      if (userinfo.mobile) {
        this.userinfo_name = userinfo.mobile;
      } else {
        this.userinfo_name = userinfo.username;
      }
      this.userinfo = userinfo;
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  background: rgb(29,38,53);
  position: relative;
  top: 3px;
  box-sizing: border-box;
  padding-bottom: 100px;
  .flex {
    display: flex;
  }
  .user_info {
    display: flex;
    box-sizing: border-box;
    padding: 40px;
    background: rgb(29, 38, 53);
    img {
      margin: 0 30px 0 0;
    }
    p {
      &:nth-child(1) {
        margin-top: 20px;
        span:nth-child(2) {
          color: rgb(36, 160, 245);
          margin-left: 40px;
        }
      }
      &:nth-child(2) {
        margin: 20px 0;
        font-size: 40px;
      }
      &:nth-child(3) {
        color: rgb(130, 142, 161);
      }
    }
  }
  .tabs_nav {
    background: rgb(38, 48, 67);
    div {
      flex: 1;
      box-sizing: border-box;
      text-align: center;
      font-size: 28px;
      p {
        display: inline-block;
        padding: 20px 0;
        color: rgb(130, 142, 161);
      }
      .line {
        border-bottom: 3px solid rgb(36, 160, 245);
      }
    }
  }
  .tab1_content {
    ul {
      padding: 10px 30px;
      display: flex;
      font-size: 28px;
      box-sizing: border-box;
      li {
        display: flex;
        padding: 30px 0;
        &:nth-child(1) {
          flex: 1;
          i {
            font-size: 35px;
            line-height: 33px;
          }
        }
        &:nth-child(2) {
          flex: 8;
          border-bottom: 1px solid rgb(41, 52, 72);
          p {
            display: inline-block;
            &:nth-child(1) {
              flex: 1;
            }
            &:nth-child(2) {
              flex: 1;
              text-align: end;
            }
            &:nth-child(3) {
              font-size: 25px;
              color: rgb(36, 160, 245);
              flex: 0.4;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .tab2_content {
    padding: 20px 30px;
    box-sizing: border-box;
    div {
      color: rgb(130, 142, 161);
      font-size: 26px;
    }
    .head {
      padding: 0 0 30px 0;
      box-sizing: border-box;
      .mode {
        display: inline-block;
        padding: 10px 0;
        position: relative;
        i {
          color: #fff;
        }
        .menu {
          position: absolute;
          top: 60px;
          z-index: 100;
          background: rgb(26, 31, 42);
          p {
            padding: 30px 10px;
            display: flex;
            justify-content: center;
            flex-wrap: nowrap;
            &:nth-child(2) {
              width: max-content;
            }
          }
          .current {
            color: #fff;
            background: rgb(38, 48, 67);
          }
        }
      }
    }
    .desc {
      box-sizing: border-box;
      ul {
        box-sizing: border-box;
        padding: 30px 0;
        border-bottom: 1px solid rgb(38, 48, 67);
        li {
          display: flex;
          width: 100%;
          padding: 20px 0;
          p {
            flex: 1;
            &:nth-child(2) {
              text-align: end;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>