<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>用户登录</h2>

      <div class="input-group">
        <input
          v-model="phone"
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          @input="validatePhone"
        >
        <span v-if="phoneError" class="error-msg">{{ phoneError }}</span>
      </div>

      <div class="input-group">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
        >
        <span
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '🙈' : '👁️' }}
        </span>
      </div>

      <button
        class="submit-btn"
        :disabled="!isFormValid"
        @click="handleLogin"
      >
        登录
      </button>

      <div class="auth-footer">
        没有账号？<span @click="goToRegister">立即注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      password: '',
      phoneError: '',
      showPassword: false
    }
  },
  computed: {
    isFormValid() {
      return this.phone.length === 11 && this.password.length >= 6
    }
  },
  methods: {
    validatePhone() {
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(this.phone)) {
        this.phoneError = '请输入有效的手机号'
      } else {
        this.phoneError = ''
      }
    },
    handleLogin() {
      // 这里添加登录逻辑
      let obj = {
        username: this.phone,
        password: this.password
      }
      this.$axios.get(`/gameApi/login?username=${this.phone}&password=${this.password}`).then(res=>{
        if(res.data.code === '201' || res.data.code === '203'){
          this.$message.error(res.data.msg)
          return ''
        }
        console.log('注册信息:', obj)
        sessionStorage.setItem('userInfo',JSON.stringify(obj))
        this.$message.success('登陆成功，正在跳转至大厅')
        this.$router.push({
          name:'gamesIndex'
        })
      })
    },
    goToRegister() {
      this.$router.push({
        name:'gameRegister'
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../scss/login.scss'; // 导入全局样式
</style>
