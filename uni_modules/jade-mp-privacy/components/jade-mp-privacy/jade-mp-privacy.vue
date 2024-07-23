<template>
	<view class="dialog-container" v-if="isShow" @touchmove.stop.prevent="moveHandle">
		<view class="dialog-content">
			<view class="dialog-title">
				{{title}}
			</view>
			<view class="dialog-text">
				{{desc1}}
				<text style="color: #314ad9;" @tap="toOpenPrivacyContract">{{name}}</text>
			</view>
			<view class="dialog-tip">
				{{desc2}}
			</view>
			<view class="dialog-button-box">
				<button class="dialog-button" @tap="close">拒绝</button>
				<button class="dialog-button primary" hover-class="hover-class" id="agree-btn" open-type="agreePrivacyAuthorization"
					@agreeprivacyauthorization="handleAgreePrivacyAuthorization">同意</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "jade-mp-privacy",
		props: {
			title: {
				type: String,
				default: '用户隐私保护提示'
			},
			initiative: {
				type: Boolean,
				default: false
			},
			isCover: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				isShow: false,
				desc1: '您使用本产品服务前应当阅读井同意',
				name: '《用户隐私保护指引》',
				desc2: '当您点击同意并开始时用产品服务时，即表示你已理解并同息该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法使用该产品服务。',
			};
		},
		created() {
			console.log("initiative :" + this.initiative )
			if (wx.onNeedPrivacyAuthorization) {
				/*
			       * wx.getPrivacySetting 不参与逻辑，判断用户授权情况。可以注释
			       * res返回 needAuthorization返回false，表示不需要授权（用户已授权过）
			       *         needAuthorization返回true，表示需要授权（会触发wx.onNeedPrivacyAuthorization）
				*/
				wx.getPrivacySetting({
					success: res => {
						this.name = res.privacyContractName
						if(this.initiative){
							this.isShow = res.needAuthorization
							this.isShow = true
							// if(this.isShow) this.isCover && uni.hideTabBar()
						}
						console.log("组件 getWxPrivacySetting success res", res)
						// console.log("getPrivacySetting :")
						
						// this.$emit('updateParams', true);
					}
				})

				// 模拟用户授权,上线前必须注释,仅用于调试
				// wx.requirePrivacyAuthorize({
				// 	success: () => {
				// 		// wx.getPrivacySetting返回fals     
				// 		console.log("用户授权过,继续小程序逻辑")
				// 	},
				// 	fail: () => {
				// 		// wx.getPrivacySetting返回true,触发wx.onNeedPrivacyAuthorization
				// 		console.log("触发wx.onNeedPrivacyAuthorization监听")
				// 	}
				// })

				wx.onNeedPrivacyAuthorization(resolve => {
					this.resolvePrivacyAuthorization = resolve
					this.isShow = true
					// this.isCover && uni.hideTabBar()
				})
			}
			this.isShow = true
		},
		methods: {
			moveHandle(){},
			handleAgreePrivacyAuthorization(){
				console.log("handleAgreePrivacyAuthorization :")
				this.$emit('updateParams', true);
				
				// 用户点击同意按钮后
				if(this.resolvePrivacyAuthorization){
					this.resolvePrivacyAuthorization({
						buttonId: 'agree-btn',
						event: 'agree'
					})
				}
				this.close()
			},
			toOpenPrivacyContract(){
				wx.openPrivacyContract({
					success: () => {}, 
					fail: () => {}, 
					complete:() => {}
				})
		　　},
			close(){
				this.isShow = false
				// this.isCover && uni.showTabBar()
				console.log("this.isShow :" + this.isShow )
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog-container {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.42);
		left: 0;
		top: 0;
		z-index: 999;
		.dialog-content {
			padding: 60rpx 40rpx;
			font-size: 32rpx;
			color: #2D3038;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			background-color: #ffffff;
			position: absolute;
			width: 100%;
			min-height: 200rpx;
			bottom: 0;
			box-sizing: border-box;
			.dialog-title{
				text-align: center;
				font-size: 36rpx;
				font-weight: 600;
			}
			.dialog-text {
				display: block;
				padding: 40rpx;
				padding-bottom: 20rpx;
				font-size: 30rpx;
			}
			.dialog-tip{
				padding: 40rpx;
				padding-top: 0;
				font-size: 26rpx;
				color: #848484;
			}
			.dialog-button-box {
				padding: 0 40rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.dialog-button {
				margin: 0;
				width: 240rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				&.primary {
					color: #ffffff;
					background-color: #00d354;
				}
				&.hover-class{
					background-color: #00b344;
				}
			}
		}
	}
</style>