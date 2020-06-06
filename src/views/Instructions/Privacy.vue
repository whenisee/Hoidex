<template>
  <div class="agreement" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <h2 :style="[{'color':!$store.state.mode?'#fff':'#1d2635'}]">{{$t('agreement.title[2]')}}</h2>
    <p>{{$t('agreement.privacytime')}}</p>
    <article>
      <p>{{$t('agreement.privacy[0]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[1]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[2]')}}</p>
      <p>{{$t('agreement.privacy[3]')}}</p>
      <p>{{$t('agreement.privacy[4]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[5]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[6]')}}</p>
      <p>{{$t('agreement.privacy[7]')}}</p>
      <p>{{$t('agreement.privacy[8]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[9]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[10]')}}</p>
      <p>{{$t('agreement.privacy[11]')}}</p>
      <p>{{$t('agreement.privacy[12]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[13]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[14]')}}</p>
      <p>{{$t('agreement.privacy[15]')}}</p>
      <p>{{$t('agreement.privacy[16]')}}</p>
      <p>{{$t('agreement.privacy[17]')}}</p>
      <p>{{$t('agreement.privacy[18]')}}</p>
      <p>{{$t('agreement.privacy[19]')}}</p>
      <p>{{$t('agreement.privacy[20]')}}</p>
      <p>{{$t('agreement.privacy[21]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[22]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[23]')}}</p>
      <p>{{$t('agreement.privacy[24]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[25]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[26]')}}</p>
    </article>
    <p>{{$t('agreement.privacy[27]')}}</p>
    <article>
      <p>{{$t('agreement.privacy[28]')}}</p>
      <p>{{$t('agreement.privacy[29]')}}</p>
      <p>{{$t('agreement.privacy[30]')}}</p>
      <p>{{$t('agreement.privacy[31]')}}</p>
    </article>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.agreement {
  background: rgb(29,38,53);
  box-sizing: border-box;
  padding: 30px;
  h2 {
    padding: 30px 0;
    font-size: 30px;
  }
  p {
    color: rgb(130, 142, 161);
    padding: 30px 0;
  }
  article {
    p {
      padding: 0;
      line-height: 40px;
      font-size: 28px;
    }
  }
}
</style>