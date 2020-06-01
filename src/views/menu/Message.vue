<template>
  <div class="message">
    <div class="flex head option">
      <section class="check flex">
        <van-checkbox v-model="checked" icon-size="16px" shape="square"></van-checkbox>
        <span>{{$t('user.selectall')}}</span>
      </section>
      <section class="flex">
        <div>{{$t('user.mark')}}</div>
        <div>{{$t('user.delete')}}</div>
      </section>
    </div>
    <div class="flex head">
      <section class="check flex">
        <van-checkbox v-model="checked" icon-size="16px" shape="square"></van-checkbox>
        <div>
          <span v-if="datas.mobile">{{$t('user.boundphone')}}</span>
          <span v-if="datas.mobile">{{datas.mobile}}</span>
          <span v-if="datas.email">{{$t('user.boundemail')}}</span>
          <span v-if="datas.email">{{datas.email}}</span>
          <span>{{datas.expiretime | handleFormat}}</span>
        </div>
      </section>
      <section class="flex">
        <div>{{$t('user.delete')}}</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      result: false,
      datas: {}
    };
  },
  mounted() {
    // expiretime
    this.datas = JSON.parse(localStorage.getItem('userinfo'))
  },
};
</script>

<style lang="less" scoped>
.message {
  padding: 30px;
  box-sizing: border-box;
  .flex {
    display: flex;
  }
  .option {
    section {
      padding: 10px 0 !important;
    }
  }
  .head {
    box-sizing: border-box;
    border-bottom: 1px solid rgb(32, 47, 71);
    section {
      box-sizing: border-box;
      padding: 40px 0;
      &:nth-child(1) {
        flex: 1.4;
      }
      &:nth-child(1) {
        flex: 1;
      }

      color: rgb(130, 142, 161);
      span {
        font-size: 28px;
        display: flex;
        align-items: center;
        margin-left: -20px;
        color: rgb(130, 142, 161);
        &:nth-child(2) {
          padding: 20px 0;
        }
      }
      div {
        color: rgb(36, 160, 245);
        &:nth-child(1) {
          margin-right: 40px;
        }
      }
    }
  }
}
</style>