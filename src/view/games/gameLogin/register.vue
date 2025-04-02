<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2>用户注册</h2>

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
          placeholder="请输入密码（至少6位）"
        >
        <span
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '🙈' : '👁️' }}
        </span>
      </div>

      <div class="input-group">
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请确认密码"
        >
      </div>

      <button
        class="submit-btn"
        :disabled="!isFormValid"
        @click="handleRegister"
      >
        注册
      </button>

      <div class="auth-footer">
        已有账号？<span @click="goToLogin">立即登录</span>
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
      confirmPassword: '',
      phoneError: '',
      showPassword: false
    }
  },
  computed: {
    isFormValid() {
      return (
        this.phone.length === 11 &&
        this.password.length >= 6 &&
        this.password === this.confirmPassword
      )
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
    handleRegister() {
      // 这里添加注册逻辑
      let obj = {
        username: this.phone,
        password: this.password
      }
      this.$axios.post(`/gameApi/register`,obj).then(res=>{
        if(res.data.code == '201'){
          this.$message.error(res.data.msg)
          return ''
        }
        console.log('注册信息:', obj)
        sessionStorage.setItem('userInfo',JSON.stringify(obj))
        this.$message.success('注册成功，正在跳转至大厅')
        this.$router.push({
          name:'gamesIndex'
        })
      })
    },
    goToLogin() {
      this.$router.push({
        name:'gameLogin'
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* 样式与登录页相同，可以提取到公共样式文件中 */
@import '../scss/login.scss'; // 导入全局样式
</style>
