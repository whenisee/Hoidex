<template>
  <div class="deposit_record" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- 头部导航 -->
    <h2 :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <p @click="navBack" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <i class="iconfont iconjiantou-copy" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
      </p>
      <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.assetRecords')}}</p>
    </h2>
    <!-- 内容区 -->
    <div class="content" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <!-- 币种头部 -->
      <ul class="flex" :style="[{'background':$store.state.mode?'#ededed':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <li
          :class="['padding-large', index==current_opt?'bottom_line':'', 'box']"
          v-for="(item, index) of opt"
          :key="index"
          @click="chooseOpt(index)"
        >{{item}}</li>
      </ul>
      <div class="table">
        <!-- 表格头 -->
        <ul class="thead flex">
          <li>{{$t('wallet.time')}}</li>
          <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.type')}}</li>
          <li>{{$t('wallet.money')}}</li>
          <li v-if="current_opt!=2">{{$t('wallet.addr')}}</li>
          <li>{{$t('wallet.process')}}</li>
        </ul>

        <div v-if="current_opt==0">
          <ul class="flex" v-for="(item,index) of info" :key="index">
            <li>{{item.create_time_text}}</li>
            <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.conf_coin}}</li>
            <li>{{item.money}}</li>
            <li
              v-clipboard:copy="item.conf_token"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError"
            >{{$t('wallet.copy')}}</li>
            <li class="f-red">{{item.status_text}}</li>
          </ul>
        </div>

        <div v-if="current_opt==1">
          <ul class="flex" v-for="item of logDatas" :key="item.id">
            <li>{{item.create_time_text}}</li>
            <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.cash_coin}}</li>
            <li>{{item.cash_account}}</li>
            <li
              v-clipboard:copy="item.cash_token"
              v-clipboard:success="onCopy"
              v-clipboard:error="onCopyError"
            >{{$t('wallet.copy')}}</li>
            <li class="f-red">{{item.status_text}}</li>
          </ul>
        </div>

        <!-- <div v-if="current_opt==2">
          <ul class="flex" v-for="(item,index) of others" :key="index">
            <li>{{item.time}}</li>
            <li class="f-white">{{item.coin}}</li>
            <li>{{item.amount}}</li>
            <li class="f-red">{{item.status}}</li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opt: [this.$t('wallet.recharge'), this.$t('wallet.withdrawal'), this.$t('wallet.others')],
      current_opt: 0,
      info: [
      ],
      withdrawalInfo: [
      ],
      others: [
      ],
      logDatas: [],
      verification: ''
    };
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    // 复制
    onCopy() {
      this.$notify({
        message: "复制成功",
        type: "success"
      });
    },
    onCopyError() {
      this.$notify({
        message: "复制失败",
        type: "danger"
      });
    },
    // 选择操作
    chooseOpt(index) {
      this.current_opt = index
    },
    // 获取数据
    async initDatas() {
      const { data: res } = await this.axios.get('https://exchange.gd-juzheng.com/api/Wallet/legal_log',{
        params: {
          verification: localStorage.getItem('token'),
          type: this.current_opt+1
        }
      })
      this.info = res.data.data
    },
    // 提币记录
    async record() {
      const { data: res } = await this.axios.get('https://exchange.gd-juzheng.com/api/user/get_cash_list', {
        params: {
          verification: this.verification
        }
      })
      if (res.code == 1) {
        this.logDatas = res.data
      }
    },
  },
  created() {
    this.verification = localStorage.getItem('token')
    this.initDatas()
    this.record()
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.css");
.deposit_record {
  height: 100%;
  width: 100%;
  background: #010a2c;
  input {
    margin-left: 20px;
    background: #010a2c;
    outline: none;
    border: none;
    border-bottom: 2px solid #3573ff;
  }
  h2 {
    box-sizing: border-box;
    background: #010a2c;
    padding: 30px;
    display: flex;
    margin-bottom: 5px;
    p {
      font-size: 30px;
      i {
        padding-right: 20px;
      }
    }
  }
  .content {
    background: #010a2c;
    padding: 30px;
  }
  .table {
    padding: 30px;
    .thead {
      color: #8495aa;
      text-align: center;
    }
    ul {
      padding: 20px 0;
      border-bottom: 1px solid #8495aa;
      width: 100%;
      li {
        flex: 1;
        color: rgb(130, 142, 161);
        text-align: center;
        word-break: break-all;
        &:nth-child(1) {
          flex: 1.1;
        }
        &:nth-child(2) {
          flex: .8;
        }
        &:nth-child(3) {
          flex: .8;
        }
        &:nth-last-child(1) {
          flex: 1;
          .operate {
            top: 40px;
            width: 140%;
            background: rgb(20, 32, 54);
            z-index: 100;
            p {
              padding: 20px;
              text-align: center;
              &:nth-child(2) {
                box-sizing: border-box;
                border: 1px solid rgb(40, 38, 54);
                border-left: none;
                border-right: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>