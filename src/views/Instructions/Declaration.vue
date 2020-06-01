<template>
  <div class="agreement">
    <h2>{{$t('agreement.title[3]')}}</h2>
    <p>{{$t('agreement.legaltime')}}</p>
    <p>{{$t('agreement.title[3]')}}</p>
    <p>{{$t('agreement.legal[0]')}}</p>
    <article>
      <p>{{$t('agreement.legal[1]')}}</p>
    </article>
    <p>{{$t('agreement.legal[2]')}}</p>
    <article>
      <p>{{$t('agreement.legal[3]')}}</p>
    </article>
    <p>{{$t('agreement.legal[4]')}}</p>
    <article>
      <p>{{$t('agreement.legal[5]')}}</p>
    </article>
    <p>{{$t('agreement.legal[6]')}}</p>
    <article>
      <p>{{$t('agreement.legal[7]')}}</p>
    </article>
    <p>{{$t('agreement.legal[8]')}}</p>
    <article>
      <p>{{$t('agreement.legal[9]')}}</p>
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