<template>
	<view>
		<uni-list>
			<uni-list-item class="item">
				<template v-slot:body>
					<view class="item">
						<text>{{$t('userinfo.ProfilePhoto')}}</text>
						<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
							<cloud-image v-if="avatarUrl" :src="avatarUrl" width="50px" height="50px"></cloud-image>
						</button>

						<!-- 						<cloud-image @click="uploadAvatarImg" v-if="avatar_file" :src="avatar_file.url" width="50px" height="50px"></cloud-image>
						<uni-icons @click="uploadAvatarImg" v-else class="chooseAvatar" type="plusempty" size="30" color="#dddddd"></uni-icons> -->
					</view>
				</template>
			</uni-list-item>

			<!-- <input type="nickname" class="weui-input" placeholder="请输入昵称" /> -->


			<!-- 			<uni-list-item class="item" @click="setNickname('')" :title="$t('userinfo.nickname')"
				:rightText="userInfo.nickname||$t('userinfo.notSet')" link> -->

			<uni-list-item type="nickname" class="weui-input" @click="setNickname('')" :title="$t('userinfo.nickname')"
				:rightText="userInfo.nickname||$t('userinfo.notSet')" link>

			</uni-list-item>
			<uni-list-item class="item" @click="bindMobile" :title="$t('userinfo.phoneNumber')"
				:rightText="userInfo.mobile||$t('userinfo.notSpecified')" link>
			</uni-list-item>
		</uni-list>


		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" :value="userInfo.nickname" @confirm="setNickname"
				:title="$t('userinfo.setNickname')" :placeholder="$t('userinfo.setNicknamePlaceholder')">
				<input v-model="userInfo.nickname" type="nickname" class="weui-input" placeholder="请输入昵称"
					@blur="bindblur" @input="bindinput" />
			</uni-popup-dialog>
		</uni-popup>
		<uni-bindMobileByMpWeixin ref="uni-bindMobileByMpWeixin"></uni-bindMobileByMpWeixin>
	</view>
</template>
<script>
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	const db = uniCloud.database();
	const usersTable = db.collection('uni-id-users')

	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


	export default {
		data() {
			return {
				avatarUrl: defaultAvatarUrl,
				nickName: "可",
				univerifyStyle: {
					authButton: {
						"title": "本机号码一键绑定", // 授权按钮文案
					},
					otherLoginButton: {
						"title": "其他号码绑定",
					}
				}
			}
		},
		onLoad() {
			this.avatarUrl = this.avatar_file.url;
			// console.log("avatarUrl:", this.avatarUrl)
			this.univerifyStyle.authButton.title = this.$t('userinfo.bindPhoneNumber')
			this.univerifyStyle.otherLoginButton.title = this.$t('userinfo.bindOtherLogin')
			uni.setNavigationBarTitle({
				title: this.$t('userinfo.navigationBarTitle')
			})
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				login: 'user/hasLogin'
			}),
			avatar_file() {
				if (this.userInfo.avatar_file && this.userInfo.avatar_file.url) {
					return this.userInfo.avatar_file
				}
			}
		},
		methods: {
			bindblur(e) {
				this.nickName = e.detail.value; // 获取微信昵称
				console.log( e.detail.value );
				// this.setNickname(e.detail.value)
			},
			bindinput(e) {
				// this.nickName = e.detail.value; //这里要注意如果只用blur方法的话用户在输入玩昵称后直接点击保存按钮，会出现修改不成功的情况。
				console.log( e.detail.value );
			},

			...mapMutations({
				setUserInfo: 'user/login'
			}),

			async onChooseAvatar(e) {
				try {
					// console.log("onChooseAvatar avatarUrl:", this.avatarUrl);
					this.avatarUrl = e.detail.avatarUrl;
					const cloudPath = `${this.userInfo._id}_${Date.now()}`; // 使用模板字符串更清晰
					// console.log("onChooseAvatar cloudPath:", cloudPath);

					// 设定 cloudPath 和 filePath
					const {
						fileID
					} = await uniCloud.uploadFile({
						cloudPath: cloudPath,
						filePath: e.detail.avatarUrl, // 这里是文件路径
						fileType: 'image'
					});

					// 更新 avatar_file 的属性
					let avatar_file = {
						extname: '',
						name: cloudPath,
						url: fileID
					};

					this.setAvatarFile(avatar_file)

					// console.log("onChooseAvatar avatarUrl2:", this.avatarUrl);

				} catch (error) {
					console.error("Failed to upload avatar:", error);
				}
			},
			bindMobile() {
				// #ifdef APP-PLUS
				uni.preLogin({
					provider: 'univerify',
					success: this.univerify(), //预登录成功
					fail: (res) => { // 预登录失败
						// 不显示一键登录选项（或置灰）
						console.log(res)
						this.bindMobileBySmsCode()
					}
				})
				// #endif

				// #ifdef MP-WEIXIN
				this.$refs['uni-bindMobileByMpWeixin'].open()
				// #endif

				// #ifdef H5
				//...去用验证码绑定
				this.bindMobileBySmsCode()
				// #endif
			},
			univerify() {
				uni.login({
					"provider": 'univerify',
					"univerifyStyle": this.univerifyStyle,
					success: async e => {
						console.log(e.authResult);
						uniCloud.callFunction({
							name: 'uni-id-cf',
							data: {
								action: 'bindMobileByUniverify',
								params: e.authResult,
							},
							success: ({
								result
							}) => {
								console.log(result);
								if (result.code === 0) {
									this.setUserInfo({
										"mobile": result.mobile
									})
									uni.closeAuthView()
								} else {
									uni.showModal({
										content: result.msg,
										showCancel: false,
										complete() {
											uni.closeAuthView()
										}
									});
								}
							}
						})
					},
					fail: (err) => {
						console.log(err);
						if (err.code == '30002' || err.code == '30001') {
							this.bindMobileBySmsCode()
						}
					}
				})
			},
			bindMobileBySmsCode() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/bind-mobile/bind-mobile'
				})
			},
			setNickname(nickname) {
				console.log(nickname);				
				if (nickname) {
					nickname = this.nickName;
					console.log("userInfo.nickname：", nickname);
					usersTable.where('_id==$env.uid').update({
						nickname
					}).then(e => {
						console.log(e);
						if (e.result.updated) {
							uni.showToast({
								title: this.$t('common.updateSucceeded'),
								icon: 'none'
							});
							this.setUserInfo({
								nickname
							});
						} else {
							uni.showToast({
								title: this.$t('userinfo.noChange'),
								icon: 'none'
							});
						}
					})
					this.$refs.dialog.close()
				} else {
					this.$refs.dialog.open()
				}
			},
			setAvatarFile(avatar_file) {
				uni.showLoading({
					title: this.$t('userinfo.setting'),
					mask: true
				});
				// 使用 clientDB 提交数据
				usersTable.where('_id==$env.uid').update({
					avatar_file
				}).then((res) => {
					console.log(res);
					if (avatar_file) {
						uni.showToast({
							icon: 'none',
							title: this.$t('userinfo.setSucceeded')
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: this.$t('userinfo.deleteSucceeded')
						})
					}
					this.setUserInfo({
						avatar_file
					});
				}).catch((err) => {
					uni.showModal({
						content: err.message || this.$t('userinfo.requestFail'),
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			uploadAvatarImg(res) {
				const crop = {
					quality: 100,
					width: 600,
					height: 600,
					resize: true
				};
				uni.chooseImage({
					count: 1,
					crop,
					success: async (res) => {
						console.log(res);
						let tempFile = res.tempFiles[0],
							avatar_file = {
								// #ifdef H5
								extname: tempFile.name.split('.')[tempFile.name.split('.').length - 1],
								// #endif
								// #ifndef H5
								extname: tempFile.path.split('.')[tempFile.path.split('.').length - 1]
								// #endif
							},
							filePath = res.tempFilePaths[0]
						// #ifndef APP-PLUS
						//非app端用前端组件剪裁头像，app端用内置的原生裁剪
						filePath = await new Promise((callback) => {
							uni.navigateTo({
								url: '/pages/ucenter/userinfo/cropImage?path=' + filePath +
									`&options=${JSON.stringify(crop)}`,
								animationType: "fade-in",
								events: {
									success: url => {
										callback(url)
									}
								}
							});
						})
						// #endif
						console.log(this.userInfo);
						let cloudPath = this.userInfo._id + '' + Date.now()
						avatar_file.name = cloudPath
						uni.showLoading({
							title: this.$t('userinfo.uploading'),
							mask: true
						});
						let {
							fileID
						} = await uniCloud.uploadFile({
							filePath,
							cloudPath,
							fileType: "image"
						});
						console.log(result)
						avatar_file.url = fileID
						console.log({
							avatar_file
						});
						uni.hideLoading()
						this.setAvatarFile(avatar_file)
					}
				})
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
	.item {
		width: 750rpx;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.chooseAvatar {
		border: dotted 1px #ddd;
		border-radius: 10px;
		text-align: center;
		width: 50px;
		height: 50px;
		line-height: 50px;
	}

	// .popup-content {
	//   padding: 20px;
	// }
	// .weui-input {
	//   width: 100%;
	//   padding: 10px;
	//   border: 1px solid #ccc;
	//   border-radius: 4px;
	// }
	// .popup-footer {
	//   margin-top: 10px;
	//   display: flex;
	//   justify-content: flex-end;
	// }
	// .popup-footer button {
	//   margin-left: 10px;
	// }
</style>