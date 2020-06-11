<template>
  <div class="login" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <!-- 头部欢迎 -->
    <div class="welcome">
      <p :style="[{'color':$store.state.mode?'#fff':'#fff'}]">{{$t('login.welcome[0]')}}</p>
      <div>
        {{$t('login.welcome[1]')}}
        <p @click="handleNavTo()">{{$t('login.welcome[2]')}}</p>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="form">
      <div class="acount">
        {{$t('login.account')}}
        <input type="text" v-model="account"  :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"/>
      </div>
      <div class="password">
        {{$t('login.password')}}
        <input type="password" v-model="password"  :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]"/>
      </div>
    </div>

    <!-- 忘记密码 -->
    <div class="forget" @click="handleForget()">{{$t('login.forget')}}</div>

    <!-- 最终登录 -->
    <div class="finish">
      <div :class="['submit', isValidate? 'bg-blue': '']" @click="login">{{$t('login.login')}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    // 跳转注册
    handleNavTo() {
      this.$router.push({ path: "/signUp" });
    },

    // 忘记密码
    handleForget() {
      this.$router.push({ path: "/resetPass" })
    },

    // 登录
    async login() {
      const { data: res } = await this.$http.post('https://exchange.gd-juzheng.com/api/user/login', {
        account: this.account,
        password: this.password
      })
      // 设置Token值
      if (res.code === 1) {
        this.$notify({ type: 'success', message: '登录成功！', duration: 800 })
        this.$store.commit('edit', true)
        var userinfo = JSON.stringify(res.data.userinfo)
        // 这里缓存的token是测试值
        // localStorage.setItem('token', res.data.userinfo.token)
        localStorage.setItem('token', res.data.userinfo.token)
        localStorage.setItem('userinfo', userinfo)
        // localStorage.setItem('password', this.password)
        this.$router.back()
      } else {
        this.$notify({ type: 'danger', message: '登录失败！', duration: 800 })
      }
    }
  },
  computed: {
    isValidate: function() {
      if(this.account && this.password.length>=6) {
        return true
      }
      return false
    }
  },
};
</script>
<style lang="less" scoped>
@import url('../../assets/css/common.css');
.login {
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
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
  .form {
    padding: 30px;
    input {
      margin: 0 30px;
      border: none;
      outline: none;
      width: 5rem;
    }
    div {
      color: rgb(130, 142, 161);
      display: flex;
      padding: 15px 0;
      align-items: center;
      border-bottom: 1px solid rgba(36, 160, 245, 1);
      margin-top: 60px;
    }
  }
  .forget {
    display: inline-block;
    color: #1baaec;
    margin: 50px 20px;
  }
  .finish {
    width: 10rem;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .submit {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: rgba(130,142,161,1);
      width: 90%;
      padding: 25px;
    }
  }
}
</style>