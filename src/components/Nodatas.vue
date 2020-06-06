<template>
  <div class="content" :style="[{'background': $store.state.mode? '#fff' : '#1d2635'}]">
    <div>
      <i class="iconfont icon-xiaoxi" :style="[{'color':!$store.state.mode?'#fff':'#000'}]"></i>
    </div>
    <div :style="[{'color':!$store.state.mode?'#fff':'#000'}]">{{$t('message.nothing')}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Nodatas'
  }
</script>

<style lang="less" scoped>
.content {
  box-sizing: border-box;
  display: flex;
  padding: 100px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    font-size: 50px;
  }
  div {
    margin-bottom: 10px;
  }
}
</style>