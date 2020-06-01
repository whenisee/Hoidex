<template>
  <div class="jj">
    <h2>
      {{$t('dash.Bitcoin')}}
    </h2>
    <div>
      <p>{{$t('dash.issuanceTime')}}</p>
      <p>2008/11/01</p>
    </div>
    <div>
      <p>{{$t('dash.issuanceGross')}}</p>
      <p>21.00M</p>
    </div>
    <div>
      <p>{{$t('dash.circulationGross')}}</p>
      <p>16.73M</p>
    </div>
    <div>
      <p>{{$t('dash.officialWebsite')}}</p>
      <p>https://bitcoin.org/en/</p>
    </div>
    <div>
      <p>{{$t('dash.blockQuery')}}</p>
      <p>https://www.blockchain.com/explorer</p>
    </div>
    <section>
      <p>{{$t('dash.introduction')}}</p>
      <article>{{$t('dash.info')}}</article>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.jj {
  background: rgb(29, 38, 53);
  padding: 30px;
  h2 {
    color: #fff;
    font-size: 32px;
    padding: 10px 0;
  }
  div {
    display: flex;
    padding: 50px 0;
    color: rgb(130, 142, 161);
    font-size: 28px;
    border-bottom: 1px solid rgba(41, 52, 72, 1);
    p {
      flex: 1;
      &:nth-child(2) {
        flex: 2;
        display: flex;
        justify-content: flex-end;
        color: #fff;
      }
    }
  }
  section {
    padding-bottom: 100px;
    p {
      padding: 30px 0;
      color: rgb(130, 142, 161);
      font-size: 28px;
    }
    article {
      font-size: 28px;
      line-height: 35px;
      word-break: break-all;
    }
  }
}
</style>