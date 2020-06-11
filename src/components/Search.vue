<template>
  <div class="container_search">
    <div class="search">
      <i class="iconfont icon-sousuo1-copy"></i>
      <input type="text" :placeholder="$t('message.searchCoin')" :style="[{'background': $store.state.mode? '#fff' : '#1d2635'}]"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "search"
};
</script>

<style lang="less" scoped>
.container_search {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.search {
  border: 1px solid #333;
  box-sizing: border-box;
  width: 85%;
  overflow: hidden;
  padding: 10px 20px;
  color: #aaa;
  i {
    font-size: 26px;
  }
  input {
    width: 90%;
    outline: none;
    border: none;
  }
}
</style>