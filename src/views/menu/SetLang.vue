<template>
  <div class="language">
    <div class="content">
      <div class="item" v-for="item of languages" :key="item.active" @click="handleLang(item.active, item.type)">
        <div :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{item.lang}}</div>
        <div>
          <van-icon name="success" v-if="show == item.active" :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 0,
      languages: [
        { lang: "简体中文", active: 0, type: "zh" },
        { lang: "English", active: 1, type: "en" },
        { lang: "日本語", active: 2, type: "jp" },
        { lang: "한국어", active: 3, type: "ko" },
      ]
    };
  },
  methods: {
    handleLang(active, type) {
      this.show = active
      this.$i18n.locale = type
      sessionStorage.setItem('locale', type)
      this.$store.commit('handleLocale', type)
      this.$store.commit('changeLang', active)
      this.$router.back()
    }
  },
  created() {
    this.show = this.$store.state.langShow
  }
};
</script>

<style lang="less" scoped>
.language {
  padding: 30px;
  .content {
    .item {
      display: flex;
      border-bottom: 1px solid rgba(41, 52, 72, 1);
      padding: 30px 0;
      div {
        flex: 1;
        &:nth-child(2) {
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>