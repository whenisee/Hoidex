<template>
  <div class="withdrawal" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- 头部导航 -->
    <h2 :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <p @click="navBack" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">
        <i class="iconfont iconjiantou-copy" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"></i>
      </p>
      <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.Manageaccount')}}</p>
    </h2>
    <div class="bg-line"></div>
    <div class="form" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <!-- 提现地址 -->
      <div class="acount">
        <div class="flex b_line">
          <input type="text" :placeholder="$t('wallet.coinaddress')" v-model="form.cash_token" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"/>
        </div>
      </div>
      <!-- 地址备注 -->
      <div class="acount">
        <div class="flex b_line">
          <input type="text" :placeholder="$t('wallet.addressNote')" v-model="form.tip" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"/>
        </div>
      </div>
      <!-- 立即添加 -->
      <div class="submit">
        <div class="sub" @click="submitAddr" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.Addnow')}}</div>
      </div>
    </div>
    <div class="bg-line"></div>
    <h2 :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <p :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('wallet.Addresslist')}}</p>
    </h2>
    <div class="table" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
      <!-- 表格头 -->
      <ul class="thead flex">
        <li>{{$t('wallet.addr')}}</li>
        <li>{{$t('wallet.Note')}}</li>
        <li>{{$t('wallet.operate')}}</li>
      </ul>
      <ul class="flex" v-for="(item,index) of addressDatas" :key="item.id">
        <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.token}}</li>
        <li :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.tip}}</li>
        <li class="f-blue" @click="delAddr(item.id, index)">{{$t('wallet.delete')}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        cash_token: "",
        tip: ""
      },
      // 地址数据
      addressDatas: [],
      verification: ""
    };
  },
  created() {
    this.verification = localStorage.getItem("token");
    this.initData();
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    // 获取地址
    async initData() {
      const { data: res } = await this.axios.get(
        "https://exchange.gd-juzheng.com/api/user/get_my_cash_token",
        {
          params: {
            verification: this.verification
          }
        }
      );
      if (res.code == 1) {
        this.addressDatas = res.data;
      }
    },
    // 提交地址
    async submitAddr() {
      if (this.form.cash_token.trim() != '') {
        const { data: res } = await this.axios.get(
          "https://exchange.gd-juzheng.com/api/user/add_cash_token",
          {
            params: {
              verification: this.verification,
              cash_token: this.form.cash_token,
              tip: this.form.tip
            }
          }
        );
        if (res.code == 1) {
          this.$notify({
            message: "提交成功",
            type: "success",
            duration: 1000
          });
          this.form = {
            cash_token: "",
            tip: ""
          };
          this.initData();
        } else {
          this.$notify({
            message: "提交失败",
            type: "danger",
            duration: 1000
          });
          this.form = {
            cash_token: "",
            tip: ""
          };
        }
      } else {
        this.$notify({
          message: "提交地址不能为空",
          type: "danger",
          duration: 1000
        });
        this.form = {
            cash_token: "",
            tip: ""
          };
      }
    },
    // 删除地址
    delAddr(id, index) {
      this.$dialog
        .confirm({
          title: "删除",
          message: `是否删除第${index + 1}条地址数据`
        })
        .then(async () => {
          const { data: res } = await this.axios.get(
            "https://exchange.gd-juzheng.com/api/user/del_cash_token",
            {
              params: {
                verification: this.verification,
                id
              }
            }
          );
          if (res.code == 1) {
            this.$notify({
              message: "操作成功",
              type: "success",
              duration: 1000
            });
            this.initData();
          }
        })
        .catch(() => {
          this.$dialog.close();
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.css");
.withdrawal {
  height: 100%;
  background: #010a2c;
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

.form {
  box-sizing: border-box;
  background: #010a2c;
  padding: 30px 30px 100px 30px;
  input {
    width: 90%;
    border: none;
    background: #010a2c;
    padding: 20px;
    font-size: 28px;
    color: rgb(130, 142, 161);
  }
  .submit {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    .sub {
      padding: 30px 50px;
      font-size: 34px;
      background: linear-gradient(
        90deg,
        rgba(54, 124, 239, 1) 0%,
        rgba(47, 175, 240, 1) 100%
      );
      border-radius: 5px;
    }
    p {
      margin: 30px 50px;
      font-size: 26px;
      color: #3573ff;
    }
  }
}
.acount {
  position: relative;
  margin-bottom: 50px;
}
.table {
  padding: 0 30px 30px 30px;
  .thead {
    color: #8495aa;
  }
  ul {
    padding: 20px 0;
    border-bottom: 1px solid #8495aa;
    width: 100%;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      word-break: break-all;
      &:nth-last-child(1) {
        flex: 0.5;
      }
    }
  }
}
</style>