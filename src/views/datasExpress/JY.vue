<template>
  <div class="jy" @click="closeMenu" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- （买入/卖出） -->
    <div class="tabs" :style="[{'background':$store.state.mode?'#ededed':'#263043'}]">
      <div
        :class="active==0?'bottom_line buy' : 'buy'"
        @click="handleBuy()"
        :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
      >{{$t('dash.buy')}}</div>
      <div
        :class="active==1?'bottom_line sell' : 'sell'"
        @click="handleSell()"
        :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
      >{{$t('dash.sell')}}</div>
    </div>

    <!-- 分类 -->
    <div class="attribute" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <div>
        <span id="type" @click="openMenu">{{current_type}}</span>
        <i
          id="type_icon"
          class="iconfont icon-xialasanjiaoxingx"
          :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        ></i>
      </div>
      <div
        class="menu"
        v-if="show"
        :style="[{'background':$store.state.mode?'#f7efef':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
      >
        <p
          @click="chooseType"
          v-for="(item, index) of transType"
          :class="{choose: current_choose == index? true : false}"
          :key="index"
          :id="index"
        >{{item}}</p>
      </div>
      <div class="flex">
        <div class="padding-lr">{{$t('dash.price')}}</div>
        <div class="flex-end">{{$t('dash.amount')}}</div>
      </div>
    </div>

    <!-- 数据 -->
    <div class="datas" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <div class="datas_left">
        <div class="flex border flex-between" v-if="current_choose==0">
          <div>
            <!-- 价格 -->
            <input
              v-model="amount_first"
              type="number"
              min="0"
              :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            />
          </div>
          <div
            class="center"
            :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
          >{{$store.state.symbol | handleTrans}}</div>
        </div>
        <div class="border" v-if="current_choose==1">
          <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('dash.price')}}</p>
          <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('dash.bestPrice')}}</p>
        </div>
        <div
          class="padding bg-gray margin-b"
          v-show="current_choose==0"
          :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        >≈ ${{amount_first | handleMoney}}</div>
        <div class="flex border flex-between">
          <!-- 数量 -->
          <input
            v-model="amount_second"
            placeholder="0"
            :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
          />
          <div :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$store.state.market}}</div>
        </div>
        <div>
          <div class="flex flex-between padding-tb">
            <div
              @click="handlePercent(0)"
              class="border-s"
              :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            >25%</div>
            <div
              @click="handlePercent(0)"
              class="border-s"
              :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            >50%</div>
            <div
              @click="handlePercent(0)"
              class="border-s"
              :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            >75%</div>
            <div
              @click="handlePercent(0)"
              class="border-s"
              :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
            >100%</div>
          </div>
        </div>
        <div>
          <p
            :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
          >{{$t('dash.available')}}：0 {{usdt | handleTrans}}</p>
          <p
            :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
          >{{$t('dash.total')}}：--</p>
        </div>
      </div>
      <div class="datas_right">
        <!-- 卖出 -->
        <div
          class="flex flex-between sell_item"
          v-for="(item, index) of datas.depth.sell.slice(0,5)"
          :key="index"
        >
          <p class="f-red">{{item.price | handleDecimal(depth)}}</p>
          <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
            {{item.account | handleDecimal(4)}}
            <span
              class="rectangle_red"
              :style="{width: rectangleSell_width[index] + 'px'}"
            >{{item.account}}</span>
          </p>
        </div>
        <!-- 美金人民币兑换 -->
        <div
          v-if="datas.marketInfo.close"
          class="padding-tb padding f-26"
          :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        >
          {{datas.marketInfo.close}}
          <span
            v-if="datas.marketInfo"
            class="f-gray"
          >≈${{datas.marketInfo.close | handleMoney}}</span>
        </div>
        <!-- 买入 -->
        <div
          class="flex flex-between sell_item"
          v-for="(item, index) of datas.depth.buy.slice(0,5)"
          :key="index+5"
        >
          <p class="f-green">{{item.price | handleDecimal(depth)}}</p>
          <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
            {{item.account | handleDecimal(4)}}
            <span
              class="rectangle_green"
              :style="{width: rectangleBuy_width[index] + 'px'}"
            >{{item.account}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <div
      class="login padding-lr flex flex-between"
      :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"
    >
      <div>
        <van-button
          v-if="!$store.state.online"
          type="info"
          @click="navToLogin()"
        >{{$t('dash.login')}}/{{$t('dash.signUp')}}</van-button>
        <van-button
          v-if="$store.state.online && active==0"
          type="primary"
          @click="buyCoin"
        >{{$t('dash.buy')}}{{datas.marketInfo.market}}</van-button>
        <van-button
          v-if="$store.state.online && active==1"
          type="danger"
          @click="sellCoin"
        >{{$t('dash.sell')}}{{datas.marketInfo.market}}</van-button>
      </div>
      <div class="center f-gray depth">
        <div
          class="depth_menu"
          v-if="depthShow"
          :style="[{'background':$store.state.mode?'#f7efef':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        >
          <p
            @click="chooseDepthType"
            v-for="(item, index) of depthType"
            :class="{choose: currentDepth_choose == index? true : false}"
            :key="index"
            :id="index"
          >{{item}}</p>
        </div>
        <span id="depth" @click="openDepth">{{current_depthType}}</span>
        <i
          id="depth_icon"
          class="iconfont icon-xialasanjiaoxingx"
          :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        ></i>
      </div>
    </div>

    <!-- 委托菜单 -->
    <div class="tabs" :style="[{'background':$store.state.mode?'#ededed':'#1d2635'}]">
      <div
        v-for="(item, index) of menuList"
        :key="item"
        :class="list_active==index?'bottom_line buy' : 'buy'"
        @click="handleList(index)"
        :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"
      >{{item}}</div>
      <div>
        <span @click="backOrderAll">全部撤单</span>
      </div>
    </div>

    <!-- 委托页面 -->
    <div class="list_page" v-if="list_active == 0">
      <div class="thead">
        <div
          class="scroll"
          :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        >
          <ul>
            <li>时间</li>
            <li>交易类型</li>
            <li>市场</li>
            <li>方向</li>
            <li>价格</li>
            <li>数量</li>
            <li>委托总额</li>
            <li>成交价格</li>
            <li>状态</li>
            <li>操作</li>
          </ul>
          <ul v-for="item of listDatas" :key="item.id">
            <li>{{item.buy_time_text}}</li>
            <li>{{item.deal_type}}</li>
            <li>{{item.market_symbol}}</li>
            <li>{{item.order_type}}</li>
            <li>{{item.buy_price}}</li>
            <li>{{item.amount}}</li>
            <li>{{item.symbol_amount}}</li>
            <li>{{item.deal_price}}</li>
            <li>{{item.status_text}}</li>
            <li style="color:#409EFF" @click="backOrder(item.id)">撤单</li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="list_page"
      v-if="list_active == 1"
      :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
    >
      <div class="thead">
        <div
          class="scroll"
          :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        >
          <ul>
            <li>时间</li>
            <li>交易类型</li>
            <li>市场</li>
            <li>方向</li>
            <li>价格</li>
            <li>数量</li>
            <li>委托总额</li>
            <li>成交价格</li>
            <li>状态</li>
            <li>操作</li>
          </ul>
          <ul v-for="item of listDatas" :key="item.id">
            <li>{{item.buy_time_text}}</li>
            <li>{{item.deal_type}}</li>
            <li>{{item.market_symbol}}</li>
            <li>{{item.order_type}}</li>
            <li>{{item.buy_price}}</li>
            <li>{{item.amount}}</li>
            <li>{{item.symbol_amount}}</li>
            <li>{{item.deal_price}}</li>
            <li>{{item.status_text}}</li>
            <li style="color:#409EFF" @click="backOrder(item.id)">撤单</li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="list_page"
      v-if="list_active == 2"
      :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
    >
      <div class="thead">
        <div
          class="scroll"
          :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]"
        >
          <ul>
            <li>时间</li>
            <li>交易类型</li>
            <li>市场</li>
            <li>方向</li>
            <li>价格</li>
            <li>数量</li>
            <li>委托总额</li>
            <li>成交价格</li>
            <li>状态</li>
            <li>操作</li>
          </ul>
          <ul v-for="item of listDatas" :key="item.id">
            <li>{{item.buy_time_text}}</li>
            <li>{{item.deal_type}}</li>
            <li>{{item.market_symbol}}</li>
            <li>{{item.order_type}}</li>
            <li>{{item.buy_price}}</li>
            <li>{{item.amount}}</li>
            <li>{{item.symbol_amount}}</li>
            <li>{{item.deal_price}}</li>
            <li>{{item.status_text}}</li>
            <li style="color:#409EFF" @click="backOrder(item.id)">撤单</li>
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
      verification: '',
      // 买入卖出按钮
      active: 0,
      // 买入卖出切换币种（可用）
      usdt: 'USDT',
      // 交易类型
      transType: this.$t('dash.limit'),
      // 当前交易类型
      current_type: this.$t('dash.limit[0]'),
      // 选中交易类型高亮
      current_choose: 0,
      // 交易类型弹窗
      show: false,
      amount_first: '0',
      amount_second: '',
      amount_show: true,
      rectangleBuy_width: [],
      rectangleSell_width: [],
      // 深度类型
      depthType: this.$t('dash.depth'),
      // 当前深度类型
      current_depthType: this.$t('dash.depth[0]'),
      // 选中深度类型高亮
      currentDepth_choose: 0,
      // 深度类型弹窗
      depthShow: false,
      depth: 6,
      // websock数据
      datas: {
        depth: {
          sell: [],
          buy: []
        },
        marketInfo: {},
        history_buy: [],
        history_sell: [],
        marketList: []
      },
      // 委托列表
      menuList: ['当前委托', '历史委托', '历史成交'],
      list_active: 0,
      // 历史委托数据
      listDatas: []
    }
  },
  methods: {
    // 买入
    handleBuy() {
      this.amount_first = 0
      this.amount_second = ''
      if (this.active !== 0) {
        this.active = 0
        this.usdt = this.$store.state.symbol
      }
    },
    // 比例
    handlePercent(id) {
      // if(id==0) {
      // this.amount_second = this.amount_second * 0.25
      // }
    },
    // 卖出
    handleSell() {
      this.amount_first = 0
      this.amount_second = ''
      if (this.active !== 1) {
        this.active = 1
        this.usdt = this.$store.state.market
      }
    },

    // 登录
    navToLogin() {
      this.$router.push('/login')
    },

    // 选择交易类型
    chooseType(e) {
      this.show = !this.show
      this.current_type = e.target.textContent
      this.current_choose = e.target.id
    },

    // 选择深度类型
    chooseDepthType(e) {
      this.depthShow = !this.depthShow
      this.current_depthType = e.target.textContent
      this.currentDepth_choose = e.target.id
      if (e.target.id == 0) {
        this.depth = 6
      }
      if (e.target.id == 1) {
        this.depth = 4
      }
      if (e.target.id == 2) {
        this.depth = 2
      }
    },

    // 点击其他位置关闭下拉菜单
    closeMenu(e) {
      if (e.target.id !== 'type' && e.target.id !== 'type_icon') {
        this.show = false
      }
      if (e.target.id !== 'depth' && e.target.id !== 'type_icon') {
        this.depthShow = false
      }
    },

    // 打开、关闭交易类型下拉列表
    openMenu() {
      this.show = !this.show
    },

    // 打开、关闭深度类型下拉列表
    openDepth() {
      this.depthShow = !this.depthShow
    },

    // 数据初始化
    init() {
      let that = this
      var res = this.$parent.origin
      that.rectangleBuy_width = []
      that.rectangleSell_width = []
      that.datas = {
        depth: {
          sell: [],
          buy: []
        },
        marketInfo: {},
        history_buy: [],
        history_sell: [],
        marketList: []
      }
      that.datas.depth = res.depth
      that.datas.marketInfo = res.marketInfo
      that.datas.marketList = res.marketList
      that.datas.history_buy = res.HistoryTrade.filter(item => item.direction == 'buy').slice(0, 5)
      that.datas.history_sell = res.HistoryTrade.filter(item => item.direction == 'sell').slice(0, 5)
      let buySum = 0
      that.datas.depth.buy.slice(0, 5).forEach(item => {
        buySum += item.account
      })
      let sellSum = 0
      that.datas.depth.sell.slice(0, 5).forEach(item => {
        sellSum += item.account
      })
      var buy_price
      var sell_price
      for (let i = 0; i < 5; i++) {
        if (!that.datas.depth.buy[i]) {
          if (!that.datas.depth.sell[i]) {
            buy_price = (0 / buySum) * 200
            that.rectangleBuy_width.push(buy_price)
            sell_price = (0 / sellSum) * 200
            that.rectangleSell_width.push(sell_price)
          } else {
            buy_price = (0 / buySum) * 200
            that.rectangleBuy_width.push(buy_price)
            sell_price = (that.datas.depth.sell[i].account / sellSum) * 200
            that.rectangleSell_width.push(sell_price)
          }
        } else {
          if (!that.datas.depth.sell[i]) {
            buy_price = (that.datas.depth.buy[i].account / buySum) * 200
            that.rectangleBuy_width.push(buy_price)
          } else {
            buy_price = (that.datas.depth.buy[i].account / buySum) * 200
            that.rectangleBuy_width.push(buy_price)
            sell_price = (that.datas.depth.sell[i].account / sellSum) * 200
            that.rectangleSell_width.push(sell_price)
          }
        }
      }
    },

    // 选择委托列表
    handleList(index) {
      this.list_active = index
      this.getOrderLists()
    },

    // 当前委托（定时器）
    async getOrderLists() {
      this.listDatas = []
      let login = this.$store.state.online
      let url
      let params
      if (this.list_active == 0) {
        url = '/order/userOrderApply'
        params = {
          verification: this.verification,
          status: 0
        }
      }
      if (this.list_active == 1) {
        url = '/order/userOrderList'
        params = {
          verification: this.verification,
          order_page: 1
        }
      }
      if (this.list_active == 2) {
        url = '/order/userOrderList'
        params = {
          verification: this.verification,
          order_page: 1,
          status: 0
        }
      }
      if (login) {
        const { data: res } = await this.axios.get(url, {
          params
        })
        let response = res.data instanceof Array ? res.data : res.data.data
        if (res.code == 1 && response.length != 0) {
          response.forEach(item => {
            let obj = {}
            obj.id = item.id
            obj.buy_time_text = item.buy_time_text
            obj.market_symbol = item.market + '/' + item.symbol
            obj.deal_type = item.deal_type == 1 ? '限价交易' : '市价交易'
            obj.order_type = item.order_type == 1 ? '买入' : '卖出'
            obj.buy_price = item.buy_price
            obj.amount = item.amount
            obj.symbol_amount = item.symbol_amount
            obj.deal_price = item.deal_price
            obj.status_text = item.status_text
            this.listDatas.push(obj)
          })
        } else {
          this.listDatas = []
          this.listDatas.push({
            id: '',
            buy_time_text: '暂无',
            deal_type: '暂无',
            market_symbol: '暂无',
            order_type: '暂无',
            buy_price: '暂无',
            amount: '暂无',
            symbol_amount: '暂无',
            deal_price: '暂无',
            status_text: '暂无'
          })
        }
      } else {
        this.listDatas = []
        this.listDatas.push({
          id: '',
          buy_time_text: '暂无',
          deal_type: '暂无',
          market_symbol: '暂无',
          order_type: '暂无',
          buy_price: '暂无',
          amount: '暂无',
          symbol_amount: '暂无',
          deal_price: '暂无',
          status_text: '暂无'
        })
      }
    },

    // 撤单
    backOrder(id) {
      this.$dialog
        .confirm({
          message: '确认撤单'
        })
        .then(async () => {
          const { data: res } = await this.axios.get('/order/repealOrder', {
            params: {
              verification: this.verification,
              id
            }
          })
          if (res.code == 1) {
            this.getOrderLists()
            this.$notify({
              message: '撤单成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$notify({
              message: '撤单失败',
              type: 'danger',
              duration: 1000
            })
          }
        })
        .catch(() => {
          this.$dialog.close()
        })
    },

    // 全部撤单
    backOrderAll() {
      this.$dialog
        .confirm({
          message: '确认全部撤单'
        })
        .then(async () => {
          const { data: res } = await this.axios.get('/order/repealOrderAll', {
            params: {
              verification: this.verification
            }
          })
          if (res.code == 1) {
            this.getOrderLists()
            this.$notify({
              message: '全部撤单成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$notify({
              message: '全部撤单失败',
              type: 'danger',
              duration: 1000
            })
          }
        })
        .catch(() => {
          this.$dialog.close()
        })
    },

    // 买入币种
    buyCoin() {
      let url
      let deal_type
      if (this.current_choose == 0) {
        deal_type = 1
      } else {
        deal_type = 2
      }
      if (this.active == 0) {
        url = '/order/addCtc'
        this.$dialog
          .confirm({
            message: '确认买入'
          })
          .then(async () => {
            const { data: res } = await this.axios.get(url, {
              params: {
                verification: this.verification,
                deal_type,
                buy_price: this.amount_first,
                buy_amount: this.amount_second,
                marke_id: this.$parent.marketinfo.id
              }
            })
            if (res.code == 1) {
              this.amount_first = 0
              this.amount_second = ''
              this.$notify({
                message: res.msg,
                duration: 1000,
                type: 'success'
              })
              this.getOrderLists()
            } else {
              this.$notify({
                message: res.msg,
                duration: 1000,
                type: 'danger'
              })
            }
          })
          .catch(() => {
            this.$dialog.close()
          })
      } else {
        url = '/order/sellOrder'
        this.$dialog
          .confirm({
            message: '确认卖出'
          })
          .then(async () => {
            const { data: res } = await this.axios.get(url, {
              params: {
                verification: this.verification,
                deal_type,
                buy_price: this.amount_first,
                buy_amount: this.amount_second,
                marke_id: this.$parent.marketinfo.id
              }
            })
            if (res.code == 1) {
              this.amount_first = 0
              this.amount_second = ''
              this.$notify({
                message: res.msg,
                duration: 1000,
                type: 'success'
              })
              this.getOrderLists()
            } else {
              this.$notify({
                message: res.msg,
                duration: 1000,
                type: 'danger'
              })
            }
          })
          .catch(() => {
            this.$dialog.close()
          })
      }
    },
    // 卖出币种
    sellCoin() {
      this.buyCoin()
    }
  },
  created() {
    this.verification = localStorage.getItem('token')
    this.getOrderLists()
  },
  watch: {
    '$parent.origin': function() {
      this.init()
    },
    '$store.state.market': function() {
      this.amount_first = 0
      this.amount_second = ''
    },
    '$store.state.symbol': function() {
      this.amount_first = 0
      this.amount_second = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/common.css');
.jy {
  font-size: 26px;
  box-sizing: border-box;
  padding-bottom: 100px;
  width: 100%;
  .list_page {
    width: 100%;
    min-height: 400px;
    box-sizing: border-box;
    overflow-x: scroll;
    .thead {
      .scroll {
        width: 100%;
        padding: 20px 0;
        overflow-x: scroll;
        overflow-y: hidden;
        box-sizing: border-box;
        margin-bottom: 20px;
        ul {
          display: flex;
          width: 200%;
          &:nth-child(1) {
            opacity: 1;
            font-weight: bold;
          }
          opacity: 0.7;
        }
        li {
          display: inline-block;
          word-break: keep-all;
          box-sizing: border-box;
          flex: 1;
          text-align: center;
          padding: 15px 0px;
          &:nth-child(1) {
            flex: 1.5;
          }
        }
      }
    }
  }
  .tabs {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    background: rgb(38, 48, 67);
    div {
      padding: 30px 0;
      margin: 0 30px;
      font-size: 28px;
      color: rgb(130, 142, 161);
    }
    .bottom_line {
      border-bottom: 4px solid rgb(36, 140, 245);
      color: #fff;
    }
  }
  .attribute {
    display: flex;
    padding: 30px;
    box-sizing: border-box;
    position: relative;
    div {
      font-size: 26px;
      color: rgb(130, 142, 161);
      flex: 1;
    }
    .menu {
      position: absolute;
      top: 70px;
      width: 200px;
      z-index: 100;
      background: rgb(29, 38, 53);
      padding: 10px 0;
      box-sizing: border-box;
      p {
        padding: 20px;
        box-sizing: border-box;
      }
    }
    i {
      display: inline-block;
      font-size: 10px;
      transform: scale(0.3);
      margin: 0px;
      padding: 0;
      color: #fff;
    }
  }

  .datas {
    display: flex;
    box-sizing: border-box;
    .datas_left,
    .datas_right {
      min-height: 320px;
      overflow: hidden;
      padding: 20px;
      flex: 1;
      p {
        padding: 10px;
        box-sizing: border-box;
      }
      input {
        border: none;
        background: rgb(29, 38, 53);
        width: 80%;
      }
      .sell_item {
        position: relative;
        margin-bottom: 5px;
        align-items: center;
        span {
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          padding: 10px;
          position: absolute;
          right: 0;
          top: -2px;
          box-sizing: border-box;
          opacity: 0.4;
        }
        .rectangle_red {
          background: rgb(212, 47, 47);
          color: rgb(212, 47, 47);
          transition: width 0.5s linear;
        }
        .rectangle_green {
          background: rgb(47, 212, 47);
          color: rgb(47, 212, 47);
          transition: width 0.5s linear;
        }
      }
    }
  }
  .choose {
    color: #fff;
    background: rgb(38, 48, 67);
  }
  .login {
    position: relative;
    padding-bottom: 70px;
    button {
      padding: 40px 80px;
      font-size: 28px;
    }
    i {
      color: white;
      display: inline-block;
      transform: scale(0.3);
      margin-left: -10px;
    }
    .depth_menu {
      position: absolute;
      width: 180px;
      top: -200px;
      right: 30px;
      z-index: 100;
      background: rgb(29, 38, 53);
    }
    .depth {
      p {
        font-size: 28px;
        box-sizing: border-box;
        padding: 20px;
      }
    }
  }
}
</style>