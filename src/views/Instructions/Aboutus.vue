<template>
  <div class="agreement">
    <h2>{{$t('agreement.title[0]')}}</h2>
    <p>{{$t('agreement.aboutustime')}}</p>
    <article>
      <p>{{$t('agreement.aboutus[0]')}}</p>
      <p>{{$t('agreement.aboutus[1]')}}</p>
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