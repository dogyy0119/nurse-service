<template>
	<view class="content">
		<!-- 顶部文字 -->
		<text class="title">{{$t('login.phoneLogin')}}</text>
		<!-- 登录框 -->
		<view v-if="['apple','weixin'].includes(type)" class="quickLogin">
			<image @click="quickLogin" :src="imgSrc" mode="widthFix" class="quickLoginBtn"></image>
			<!-- <uni-agreements @setAgree="agree = $event"></uni-agreements> -->
		</view>
		<template v-else>
			<input type="number" class="input-box" :inputBorder="false" v-model="phone" maxlength="11"
				:placeholder="$t('common.phonePlaceholder')" />
			<uni-agreements @setAgree="agree = $event"></uni-agreements>
			<button class="get-code" :disabled="!isPhone || !agree" :type="isPhone&&agree?'primary':'default'"
				@click="sendShortMsg">{{$t('login.getVerifyCode')}}</button>
			<text class="tip">{{$t('login.phoneLoginTip')}}</text>
		</template>

		<!-- 快捷登录按钮弹窗 -->
		<uni-quick-login :agree="agree" ref="uniQuickLogin"></uni-quick-login>

		<uni-bindMobileByMpWeixin ref="uni-bindMobileByMpWeixin"></uni-bindMobileByMpWeixin>

		<!-- 隐私协议 -->
		<!-- <g-privacy></g-privacy> -->
		<!-- #ifdef MP-WEIXIN -->
		<jade-mp-privacy initiative isCover @updateParams="handleParamsUpdate" v-if="showPrivacy"></jade-mp-privacy>
		<!-- #endif -->

	</view>
</template>

<script>
	let currentWebview; //是否一键登录优先
	export default {
		data() {
			return {
				initiative: true,
				isCover: false,
				type: "",
				phone: "",
				agree: true,
				showPrivacy: true,
			}
		},
		computed: {
			loginConfig() {
				return getApp().globalData.config.router.login
			},
			isPhone() {
				return /^1\d{10}$/.test(this.phone);
			},
			imgSrc() {
				return '/static/login-index/' + this.type + '.png'
			}
		},
		onLoad(e) {
			this.showPrivacy = true;
			this.type = e.type

			//是否优先启动一键登录。即：页面一加载就启动一键登录
			//#ifdef APP-PLUS
			if (this.type == "univerify") {
				const pages = getCurrentPages();
				currentWebview = pages[pages.length - 1].$getAppWebview();
				currentWebview.setStyle({
					"top": "2000px" //隐藏当前页面窗体
				})
			}
			//#endif
			uni.$on('setLoginType', type => {
				this.type = type
			})

		},
		onUnload() {
			uni.$off('setLoginType')
		},
		onReady() {
			//#ifdef APP-PLUS
			if (this.type == "univerify") {
				this.type == this.loginConfig[1]
				// console.log('开始一键登录');
				setTimeout(() => {
					this.$refs.uniQuickLogin.login_before('univerify')
				}, 100)
				setTimeout(() => {
					currentWebview.setStyle({
						titleNView: {
							autoBackButton: true,
							backgroundColor: "#FFFFFF"
						}
					})
					currentWebview.setStyle({
						"top": "0"
					})
				}, 1500);
			}
			//#endif
		},
		methods: {
			handleParamsUpdate(newParams) {
				console.log("handleParamsUpdate:" + newParams)
				this.agree = newParams;
				this.getLocation()
			},

			getLocation() {
				// #ifdef MP-WEIXIN	
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.userLocation']) {
							// 如果用户没有授权，尝试授权
							uni.authorize({
								scope: 'scope.userLocation',
								success() {
									console.log('授权地理位置：成功');
								},
								fail() {
									console.log('授权地理位置：失败');
								}
							});
						} else {
							console.log('用户已经授权地理位置');
						}
					}
				});
				// #endif
			},

			async quickLogin() {

				// uni.showModal({
				//   title: '隐私政策',
				//   content: '请阅读我们的隐私政策...',
				//   confirmText: '同意',
				//   cancelText: '不同意',
				//   success: function (res) {
				//     if (res.confirm) {
				// 		this.agree = true;
				// 		console.log('用户同意隐私政策' + this.agree);
				//       // 处理用户同意的逻辑
				//     } else if (res.cancel) {
				// 		this.agree = false;
				// 		console.log('用户不同意隐私政策' + this.agree);
				// 		// 处理用户不同意的逻辑
				//     }
				//   }
				// });

				uni.getUserProfile({
					desc: "获取你的昵称、头像、地区及性别",
					success: (res) => {
						console.log("res:", res)
						// let user = {
						// 	avatar: res.userInfo.avatarUrl,
						// 	name: res.userInfo.nickName,
						// 	wxOpenid: this.wxid.openId,
						// 	level: res.level,
						// 	gender: res.userInfo.gender,
						// 	clientName: res.clientName,
						// 	roleDesc: res.roleDesc,
						// 	id: res.id,
						// 	clientId: res.clientId
						// }
						// this.setUser(user);
						// paramuser = {
						// 	gender: res.userInfo.gender,
						// 	avatar: res.userInfo.avatarUrl,
						// 	name: res.userInfo.nickName,
						// 	country: res.userInfo.country,
						// 	province: res.userInfo.province,
						// 	city: res.userInfo.city,
						// 	wxOpenid: this.wxid.openId
						// }
						// this.getUserInfoCallBack(paramuser)
					},
					fail() {
						// console.log("err ": err)
					}
				})

				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes.userInfo); // 打印用户信息
						console.log('用户昵称为: ' + infoRes.userInfo.nickName); // 打印用户昵称
						// 在这里，你可以将用户的头像和昵称保存到本地或者发送到后端进行处理
						// infoRes.userInfo.avatarUrl是用户的头像链接
						// infoRes.userInfo.nickName是用户的昵称
					}
				});

				try {

					console.log(" quickLogin : " + this.agree)
					// 等待 login_before 方法完成  
					await this.$refs.uniQuickLogin.login_before(this.type);

					// #ifdef MP-WEIXIN  
					// 如果是在微信小程序环境下，则执行绑定手机号的操作  
					//this.$refs['uni-bindMobileByMpWeixin'].open();
					// #endif  
				} catch (error) {
					// 处理 login_before 方法中可能抛出的错误  
					console.error('Login before failed:', error);
				}
			},
			sendShortMsg() {
				if (!this.agree) {
					return uni.showToast({
						title: this.$t('common.noAgree'),
						icon: 'none'
					});
				}
				// 发送验证吗
				uni.showLoading();
				// uni.navigateTo({
				// 	url: '/pages/ucenter/login-page/phone-code/phone-code?phoneNumber=' + this.phone,
				// 	complete: () => {
				// 		uni.hideLoading();
				// 	}
				// });
			},
			//去密码登录页
			toPwdLogin() {
				// uni.navigateTo({
				// 	url: '../pwd-login/pwd-login'
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	/* #endif */

	@import url("../common/login-page.css");

	.quickLogin {
		height: 350px;
		align-items: center;
		justify-content: center;
	}

	.quickLoginBtn {
		margin: 20px 0;
		width: 450rpx;
	}
</style>