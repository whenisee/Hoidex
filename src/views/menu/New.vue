<template>
  <div class="new">
    <!-- 第一块 -->
    <div class="padding-b box">
      <h2 class="f-white padding-tb f-big f-bold">NSC</h2>
      <p>{{$t('new.issue')}}</p>
      <p class="f-blue f-bold f-big">1 NSC = 0.025 USDT</p>
      <div class="flex desc">
        <div>
          <section>
            <p>{{$t('new.currency')}}</p>
            <p>USDT/BTC/ETH</p>
          </section>
          <section>
            <p>{{$t('new.starttime')}}</p>
            <p>2020-04-10 10:00:00</p>
          </section>
        </div>
        <div>
          <section>
            <p>{{$t('new.lauchtime')}}</p>
            <p>2020-04-15 00:00:00</p>
          </section>
          <section>
            <p>{{$t('new.endtime')}}</p>
            <p>2020-07-14 00:00:00</p>
          </section>
        </div>
      </div>

      <!-- 换算 -->
      <div>
        <div class="flex padding-tb">
          <div class="bottom_line choose">
            USDT
            <i
              class="iconfont icon-xialasanjiaoxingx"
              style="margin-left:0px;display:inline-block;transform:scale(0.3)"
            ></i>
          </div>
          <div class="inp bottom_line">
            <input style="color: #fff" type="number" placeholder="0" />
          </div>
          <div class="btn">
            <div>ALL</div>
          </div>
        </div>
        <p class="padding-s">1 USDT = 0 NSC</p>
        <p class="padding-s">0 USDT = 0 NSC</p>
        <div class="btn finish">
          <div>{{$t('new.apply')}}</div>
        </div>
      </div>
    </div>

    <!-- 第二块 -->
    <div class="box">
      <h3>{{$t('new.cycle')}}</h3>
      <van-steps :active="active" style="background: rgb(38, 48, 67); width:93%;">
        <van-step></van-step>
        <van-step></van-step>
        <van-step></van-step>
        <van-step></van-step>
      </van-steps>
      <div class="flex flex-between steps">
        <div>
          <p>{{$t('new.preheat')}}</p>
          <p></p>
        </div>
        <div>
          <p>{{$t('new.applystart')}}</p>
          <p>2020-04-15 00:00:00</p>
        </div>
        <div>
          <p>{{$t('new.applyclose')}}</p>
          <p>2020-07-14 00:00:00</p>
        </div>
        <div>
          <p>{{$t('new.result')}}</p>
          <p>2020-07-14 00:00:00</p>
        </div>
      </div>
    </div>

    <!-- 第三块 -->

    <!-- <div class="box">
      <h3>项目详情</h3>
      <p>申购价格 初始阶段0.025U/枚</p>
      <p>申购方式 均分模式</p>
      <p>申购币种 USDT/BTC/ETH</p>
      <p>项目介绍</p>
      <p class="line-height">NSC的诞生是为了联系人类文明。NSC使用异步数据同步和中继节点概念来形成兼容的传输协议，以通过Polaris跨链协议在不同的块网络之间切换。将使用不同的区块链。网络互连使区块链成为可能。从局域网到Internet的网络转换在整个区块网络中都是可持续的。NSC Chain是世界上第壹个匿名跨链数据技术平台，通过北斗跨链技术和量子文件切片技术，数据保留和跨链资产交易更加安全高效。更多的参与者保护自己的隐私；并且可以进行跨链应用。目前，NSC研发团队已与中国的“壹带壹路”决策层进行了深入的合作。尽管NSC将来将用作交易代币，但它也将能够通过分布式分类帐安全地存储海量数据，从而提高国际贸易的便利性和安全性。</p>
      <p>白皮书：</p>
      <p>北星链：http://www.nschain.biz/</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 进度条
      active: 1
    };
  },
  methods: {
    
  },
  created() {
    // const token = localStorage.getItem('token')
    // this.axios.post('https://hoidex.com/api/user/newregion',{},{
    //   headers: { Authorization: token },
    //   emulateJSON: true
    // }).then(res=>{
    //   console.log(res)
    // })
  },
};
</script>

<style lang="less" scoped>
.new {
  background: rgb(29,38,53);
  display: flex;
  flex-direction: column;
  align-items: center;
  .desc {
    p {
      padding: 10px 0;
    }
    div {
      flex: 1;
    }
    section {
      margin-top: 20px;
    }
  }
  .bottom_line {
    border-bottom: 1px solid rgb(130, 142, 161);
  }
  .choose {
    padding: 20px;
  }
  .inp {
    padding: 20px;
    width: 180px;
    margin: 0 20px;
    input {
      width: 100%;
      border: none;
      background: rgb(38, 48, 67);
    }
  }
  .line-height {
    line-height: 40px;
  }
  .steps {
    div { 
      flex: 1;
      p {
        padding: 10px 0;
        margin: 0;
      }
      &:nth-child(2) {
        padding: 0 50px;
      }
      &:nth-child(4) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 0 20px;
        p {
          text-align: end;
        }
      }
    }
    p {
      font-size: 20px;
    }
  }
  .btn {
    padding: 20px 30px;
    background: rgb(53, 115, 255);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .finish {
    margin: 30px 0;
    font-size: 30px;
  }
  /deep/ .van-step__circle-container {
    background: rgb(38, 48, 67);
    i {
      font-size: 40px;
    }
  }

  p {
    color: rgb(130, 142, 161);
    font-size: 28px;
    padding: 20px 0;
  }
  h3 {
    font-size: 30px;
    padding: 10px 0;
  }
  .box {
    width: 95%;
    margin: 30px 0;
    padding: 20px;
    background: rgb(38, 48, 67);
    box-sizing: border-box;
  }
  .padding-b {
    padding: 40px;
  }
  .padding-s {
    padding: 10px 0 !important;
  }
  .padding-tb {
    padding: 20px 0;
  }
  .flex {
    display: flex;
  }
  .flex-between {
    justify-content: space-between;
  }
  .f-blue {
    color: rgb(53, 115, 255);
  }
  .f-big {
    font-size: 34px;
  }
  .f-bold {
    font-weight: bold;
  }
  .f-white {
    color: white;
  }
}
</style>