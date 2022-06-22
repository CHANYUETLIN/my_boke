<template>
  <div>
	<div class="login">
		<div class="contain">
			<div class="img"></div>
			<div class="contain">
				<div class="login_contain">
					<div class="title">Sign Up</div>
					<div class="content">
						<div class="input">
							<p>username:</p>
							<input type="text" v-model="username" class="username">
							<p>Password:</p>
							<input type="password" v-model="Password" class="password">
						</div>
						<div class="btn_login" @click="register">register</div>
						<div class="toOtherPath">
							<div>Existing account: <span @click="toLogin">Sign In</span></div>
							<div>Forget Password?</div>
						</div>
					</div>
					<div class="describle">
						<a href="/home">Tourist mode, do not want to login click back to the home page</a>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name:"register",
  components: {},
  props: {},
  data() {
	return {
		username:'',
		Password:'',
	};
  },
  watch: {},
  computed: {},
  methods: {
		register(){
      let params = {
        username:this.username,
        password:this.Password
      }
      this.$axios.post('/regist/register',params).then(res=>{
        if(res.data.code != '200'){
					this.$notify.error({
						title: '错误',
						message: res.data.msg
					});
				}else{
					this.$message.success('注册成功');
					// 回到首页
					this.$router.push('/')
				}
      })
    },
    toLogin(){
      this.$router.push('/login')
    },
	},
  created() {
    console.log(123456)
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.login{
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background:#e2d2ff;
	display: flex;
	align-items: center;
	.contain{
		width: 70%;
		height: 800px;
		margin: auto;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 28px 0px #9256ff45;
		border-radius: 5px;
    overflow: hidden;
		.img{
			background-image: url('../../assets/login/login.jpg');
			width: 50%;
			height: 100%;
			background-size: 100% 100%;
		}
		.contain{
			width: 50%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.login_contain{
				width: 70%;
				height: 70%;
				// background: rgb(230, 255, 230);
				.title{
					font-size: 28px;
					color: #ccc;
				}
				.content{
					width: 100%;
					height: 400px;
					padding: 20px 0;
					.input{
						margin: 20px 0;
						p{
							font-size: 12px;
							margin-bottom: 20px;
						}
						.username{
							border: 0;
							border-bottom: 1px solid #e3e3e3;
							display: block;
							margin-bottom: 30px;
							width: 100%;
							height: 30px;
							outline: none;
							padding:0 10px;
							font-size: 16px;
						}
						.password{
							border: 0;
							border-bottom: 1px solid #e3e3e3;
							display: block;
							margin-bottom: 30px;
							width: 100%;
							height: 30px;
							outline: none;
							padding:0 10px;
							font-size: 16px;
						}
					}
					.btn_login{
						cursor: pointer;
						width:70px;
						height:30px;
						border-radius: 6px;
						text-align: center;
						line-height: 30px;
						font-size: 14	px;
						font-weight: 600;
						color: #fff;
						background:#c9aee9;
					}
					.btn_loginClick{
						cursor: pointer;
						width:70px;
						height:30px;
						border-radius: 6px;
						text-align: center;
						line-height: 30px;
						font-size: 14	px;
						font-weight: 600;
						color: #fff;
						background:#a690c1;
					}
					.toOtherPath{
						width: 100%;
						height: 100px;
						display: flex;
						justify-content: space-between;
						align-items: center;
						div:nth-child(1){
							font-weight: 600;
							span{
								color: #c9aee9;
								cursor: pointer;
							}
						}
						div:nth-child(2){
							cursor: pointer;
							color: #c9aee9;
						}
					}
				}
				.describle{
					position: absolute;
					bottom: 100px;
					height: 60px;
					// width: 100%;
					display: flex;
					justify-content: center;
					a{
						color: #c9aee9;;
					}
				}
			}
		}
	}
}
</style>