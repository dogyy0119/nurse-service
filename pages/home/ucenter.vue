<template>
	<view class="">
		<view class="center">
<!-- 
			<view class="userInfo" @click.capture="toUserInfo">
				<view class="userInfo-center">
					<view style="circle">
						<image class="logo-img" v-if="userInfo.avatar_file&&userInfo.avatar_file.url"
							:src="userInfo.avatar_file.url"></image>
						<image v-else class="logo-img" src="@/static/uni-center/defaultAvatarUrl.png"></image>
					</view>
					<view class="logo-title">
						<text class="uer-name"
							v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
						<text class="uer-name" v-else>{{$t('mine.notLogged')}}</text>
					</view>
					<uni-icons type="gear" color="blue" size="26"></uni-icons>
				</view>
			</view>

			<uni-list class="center-list" v-for="(sublist , index) in ucenterList" :key="index">
				<uni-list-item v-for="(item,i) in sublist" :title="item.title" link :rightText="item.rightText" :key="i"
					:clickable="true" :to="item.to" @click="ucenterListClick(item)" :show-extra-icon="true"
					:extraIcon="{type:item.icon,color:'#999'}">
					<template v-slot:footer>
						<view v-if="item.showBadge" class="item-footer">
							<text class="item-footer-text">{{item.rightText}}</text>
							<view class="item-footer-badge"></view>
						</view>
					</template>
				</uni-list-item>
			</uni-list> -->

			<view class="group">
				<div class="empty" :index="8" />
				<div class="view" :index="0">
					<image class="icon-circle" :index="2" src="@/static/images/images-front/img_0.png" @click.capture="toUserInfo" />
					<image class="large-icon" :index="1" src="@/static/images/images-front/img_11.png"
						@click.capture="toUserInfo" />
				</div>
				<image class="layer" :index="0" src="@/static/images/images-front/img_2.png" />
				<div class="view-1" :index="5" @click.capture="toUserInfo">
					<image class="picture" v-if="userInfo.avatar_file&&userInfo.avatar_file.url"
						:src="userInfo.avatar_file.url"></image>
					<image v-else class="picture" src="@/static/uni-center/defaultAvatarUrl.png"></image>
					<text class="uer-name"
						v-if="hasLogin">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
					<text class="uer-name" v-else>{{$t('mine.notLogged')}}</text>
				</div>
				<image class="background" :index="3" src="@/static/images/images-front/img_4.png" />
				<image class="logo" :index="2" src="@/static/images/images-front/img_5.png" />
				<image class="layer-1" :index="7" src="@/static/images/images-front/img_6.png" />
				<image class="logo-1" :index="6" src="@/static/images/images-front/img_7.png" />
				<div class="tag-wrapper" :index="1" @click.capture="newucenterListClick(0)">
					<text class="tag" :index="0">立即查看 </text>
				</div>
				<image class="large-icon-1" :index="0" src="@/static/images/images-front/img_8.png" />
				<div class="label-wrapper" :index="5" @click.capture="newucenterListClick(1)">
					<text class="label" :index="4">立即查看 </text>
				</div>
				<image class="large-icon-2" :index="0" src="@/static/images/images-front/img_1.png" />

			</view>
		</view>
		<view class="myclass">
			<tabbar index="2" class="horizontal-tabbar"></tabbar>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex';
	// import uline from '@/node_modules/uview-ui/components/u-line/u-line.vue'
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare()
	// #endif
	const db = uniCloud.database();
	export default {

		// components: {
		//         uline
		//     },
		// #ifdef APP
		onBackPress({
			from
		}) {
			if (from == 'backbutton') {
				this.$nextTick(function() {
					uniShare.hide()
				})
				return uniShare.isShow;
			}
		},

		// #endif
		data() {
			return {
				ucenterList: [
					[
						// {
						// 	"title": "每日签到",
						// 	"event": 'signIn',
						// 	"icon": "compose"
						// },
						// {
						// 	"title": "我的阅读",
						// 	"to": '/pages/ucenter/read-news-log/read-news-log',
						// 	"icon": "flag"
						// },
						// {
						// 	"title": "我的订单",
						// 	"to": '/pages/order/OrderList',
						// 	"icon": "flag"
						// },

						// {
						// 	"title": "我的积分",
						// 	"to": '',
						// 	"event": 'getScore',
						// 	"icon": "paperplane"
						// },
						// {
						// 	"title": "优惠券",
						// 	"to": '/pages/coupon-card/coupon-card', 
						// 	"event": 'getScore',
						// 	"icon": "paperplane"
						// }
						// #ifdef APP-PLUS
						, {
							"title": "在线分享",
							"event": 'share',
							"icon": "redo"
						}
						// #endif
					],
					[{
						"title": "问题反馈",
						"to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
						"icon": "help"
					}, {
						"title": "系统设置",
						"to": '/pages/ucenter/settings/settings',
						"icon": "gear"
					}],
					// [{
					// 	"title": "订单详情",
					// 	"to": '/pages/service/OrderList',
					// 	"icon": "info"
					// }]
				],
				listStyles: {
					"height": "150rpx", // 边框高度
					"width": "150rpx", // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "100%" // 边框圆角，支持百分比
					}
				}
			}
		},
		onLoad() {
			// console.log(313,this.userInfo,this.hasLogin);
			//#ifdef APP-PLUS
			this.ucenterList[this.ucenterList.length - 1].unshift({
				title: this.$t('mine.checkUpdate'), // this.this.$t('mine.checkUpdate')"检查更新"
				rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
				event: 'checkVersion',
				icon: 'loop',
				showBadge: this.appVersion.hasNew
			})
			//#endif
		},
		computed: {
			...mapGetters({
				userInfo: 'user/info',
				hasLogin: 'user/hasLogin'
			})
			// #ifdef APP-PLUS
			,
			appVersion() {
				return getApp().appVersion
			}
			// #endif
			,
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			goRecharge() {

				uni.navigateTo({
					url: '/pages/function/voucher_center_'
				})

			},

			...mapMutations({
				setUserInfo: 'user/login'
			}),
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			signIn() { //普通签到
				this.$refs.signIn.open()
			},
			signInByAd() { //看激励视频广告签到
				this.$refs.signIn.showRewardedVideoAd()
			},
			/**
			 * 个人中心项目列表点击事件
			 */
			
			newucenterListClick( index) {
				this.ucenterListClick(this.ucenterList[1][index])
			},
			
			ucenterListClick(item) {

				console.log("liuhang：" + item.to)

				console.log(item.to)
				
				uni.navigateTo({
					url: item.to
				})
				// if (!item.to && item.event) {
				// 	this[item.event]();
				// }
			},
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/pages/ucenter/userinfo/userinfo'
				})
			},

			/**
			 * 去应用市场评分
			 */
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					// 这里填写appstore应用id
					let appstoreid = this.appConfig.marketId.ios; // 'id1417078253';
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8');
				}
				if (uni.getSystemInfoSync().platform == "android") {
					var Uri = plus.android.importClass("android.net.Uri");
					var uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android);
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent(Intent.ACTION_VIEW, uri);
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				}
				// #endif
			},
			/**
			 * 获取积分信息
			 */
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: this.$t('mine.checkScore'),
					icon: 'none'
				});
				uni.showLoading({
					mask: true
				})
				db.collection("uni-id-scores")
					.where('"user_id" == $env.uid')
					.field('score,balance')
					.orderBy("create_date", "desc")
					.limit(1)
					.get()
					.then((res) => {
						console.log(res);
						const data = res.result.data[0];
						let msg = '';
						msg = data ? (this.$t('mine.currentScore') + data.balance) : this.$t('mine.noScore');
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}).finally(() => {
						uni.hideLoading()
					})
			},
			async share() {
				let {
					result
				} = await uniCloud.callFunction({
					name: 'uni-id-cf',
					data: {
						action: 'getUserInviteCode'
					}
				})
				console.log(result);
				let myInviteCode = result.myInviteCode || result.userInfo.my_invite_code
				console.log(myInviteCode);
				let {
					appName,
					logo,
					company,
					slogan
				} = this.appConfig.about
				// #ifdef APP-PLUS
				uniShare.show({
					content: { //公共的分享类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
						type: 0,
						href: this.appConfig.h5.url +
							`/#/pages/ucenter/invite/invite?code=uniInvitationCode:${myInviteCode}`,
						title: appName,
						summary: slogan,
						imageUrl: logo +
							'?x-oss-process=image/resize,m_fill,h_100,w_100' //压缩图片解决，在ios端分享图过大导致的图片失效问题
					},
					menus: [{
							"img": "/static/app-plus/sharemenu/wechatfriend.png",
							"text": this.$t('common.wechatFriends'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneSession"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/wechatmoments.png",
							"text": this.$t('common.wechatBbs'),
							"share": {
								"provider": "weixin",
								"scene": "WXSceneTimeline"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/weibo.png",
							"text": this.$t('common.weibo'),
							"share": {
								"provider": "sinaweibo"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/qq.png",
							"text": "QQ",
							"share": {
								"provider": "qq"
							}
						},
						{
							"img": "/static/app-plus/sharemenu/copyurl.png",
							"text": this.$t('common.copy'),
							"share": "copyurl"
						},
						{
							"img": "/static/app-plus/sharemenu/more.png",
							"text": this.$t('common.more'),
							"share": "shareSystem"
						}
					],
					cancelText: this.$t('common.cancelShare'),
				}, e => { //callback
					console.log(e);
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.horizontal-tabbar {
		display: flex;
		flex-direction: row;
	}

	.uni-list-item-title {
		font-size: 20px !important;
		/* 使用 !important 确保样式应用 */
	}

	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.user-recharge-wrapper {
		background: #ffffff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin: 20rpx;

		.user-recharge-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			/* 让元素在两端对齐 */
			margin-bottom: 20rpx;

			.recharge-info {
				.info-title {
					color: #333;
					font-size: 20px;
					font-weight: bold;
				}

				.info-content {
					color: #999;
					font-size: 20px;
				}
			}

			.recharge-button {
				/* background: #ff4131; */
				color: #333;
				padding: 10rpx 20rpx;
				font-size: 22rpx;
				border-radius: 50rpx;
				flex-shrink: 0;
				border: 1rpx solid #dadbde;
			}
		}

		.recharge-user-money {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			font-size: 20px;
			color: #333;

			.recharge-money {
				font-weight: bold;
				font-size: 20px;
			}

			.recharge-money::first-letter {
				font-size: 20px;
			}
		}
	}

	.chat-custom-text {
		font-size: 20px;
		color: #999;
	}

	/* #ifndef APP-NVUE */
	view {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	page {
		background-color: #f8f8f8;
	}

	/* #endif*/

	.center {
		flex: 1;
		flex-direction: column;
		// background-image: -webkit-linear-gradient(-77deg, rgba(213, 230, 249, 1) 0%, rgba(247, 248, 250, 1) 100%);
		// background-color: #f8f8f8;
	}

	.userInfo {
		// background-image: linear-gradient(to top, #00aaff, #1cbbb4);
		background-image: linear-gradient(to top, #f7f8fa, #f7f8fa);
	}

	.userInfo-center {
		padding: 60rpx 40rpx;
		align-items: center;
		flex-direction: row;
	}

	.circle {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.logo-img {
		width: 100rpx;
		height: 100rpx;
		-moz-box-shadow: 2px 2px 10px #bababa;
		-webkit-box-shadow: 2px 2px 10px #bababa;
		box-shadow: 2px 2px 10px #bababa;
		border-radius: 50%;
	}

	.logo-title {
		flex: 1;
		margin-left: 20rpx;
		justify-content: flex-start;
		flex-direction: column;
	}

	.uer-name {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 20px;
		color: black;
	}

	.cmp-name {
		font-size: 20px;
		color: #dadada;
	}

	.center-list {
		margin-bottom: 30rpx;
		background-color: #f9f9f9;
	}

	.center-list-cell {
		width: 750rpx;
		background-color: #007AFF;
		height: 40rpx;
	}

	.group {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: flex-start;
		// margin-top: -474rpx;
		box-sizing: border-box;

		.empty {
			align-self: flex-start;
			overflow: auto;
			width: 750rpx;
			height: 400rpx;
			background-image: -webkit-linear-gradient(-77deg, rgba(213, 230, 249, 1) 0%, rgba(247, 248, 250, 1) 100%);
			background-size: 100% 100%;
			border-radius: 0;
			background-repeat: no-repeat;
			background-position: 0 0;
		}

		.view {
			position: absolute;
			display: flex;
			right: -94rpx;
			bottom: -49rpx;
			flex-direction: column;
			justify-content: flex-start;
			width: 647rpx;
			height: 676rpx;
			padding: 301rpx 12rpx 129rpx;
			background-image: url(@/static/images/images-front/img_12.png);
			background-size: 100% 100%;
			box-sizing: border-box;
			background-repeat: no-repeat;
			background-position: 0 0;
			background-origin: padding-box;

			.icon-circle {
				align-self: flex-start;
				width: 46rpx;
				height: 54rpx;
				margin-left: 450rpx;
			}

			.large-icon {
				align-self: flex-start;
				width: 74rpx;
				height: 74rpx;
				margin: 144rpx 0 0 408rpx;
			}
		}

		.layer {
			position: absolute;
			left: -167rpx;
			bottom: -49rpx;
			width: 651rpx;
			height: 676rpx;
		}

		.view-1 {
			position: absolute;
			display: flex;
			left: 28rpx;
			bottom: 256rpx;
			flex-direction: row;
			justify-content: center;
			overflow: auto;
			padding: 12rpx;
			background-color: rgba(225, 233, 245, 1);
			border-radius: 56.5rpx;
			box-sizing: border-box;

			.picture {
				border-radius: 50%;
				align-self: flex-start;
				width: 89rpx;
				height: 89rpx;
			}

			// .circle {
			// 	width: 120rpx;
			// 	height: 120rpx;
			// 	border-radius: 50%;
			// 	overflow: hidden;
			// }

			// .logo-img {
			// 	width: 100rpx;
			// 	height: 100rpx;
			// 	-moz-box-shadow: 2px 2px 10px #bababa;
			// 	-webkit-box-shadow: 2px 2px 10px #bababa;
			// 	box-shadow: 2px 2px 10px #bababa;
			// 	border-radius: 50%;
			// }


			.uer-name {
				height: 80rpx;
				line-height: 80rpx;
				font-size: 32rpx;
				margin-left: 10rpx;
			}

		}

		.background {
			position: absolute;
			left: 28rpx;
			bottom: 66rpx;
			width: 333rpx;
			height: 163rpx;
		}

		.logo {
			position: absolute;
			left: 63rpx;
			bottom: 160rpx;
			width: 135rpx;
			height: 33rpx;
		}

		.layer-1 {
			position: absolute;
			right: 29rpx;
			bottom: 66rpx;
			width: 333rpx;
			height: 163rpx;
		}

		.logo-1 {
			position: absolute;
			right: 192rpx;
			bottom: 160rpx;
			width: 137rpx;
			height: 33rpx;
		}

		.tag-wrapper {
			position: absolute;
			display: flex;
			left: 58rpx;
			bottom: 94rpx;
			flex-direction: row;
			justify-content: center;
			width: 129rpx;
			height: 47rpx;
			padding: 13rpx 12rpx 10rpx;
			background-image: url(@/static/images/images-front/img_13.png);
			background-size: 100% 100%;
			box-sizing: border-box;
			background-repeat: no-repeat;
			background-position: 0 0;
			background-origin: padding-box;

			.tag {
				align-self: flex-start;
				overflow: hidden;
				max-width: 103rpx;
				margin-left: 1rpx;
				font-family: 'MiSans-Medium';
				font-size: 22rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 26rpx;
				color: rgba(255, 255, 255, 1);
				text-align: left;
				text-decoration: none;
				letter-spacing: 0.66rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.large-icon-1 {
			position: absolute;
			left: 272rpx;
			bottom: 75rpx;
			width: 64rpx;
			height: 71rpx;
		}

		.large-icon-2 {
			position: absolute;
			left: 632rpx;
			bottom: 75rpx;
			width: 64rpx;
			height: 71rpx;
		}

		.label-wrapper {
			position: absolute;
			display: flex;
			right: 203rpx;
			bottom: 94rpx;
			flex-direction: row;
			justify-content: center;
			width: 129rpx;
			height: 47rpx;
			padding: 14rpx 12rpx 11rpx;
			background-image: url(@/static/images/images-front/img_14.png);
			background-size: 100% 100%;
			box-sizing: border-box;
			background-repeat: no-repeat;
			background-position: 0 0;
			background-origin: padding-box;

			.label {
				align-self: flex-start;
				overflow: hidden;
				max-width: 103rpx;
				margin-left: 1rpx;
				font-family: 'MiSans-Medium';
				font-size: 22rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 22rpx;
				color: rgba(255, 255, 255, 1);
				text-align: left;
				text-decoration: none;
				letter-spacing: 0.66rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}

	/*修改边线粗细示例*/
	/* #ifndef APP-NVUE */
	.center-list ::v-deep .uni-list--border:after {
		-webkit-transform: scaleY(0.2);
		transform: scaleY(0.2);
		margin-left: 80rpx;
	}

	.center-list ::v-deep .uni-list--border-top,
	.center-list ::v-deep .uni-list--border-bottom {
		display: none;
	}

	/* #endif */
	.item-footer {
		flex-direction: row;
		align-items: center;
	}

	.item-footer-text {
		color: #999;
		font-size: 18px;
		padding-right: 10rpx;
	}

	.item-footer-badge {
		width: 20rpx;
		height: 20rpx;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-radius: 10rpx;
		/* #endif */
		background-color: #DD524D;
	}

	.article-title {
		/* #ifdef APP-PLUS */
		padding: 50rpx;
		margin-top: 30rpx;
		/* #endif */
		font-size: 20px;
		color: #FFFFFF;
		padding-bottom: 0;
		align-items: center;
	}
</style>