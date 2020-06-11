<template>
  <div class="home">
    <!-- 头部通知 -->
    <div
      class="info"
      :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
      @click="$router.push('message')"
    >
      <p>{{info01}}...</p>
      <i>/</i>
      <p>{{info02}}...</p>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <van-swipe :autoplay="3000" indicator-color="#007aff">
        <van-swipe-item v-for="(image, index) in SwiperImg" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 数据列表、滚动 -->
    <div class="datas flex">
      <div v-if="!show" class="loading">
        <van-loading
          size="24px"
          vertical
          style="[{'width': '100%'},{'padding': '20px'}, {'background': $store.state.mode? '#fff' : '#1d2635'}]"
        >{{$t('message.loading')}}</van-loading>
      </div>
      <div
        class="container"
        v-if="show"
        :style="[{'background':$store.state.mode?'#ededed':'#191919'}]"
      >
        <!-- 数据列表循环 -->
        <div
          class="item"
          v-for="(item, index) of datas"
          :key="index"
          @click="handleNavTo(item.market, item.symbol)"
          :style="[{'background': $store.state.mode? '#fff' : '#1d2635'}]"
        >
          <div>
            <span
              :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            >{{item.market}}/{{item.symbol | handleUpper}}</span>
            <span :class="item.changepercent>0? 'green':'red'">{{item.changepercent | handleNum}}%</span>
          </div>
          <p>{{item.close}}</p>
          <p>24H Vol</p>
          <p>{{item.vol}}</p>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="tabs_nav flex">
        <!-- Tab01 -->
        <div @click="handleTab" id="0">
          <p
            :class="[{line:active==0? true : false},{white:active==0? true : false}]"
            :style="[{'color':!$store.state.mode?'#aaa':'#000'}]"
          >{{$t('message.optional')}}</p>
        </div>
        <!-- Tab02 -->
        <div @click="handleTab" id="1">
          <p
            :class="[{line:active==1? true : false},{white:active==1? true : false}]"
            :style="[{'color':!$store.state.mode?'#aaa':'#000'}]"
          >USDT</p>
        </div>
        <div @click="handleTab" id="2">
          <p
            :class="[{line:active==2? true : false},{white:active==2? true : false}]"
            :style="[{'color':!$store.state.mode?'#aaa':'#000'}]"
          >BTC</p>
        </div>
      </div>

      <!-- tabs内容区 -->
      <div class="tab1_content" v-if="active==0">
        <Search></Search>
        <Nodatas></Nodatas>
      </div>
      <div class="tab2_content" v-if="active==1">
        <Search></Search>
        <van-loading size="24px" vertical v-if="!show01">{{$t('message.loading')}}</van-loading>
        <Content :datas="datas_list01" v-if="show01"></Content>
      </div>
      <div class="tab3_content" v-if="active==2">
        <Search></Search>
        <van-loading size="24px" vertical v-if="!show02">{{$t('message.loading')}}</van-loading>
        <Content :datas="datas_list02" v-if="show02"></Content>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search'
import Content from '../components/Content'
import Nodatas from '../components/Nodatas'
export default {
  name: 'swiper',
  components: {
    Search,
    Content,
    Nodatas
  },
  data() {
    return {
      // 轮播图
      SwiperImg: [require('../assets/carousel01.png'), require('../assets/carousel01.png'), require('../assets/carousel01.png')],
      // tabs起始页
      active: 1,
      datas: [],
      datas_list01: [],
      datas_list02: [],
      // 数据加载时的加载状态
      loadingShow: false,
      timer01: null,
      t01: null,
      t02: null,
      timer02: null,
      order: this.$store.state.sort.order,
      sort: this.$store.state.sort.sort,
      ws: null,
      ws01: null,
      ws02: null,
      // 记录websocket是否获得第一次数据
      socketState: false,
      // 公告消息
      info01: '',
      info02: ''
    }
  },

  created() {
    this.getNews()
    var datas = this.$store.state.home_datas.length
    if (datas) {
      this.datas = this.$store.state.home_datas
      this.datas_list01 = this.$store.state.usdt_datas
      this.datas_list02 = this.$store.state.btc_datas
    } else {
      this.init()
      this.changeTabs()
    }
  },
  computed: {
    // 判断数据是否获取
    show: {
      get: function() {
        if (this.datas != '') {
          return true
        }
        return false
      },
      set: val => {
        return val
      }
    },
    show01: {
      get: function() {
        if (this.datas_list01 != '') {
          return true
        }
        return false
      },
      set: val => {
        return val
      }
    },
    show02: {
      get: function() {
        if (this.datas_list02 != '') {
          return true
        }
        return false
      },
      set: val => {
        return val
      }
    }
  },
  watch: {
    // 判断升序降序
    '$store.state.sort': function() {
      this.order = this.$store.state.sort.order
      this.sort = this.$store.state.sort.sort
      if (this.ws01 != null) {
        this.ws01.close()
        this.changeTabs()
      }
      if (this.ws02 != null) {
        this.ws02.close()
        this.changeTabs()
      }
    }
  },
  methods: {
    // 初始化websocket
    init() {
      var that = this
      if ('WebSocket' in window) {
        var ws = new WebSocket('WSS://exchange.gd-juzheng.com:2345')
        this.ws = ws
      }
      var param = {
        type: 'index',
        symbol: 'USDT',
        order: 'weigh',
        sort: 'desc',
        market: '',
        think_var: 'en'
      }

      ws.onopen = function() {
        if (that.ws.readyState == 1) {
          ws.send(JSON.stringify(param))
        }
      }
      ws.onmessage = function(e) {
        setTimeout(() => {
          ws.send(JSON.stringify(param))
        }, 1000)
        var res = JSON.parse(e.data)
        that.datas = res
        that.$store.commit('getSocket', { datas: res, type: 'home' })
      }
    },

    // tabs页切换
    handleTab(e) {
      this.active = e.currentTarget.id
      this.changeTabs()
    },

    // 跳转到相应的页面
    handleNavTo(market, symbol) {
      var str = market + '/' + symbol
      this.$store.commit('addMarket', str)
      this.$router.push({ path: '/DASH_BTC/jy' })
    },

    // 改变tabs建立websocket
    changeTabs() {
      clearTimeout(this.timer01)
      clearTimeout(this.timer02)
      var that = this
      if (this.active == '1') {
        var timer01 = setTimeout(() => {
          this.ws01 = new WebSocket('WSS://exchange.gd-juzheng.com:2345')
          let param = {
            type: 'index',
            symbol: 'USDT',
            order: that.$store.state.sort.order,
            sort: that.$store.state.sort.sort,
            market: '',
            think_var: 'en'
          }
          that.show01 = true
          // 发送的消息
          let sendMessage = function(socket, param) {
            if (that.ws01.readyState === 1) {
              socket.send(JSON.stringify(param))
            }
          }

          that.ws01.onopen = function() {
            sendMessage(that.ws01, param)
          }
          that.ws01.onmessage = function(e) {
            that.t01 = setTimeout(() => {
              sendMessage(that.ws01, param)
            }, 1000)
            var res = JSON.parse(e.data)
            that.datas_list01 = res
            that.$store.commit('getSocket', { datas: res, type: 'usdt' })
          }
          that.ws01.onclose = function(e) {
            that.ws01.onopen()
          }
        }, 500)
        that.timer01 = timer01
      }

      if (this.active == '2') {
        var timer02 = setTimeout(() => {
          that.show02 = true
          this.ws02 = new WebSocket('WSS://exchange.gd-juzheng.com:2345')
          let param = {
            type: 'index',
            symbol: 'BTC',
            order: that.order,
            sort: that.sort,
            market: '',
            think_var: 'en'
          }
          // 发送的消息
          let sendMessage = function(socket, param) {
            if (that.ws02.readyState === 1) {
              socket.send(JSON.stringify(param))
            }
          }
          that.ws02.onopen = function() {
            sendMessage(that.ws02, param)
          }
          that.ws02.onmessage = function(e) {
            that.t02 = setTimeout(() => {
              sendMessage(that.ws02, param)
            }, 1000)
            var res = JSON.parse(e.data)
            that.datas_list02 = res
            that.$store.commit('getSocket', { datas: res, type: 'btc' })
          }
        }, 500)
      }
      that.timer02 = timer02
    },

    // 获取公告
    async getNews() {
      const { data: res } = await this.axios.get('/index/news', { params: { id: 1 } })
      let lang = sessionStorage.getItem('locale')
      if (lang == 'zh') {
        this.info01 = res.data.list.data.slice(0, 2)[0].zh_name
        this.info02 = res.data.list.data.slice(0, 2)[1].zh_name
      }
      if (lang == 'en') {
        this.info01 = res.data.list.data.slice(0, 2)[0].en_name
        this.info02 = res.data.list.data.slice(0, 2)[1].en_name
      }
      if (lang == 'ko') {
        this.info01 = res.data.list.data.slice(0, 2)[0].ko_name
        this.info02 = res.data.list.data.slice(0, 2)[1].ko_name
      }
      if (lang == 'jp') {
        this.info01 = res.data.list.data.slice(0, 2)[0].jp_name
        this.info02 = res.data.list.data.slice(0, 2)[1].jp_name
      }
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  font-size: 26px;
}
.flex {
  display: flex;
}
.tabs_nav {
  div {
    flex: 1;
    box-sizing: border-box;
    text-align: center;
    font-size: 28px;
    p {
      font-size: 24px;
      display: inline-block;
      padding: 20px 0;
      color: rgb(130, 142, 161);
    }
    .white {
      color: #fff;
    }
    .line {
      border-bottom: 3px solid rgb(36, 160, 245);
    }
  }
}

.info {
  width: 100%;
  padding: 15px 0;
  display: flex;
  box-sizing: border-box;
  i {
    line-height: 50px;
    margin: 0 20px 0 0;
    flex: 0.2;
    display: flex;
    justify-content: center;
  }
  p {
    flex: 1;
    width: 320px;
    font-size: 24px;
    line-height: 50px;
    box-sizing: border-box;
    &:nth-child(1) {
      margin-left: 30px;
    }
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.swiper {
  .van-swipe {
    width: 100%;
    height: 4rem;
  }
  i {
    font-size: 40px;
  }
  img {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}

.datas {
  overflow-x: auto;
  overflow-y: hidden;
  height: 200px;
  &::-webkit-scrollbar {
    display: none;
  }
  .loading {
    width: 100%;
    height: 100%;
    position: relative;
    div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .container {
    display: flex;
  }
  .item {
    color: rgb(130, 142, 161);
    padding: 20px;
    box-sizing: border-box;
    margin: 10px;
    .green {
      color: green;
    }
    .red {
      color: red;
    }
    p {
      padding: 5px 0;
      &:nth-child(2) {
        font-size: 26px;
      }
    }
    div {
      display: flex;
      span:nth-child(1) {
        display: flex;
        flex-wrap: nowrap;
        width: 150px;
      }
      padding: 5px 0;
      span:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
}

.jy_tab {
  width: 10rem;
  box-sizing: border-box;
  height: 2rem;
  color: rgba(237, 244, 248, 1);
}
</style>
