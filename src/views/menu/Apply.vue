<template>
  <div class="apply">
    <h2>{{$t('apply.title')}}</h2>
    
    <div class="form">

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemone')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwo')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthree')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemfour')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemfive')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemsix')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemseven')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemeight')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemnine')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <!-- 上传文件 -->
      <div class="item">
        <p>
          <i></i>{{$t('apply.itemten')}}
        </p>
        <van-uploader style="margin: 0 10px;" multiple :max-count="5" :max-size="500 * 1024 * 1024" />
        <p class="f-small">{{$t('apply.pictype')}}</p>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemeleven')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtewlve')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthirteen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemfourteen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemfiveteen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemsixteen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemseventeen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemeighteen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemnineteen')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwenty')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentyone')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentytwo')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentythree')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentyfour')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentyfive')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentysix')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentyseven')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentyeight')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemtwentynine')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthirty')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthirtyone')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthirtytwo')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthirtythree')}}
        </p>
        <van-uploader style="margin: 0 10px;" multiple :max-count="5" :max-size="500 * 1024 * 1024" />
        <p class="f-small">{{$t('apply.pictype')}}</p>
      </div>

      <div class="item">
        <p>
          <i></i>{{$t('apply.itemthirtyfour')}}
        </p>
        <div class="inp">
          <input type="text" :placeholder="$t('apply.fillout')" />
        </div>
      </div>
    </div>
    <section>
      <p>{{$t('apply.statement')}}</p>
      <p>{{$t('apply.statementinfo')}}</p>
    </section>
    <div class="check">
      <div>
        <div>
          <input type="checkbox" />
        </div>
        <div>{{$t('apply.learned')}}</div>
      </div>
      <div>
        <div>
          <input type="checkbox" />
        </div>
        <div>{{$t('apply.submitagain')}}</div>
      </div>
    </div>
    <div class="submit">
      <div class="btn">{{$t('apply.submitnow')}}</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.apply {
  padding: 20px;
  box-sizing: border-box;
  background: rgb(29,38,53);
  h2 {
    color: #fff;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    text-align: center;
    font-size: 34px;
  }
  .f-small {
    font-size: 25px !important;
    color: rgb(84, 92, 105) !important;
  }
  .form {
    padding: 30px 10px;
    .item {
      padding: 20px;
      margin-bottom: 50px;
      p {
        padding: 20px;
        color: rgb(130, 142, 161);
        font-size: 28px;
        word-break: break-all;
      }
      i {
        display: inline-block;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin-right: 30px;
        background: rgb(53, 115, 225);
      }
      border-bottom: 1px solid rgba(41, 52, 72, 1);
      input {
        border: none;
        background: rgb(29,38,53);
        margin-left: 20px;
      }
    }
  }
  section {
    padding: 30px;
    color: rgb(130, 142, 161);
    font-size: 28px;
    p {
      padding: 10px;
      line-height: 40px;
    }
  }
  .check {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 10px 0 0;
      }
    }
  }
  .submit {
    padding: 30px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 50px;
      font-size: 32px;
      background: rgb(48, 167, 240);
    }
  }
}
</style>