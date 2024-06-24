<template>
	<view class="">
		
	
	<view class="center">
		<!-- <uni-sign-in ref="signIn"></uni-sign-in> -->
		<view class="userInfo" @click.capture="toUserInfo">
			<!-- <view class="article-title">个人中心</view> -->
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
					<!-- <text class="cmp-name">尚未实名认证公司信息</text> -->
				</view>
				<uni-icons type="gear" color="#dadada" size="26"></uni-icons>
			</view>
		</view>
		
		<!-- 充值优惠 - 开始 -->
		<!-- <view class="user-recharge-wrapper">
			<view class="user-recharge-box">
				<view class="recharge-info">
					<view class="info-title">
						账户充值
					</view>
					<view class="info-content">
						支付由余额代替
					</view>
				</view>
		
				<view class="recharge-button" @click="goRecharge('voucher_center_')">
					立即充值
				</view>
			</view>
		
			<u-line color="#efefef"></u-line>
			
			<view class="recharge-user-money">
				<view class="recharge-money-title">储值：</view>
				<view class="recharge-money">¥ {{userInfo.money}}</view>
			</view>
		</view> -->
		
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
		</uni-list>
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
						{
							"title": "优惠券",
							"to": '/pages/coupon-card/coupon-card', 
							"event": 'getScore',
							"icon": "paperplane"
						}
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
					[{
						"title": "关于APP",
						"to": '/pages/ucenter/about/about',
						"icon": "info"
					}]
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
			ucenterListClick(item) {
				
				console.log(item.to)
				if (!item.to && item.event) {
					this[item.event]();
				}
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
			justify-content: space-between; /* 让元素在两端对齐 */
			margin-bottom: 20rpx;
		
			.recharge-info {
				.info-title {
					color: #333;
					font-size: 28rpx;
					font-weight: bold;
				}
				.info-content {
					color: #999;
					font-size: 24rpx;
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
		
		.recharge-user-money{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #333;
			
			.recharge-money{
				font-weight: bold;
				font-size: 30rpx;
			}
			
			.recharge-money::first-letter{
				font-size: 22rpx;
			}
		}
	}

	.chat-custom-text {
		font-size: 12px;
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
		background-color: #f8f8f8;
	}

	.userInfo {
		// background-image: linear-gradient(to top, #00aaff, #1cbbb4);
		background-image: linear-gradient(to top, #1cbbb4, #1cbbb4);
	}

	.userInfo-center {
		padding: 60rpx 40rpx;
		align-items: center;
		flex-direction: row;
	}

	.circle {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.logo-img {
		width: 150rpx;
		height: 150rpx;
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
		font-size: 38rpx;
		color: #FFFFFF;
	}

	.cmp-name {
		font-size: 24rpx;
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
		font-size: 24rpx;
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
		font-size: 32rpx;
		color: #FFFFFF;
		padding-bottom: 0;
		align-items: center;
	}
</style>
