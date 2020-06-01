<template>
  <div class="signUp">
    <!-- 头部欢迎 -->
    <div class="welcome">
      <p>{{$t('signup.welcome[0]')}}</p>
      <div>
        {{$t('signup.welcome[1]')}}
        <p @click="handleNavTo()">{{$t('signup.welcome[2]')}}</p>
      </div>
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
        <van-tab :title="$t('signup.phoneSign')">
          <!-- 输入框 -->
          <div class="form">
            <div class="acount">
              {{$t('signup.country')}}
              <input
                class="addr"
                type="text"
                readonly
                v-model="form.addr"
                @click="handleActive"
              />
              <!-- 选择菜单 -->
              <transition name="fade">
                <section v-if="isActive && lang=='zh'">
                  <p
                    v-for="(item, index) of areaDatas"
                    :key="index"
                    @click="handleChoose(item.country.zh_name, item.code)"
                  >{{item.country.zh_name}}{{item.code}}</p>
                </section>
                <section v-if="isActive && lang=='en'">
                  <p
                    v-for="(item, index) of areaDatas"
                    :key="index"
                    @click="handleChoose(item.country.en_name, item.code)"
                  >{{item.country.en_name}}{{item.code}}</p>
                </section>
                <section v-if="isActive && lang=='jp'">
                  <p
                    v-for="(item, index) of areaDatas"
                    :key="index"
                    @click="handleChoose(item.country.jp_name, item.code)"
                  >{{item.country.jp_name}}{{item.code}}</p>
                </section>
                <section v-if="isActive && lang=='ko'">
                  <p
                    v-for="(item, index) of areaDatas"
                    :key="index"
                    @click="handleChoose(item.country.ko_name, item.code)"
                  >{{item.country.ko_name}}{{item.code}}</p>
                </section>
              </transition>
            </div>
            <div class="password">
              {{$t('signup.phone')}}
              <input type="text" v-model="form.tel" />
            </div>
            <div class="password">
              {{$t('signup.password')}}
              <input type="password" v-model="form.password" />
            </div>
            <div class="password">
              {{$t('signup.confirm')}}
              <input type="password" v-model="form.surePassword" />
            </div>
            <div class="sureCode">
              <div>{{$t('signup.verify')}}</div>
              <div>
                <input type="text" v-model="form.sureCode" />
              </div>
              <div>
                <div style="padding: 10px;" class="sure" @click="sendCode">{{$t('signup.code')}}</div>
              </div>
            </div>
            <div class="password">
              {{$t('signup.invitation')}}
              <input type="text" v-model="form.invitationCode" />
            </div>
          </div>
          <!-- 用户协议 -->
          <div class="protocol">
            <van-checkbox shape="square" v-model="isChoosed">{{$t('signup.agreement')}}</van-checkbox>
            <p @click="navToAgreement()">{{$t('signup.service')}}</p>
          </div>
          <!-- 最终注册 -->
          <div class="finish">
            <div
              :class="{'bg-blue': isChoosed, 'submit': true}"
              @click="submit"
            >{{$t('signup.signup')}}</div>
          </div>
        </van-tab>

        <!-- 邮箱注册 -->
        <van-tab :title="$t('signup.emailSign')">
          <!-- 输入框 -->
          <div class="form">
            <div class="acount">
              {{$t('signup.email')}}
              <input type="text" v-model="form.email" />
            </div>
            <div class="password">
              {{$t('signup.password')}}
              <input type="password" v-model="form.password" />
            </div>
            <div class="password">
              {{$t('signup.confirm')}}
              <input type="password" v-model="form.surePassword" />
            </div>
            <div class="sureCode" style="margin-top:10px;">
              <div>{{$t('signup.verify')}}</div>
              <div>
                <input type="text" v-model="form.phone_code" />
              </div>
              <div>
                <div class="sure" style="padding: 10px;" @click="sendCodeMail">{{$t('signup.code')}}</div>
              </div>
            </div>
            <div class="password">
              {{$t('signup.invitation')}}
              <input type="password" v-model="form.invitationCode" />
            </div>
          </div>
          <!-- 用户协议 -->
          <div class="protocol">
            <van-checkbox shape="square" v-model="isChoosed">{{$t('signup.agreement')}}</van-checkbox>
            <p @click="navToAgreement()">{{$t('signup.service')}}</p>
          </div>
          <!-- 最终注册 -->
          <div class="finish">
            <div
              :class="{'bg-blue': isChoosed, 'submit': true}"
              @click="submitMail"
            >{{$t('signup.signup')}}</div>
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
      // 当前tab页
      active: 0,
      // 表单数据
      form: {
        addr: this.$t("signup.currentCountry"),
        // 国家代码
        msg_code: "+1",
        email: "",
        tel: "",
        password: "",
        surePassword: "",
        // 手机验证码
        sureCode: "",
        // 邮箱验证码
        phone_code: "",
        // 邀请码
        invitationCode: ""
      },
      // 是否选择用户协议
      isChoosed: false,
      // 国家列表
      areaDatas: [],
      // 选择国家下来框显示
      isActive: false,
      lang: ''
    };
  },
  async created() {
    this.lang = this.$i18n.locale
    let countryDatas = JSON.parse(localStorage.getItem("countryDatas"));
    if (countryDatas) {
      this.areaDatas = countryDatas;
    } else {
      const { data: res } = await this.axios.get("/user/smsCountry");
      localStorage.setItem('countryDatas', JSON.stringify(res.data))
      this.areaDatas = res.data;
    }
  },
  methods: {
    // 跳转注册
    handleNavTo() {
      this.$router.push({ path: "/login" });
    },

    // 跳转到用户协议
    navToAgreement() {
      this.$router.push({ path: "/cms/agreement" });
    },

    // 显示选择的地区
    handleActive() {
      this.isActive = !this.isActive;
    },

    // 选择地区
    handleChoose(area, code) {
      this.form.addr = area + this.form.msg_code;
      this.isActive = false;
      this.form.msg_code = code;
    },

    // 发送手机验证码
    async sendCode() {
      const { data: res } = await this.$http.post(
        "https://hoidex.com/api/sms/send",
        {
          mobile: this.form.tel,
          event: "register",
          msg_code: this.form.msg_code
        }
      );
      console.log(res);
      if (res.code !== 1) {
        console.log("短信发送失败！");
        return;
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
      console.log(res);
      if (res.code !== 1) {
        console.log("邮箱发送失败！");
        return;
      }
      console.log("邮箱发送成功！");
    },
    // 手机号注册发送提交
    async submit() {
      console.log("手机号注册");
      const {
        tel,
        password,
        surePassword,
        sureCode,
        invitationCode,
        msg_code
      } = this.form;
      if (this.isChoosed) {
        const { data: res } = await this.$http.post(
          "https://hoidex.com/api/user/registerByMobile",
          {
            mobile: tel,
            password,
            password2: surePassword,
            phone_code: sureCode,
            invite_code: invitationCode,
            msg_code
          }
        );
        console.log(res);
      }
    },
    // 邮箱提交
    async submitMail() {
      console.log("邮箱注册");
      const {
        email,
        password,
        surePassword,
        phone_code,
        invitationCode,
        msg_code
      } = this.form;
      if (this.isChoosed) {
        const { data: res } = await this.$http.post(
          "https://hoidex.com/api/user/registerByEmail",
          {
            email,
            password,
            password2: surePassword,
            phone_code,
            invite_code: invitationCode,
            msg_code
          }
        );
        console.log(res);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  background: rgb(29, 38, 53);
}
.acount {
  position: relative;
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  section {
    position: absolute;
    background: rgb(29, 38, 53);
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    top: 65px;
    height: 300px;
    overflow-y: scroll;
    z-index: 1000;
    p {
      padding: 15px 0;
      color: #fff;
    }
  }
}
.signUp {
  height: 100%;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  background: rgb(29, 38, 53);
  .welcome {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 100%;
    height: 2.4rem;
    padding-top: 20px;
    background: url("https://chaindown-oss.oss-accelerate.aliyuncs.com/static/1/images/e7d15facf3a2f800711b8567b2a63735.png")
      rgb(14, 26, 45);
    background-size: contain;
    p {
      font-size: 42px;
      margin: 30px 0;
      width: 100%;
      text-align: center;
    }
    div {
      display: flex;
      font-size: 28px;
      justify-content: center;
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
    box-sizing: border-box;
    .addr {
      width: 70%;
    }
    input {
      margin: 0 30px;
      background: rgb(29, 38, 53);
      border: none;
      outline: none;
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
      flex: 1;
      box-sizing: border-box;
      margin: 0;
      align-items: flex-end;
      div {
        border: none;
        margin: 0;
        flex: 0.4;
        &:nth-child(2) {
          flex: 0.5;
          input {
            width: 100%;
          }
        }
        &:nth-child(3) {
          display: flex;
          flex: 0.4;
          justify-content: flex-end;
        }
      }
      .sure {
        flex: 1;
        padding: 10px 0 !important;
        display: flex;
        justify-content: center;
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
    width: 100%;
    box-sizing: border-box;
    padding: 50px 10px;
    background: rgb(29, 38, 53);
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
    .bg-blue {
      background: rgb(36, 160, 245);
    }
  }
}
</style>