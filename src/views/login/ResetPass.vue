<template>
  <div class="signUp">
    <!-- 头部欢迎 -->
    <div class="welcome">
      <p>{{$t('reset.title[0]')}}</p>
      <div>{{$t('reset.title[1]')}}</div>
    </div>

    <!-- 选择注册类型 -->
    <div class="container">
      <van-tabs
        v-model="active"
        color="rgb(34, 141, 215)"
        background="rgb(29,38,53)"
        :border="false"
        title-active-color="rgba(237, 244, 248, 1)"
        title-inactive-color="#aaa"
        line-width="140"
      >
        <!-- 手机注册 -->
        <van-tab :title="$t('reset.tabtitle[0]')">
          <!-- 输入框 -->
          <div class="form">
            <div class="password">
              {{$t('reset.phone')}}
              <input type="text" v-model="form.mobile" />
            </div>
            <div class="sureCode" style="margin-top:10px;">
              <div>{{$t('reset.verification')}}</div>
              <div>
                <input type="text" v-model="form.phone_code" />
              </div>
              <div>
                <div class="sure" @click="sendCode">{{$t('reset.send')}}</div>
              </div>
            </div>
            <div class="password">
              {{$t('reset.newpass')}}
              <input type="password" v-model="form.password" />
            </div>
            <div class="password">
              {{$t('reset.confirm')}}
              <input type="password" v-model="form.password2" />
            </div>
          </div>
          <!-- 最终注册 -->
          <div class="finish">
            <div class="submit" @click="mobileConfirm">{{$t('reset.next')}}</div>
          </div>
        </van-tab>

        <!-- 邮箱注册 -->
        <van-tab :title="$t('reset.tabtitle[1]')">
          <!-- 输入框 -->
          <div class="form">
            <div class="password">
              {{$t('reset.email')}}
              <input type="text" v-model="form.email" />
            </div>
            <div class="sureCode" style="margin-top:10px;">
              <div>{{$t('reset.verification')}}</div>
              <div>
                <input type="text" v-model="form.phone_code" />
              </div>
              <div>
                <div class="sure" @click="sendCodeMail">{{$t('reset.send')}}</div>
              </div>
            </div>
            <div class="password">
              {{$t('reset.newpass')}}
              <input type="password" v-model="form.password" />
            </div>
            <div class="password">
              {{$t('reset.confirm')}}
              <input type="password" v-model="form.password2" />
            </div>
          </div>
          <!-- 最终注册 -->
          <div class="finish">
            <div class="submit" @click="emailConfirm">{{$t('reset.next')}}</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      // 表单数据
      form: {
        email: "",
        mobile: "",
        sureCode: "",
        password: "",
        password2: "",
        phone_code: ""
      },
      // 是否选择用户协议
      isChoosed: false
    };
  },
  computed: {
    // 获取密码找回方式
    type: function() {
      if (this.active === 0) {
        return "mobile";
      }
      return "email";
    }
  },
  methods: {
    // 跳转注册
    handleNavTo() {
      this.$router.push({ path: "/login" });
    },

    // 跳转到用户协议
    navToDeclaration() {
      this.$router.push({ path: "/cms/declaration" });
    },

    // 手机找回下一步
    async mobileConfirm() {
      const { mobile, password, password2, phone_code } = this.form;
      const { data: res } = await this.$http.post(
        "https://hoidex.com/api/user/resetpwd",
        {
          type: this.type,
          mobile,
          password,
          password2,
          phone_code
        }
      );
      console.log('手机')
      console.log(res)
    },

    // 邮箱找回下一步
    async emailConfirm() {
      const { email, password, password2, phone_code } = this.form;
       const { data: res } = await this.$http.post(
        "https://hoidex.com/api/user/resetpwd",
        {
          type: this.type,
          email,
          password,
          password2,
          phone_code
        }
      );
      console.log('邮箱')
      console.log(res)
    },

    // 发送手机验证码
    async sendCode() {
      const { data: res } = await this.$http.post(
        "https://hoidex.com/api/sms/send",
        {
          mobile: this.form.mobile,
          event: "register",
          msg_code: this.form.msg_code
        }
      );
      console.log(res);
      if (res.code !== 1) {
        console.log("短信发送失败！");
        return
      }
      console.log("短信发送成功！");
    },

    // 发送邮箱验证码
    async sendCodeMail() {
      const { data: res } = await this.$http.post(
        "https://hoidex.com/api/sms/emailSend",
        {
          email: this.form.email,
          event: "register"
        }
      );
      console.log(res)
      if (res.code !== 1) {
        console.log("邮箱发送失败！");
        return
      }
      console.log("邮箱发送成功！");
    }
  }
};
</script>

<style lang="less" scoped>
.signUp {
  height: 100%;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  background: rgb(29,38,53);
  .welcome {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 10rem;
    height: 2.4rem;
    padding-top: 20px;
    background: url("https://chaindown-oss.oss-accelerate.aliyuncs.com/static/1/images/e7d15facf3a2f800711b8567b2a63735.png")
      rgb(14, 26, 45);
    background-size: contain;
    align-items: center;
    p {
      font-size: 42px;
      margin: 30px 0 20px 0;
      width: 100%;
      text-align: center;
    }
    div {
      font-size: 28px;
      padding: 0 10px;
      width: 80%;
      box-sizing: border-box;
      word-break: break-all;
      text-align: center;
      color: rgb(130, 142, 161);
      p {
        width: 150px;
        font-size: 25px;
        margin: 0;
        color: #1baaec;
      }
    }
  }
  /deep/ .van-tabs__wrap {
    padding: 30px 0;
  }
  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 1rem !important;
  }
  .form {
    padding: 30px;
    input {
      margin: 0 30px;
      background: rgb(29,38,53);
      border: none;
      outline: none;
      // width: 5rem;
    }
    div {
      color: rgb(130, 142, 161);
      display: flex;
      padding: 15px 0;
      align-items: center;
      border-bottom: 1px solid rgba(36, 160, 245, 1);
      margin-top: 60px;
    }
    .sureCode {
      display: flex;
      margin: 0;
      align-items: flex-end;
      div {
        border: none;
        margin: 0;
        &:nth-child(3) {
          display: flex;
          flex: 1;
          justify-content: flex-end;
        }
      }
      .sure {
        display: flex;
        justify-content: center;
        line-height: 10px;
        border: 1px solid blue;
        margin: 0;
        color: blue;
      }
    }
  }

  .protocol {
    display: flex;
    padding: 30px;
    /deep/.van-checkbox__label {
      line-height: 50px;
      height: 40px;
      color: rgb(130, 142, 161);
    }
    p {
      margin-left: 30px;
      color: #1baaec;
      line-height: 50px;
    }
  }
  .finish {
    width: 10rem;
    box-sizing: border-box;
    padding: 50px 10px;
    background: rgb(29,38,53);
    display: flex;
    justify-content: center;
    align-items: center;
    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: rgba(130, 142, 161, 1);
      width: 90%;
      padding: 25px;
    }
  }
}
</style>