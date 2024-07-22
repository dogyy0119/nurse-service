<template>
	<view class="content">
		<!-- :backgroundColor="backgroundColor" -->
<!-- 		<uni-nav-bar title="订单详情" :fixed="true" :color="fontColor" :statusBar="true" :border="false"
			:backgroundColor="nav_opacity" left-icon="left" leftText="返回" :placeholder="false" @clickLeft="clickLeft">
		</uni-nav-bar> -->

		<!-- 顶部背景 -->
		<view class="tang-feng-bg"></view>
		<!--内容区 -->
		<view class="tang-feng-block">
			<!-- 用户数据块 -->
			<view class="tang-feng-data">
				<view class="detail-top">
					<view class="detail-top-1">
						<image src="/static/detail/jinxi.png" mode="widthFix"></image>
						{{ service.title }} : {{ getStatusText(service.status) }}
					</view>
					<view class="detail-top-2">预约时间: {{formatTime(service.reservation_time)}}</view>
				</view>
				<!-- 地址信息 -->
				<view class="detailitem detail-address">
					<view class="top">
						<image src="/static/detail/address.png" mode="widthFix"></image>
						{{ service.servants_name }} {{ service.servants_phone }}
					</view>
					<view class="address">地址：{{ service.servants_address }}</view>
				</view>
				<!-- 商品信息 -->
				<view class="detailitem shopBox">
					<view class="item" v-for="(item,index) in 1" :key="index">
						<image mode="aspectFill" :src="(nurseSrvice.service_thumb)" ></image>
						<view class="conBox">
							<view class="conBox-1">商品名称： {{ nurseSrvice.name }}</view>
							<view class="conBox-2">服务时间：{{ nurseSrvice.service_time}}</view>
							<view class="conBox-3">¥ {{ nurseSrvice.price/100 }}</view>
						</view>
						<view class="number">X1</view>
					</view>
				</view>
				<!-- 订单信息 -->
				<view class="detailitem orderItem">
					<view class="orderItem-min">
						<view class="orderItem-1">订单编号：</view>
						<view class="orderItem-2">{{ service._id }}</view>
						<view class="orderItem-3" @click="copyText( service._id )">复制</view>
					</view>
					<view class="orderItem-min">
						<view class="orderItem-1">下单时间：</view>
						<!-- <view class="orderItem-2">{{ formatTime(service.paid_time) }}</view> -->
						<view class="orderItem-2">{{ formatTime(service.update_time) }}</view>
						
					</view>
					<view class="orderItem-min">
						<view class="orderItem-1">护士名称：</view>
						<view class="orderItem-2">{{ service.nurse_nickname }}</view>
					</view>
					<view class="orderItem-min">
						<view class="orderItem-1">护士电话：</view>
						<view class="orderItem-2">{{ service.nurse_phone }}</view>
					</view>
					<view class="orderItem-min" style="border-bottom: 2rpx solid rgba(0,0,0,0)">
						<view class="orderItem-1">备注信息：</view>
						<view class="orderItem-2"> {{ service.info }}</view>
					</view>
				</view>
				<!-- 订单信息 -->
				<view class="detailitem orderItem" style="margin-bottom: 100rpx;">
					<view class="orderItem-min orderInfo">
						<view class="orderItem-1">商品总额</view>
						<view class="orderItem-2">¥ {{ service.total_fee/100}}</view>
					</view>
					<view class="orderItem-min orderInfo">
						<view class="orderItem-1">耗材费用</view>
						<view class="orderItem-2">¥ {{ service.total_fee/100 - nurseSrvice.price/100}}</view>
					</view>
					<view class="orderItem-min orderInfo" style="border-bottom: 2rpx solid rgba(0,0,0,0)">
						<view class="orderItem-1"></view>
						<view class="orderItem-2">实付款：<text style="color: red;"> ¥ {{ service.total_fee/100 }}</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottomBox">
			<view class="leftTxt">¥<text style="font-size: 46rpx;margin-left: 15rpx;">{{ service.total_fee/100 }}</text> </view>
			<view class="gnBox">
				<view class="item zhun" @click="btn1Click( )" > {{ btn1name }}</view>
				<!-- <view class="item jie">支付</view> -->
				<!-- <view class="item lianxi" @click="btn2Click( )" >{{ btn2name }}</view> -->
			</view>
		</view>

	</view>
</template>

<script>
	import Alert from '@/utils/alert';
	export default {
		data() {
			return {
				backgroundColor: 0,
				nav_opacity: 'rgba(255,255,255,0)',
				fontColor: '#ffffff',
				orderId: "",
				service: {
					title: ''
				},
				nurseSrvice: {},
				btn1name: "退款",
				btn2name: "确定",
			}
		},
		// 导航栏渐变
		onPageScroll(e) {
			// this.nav_opacity = `rgba(255,255,255,${(e.scrollTop > 255 ? 255 : e.scrollTop) / 255})`;
			// if (e.scrollTop > 20) {
			// 	this.fontColor = '#000000'
			// 	uni.setNavigationBarColor({
			// 		frontColor: '#000000',
			// 		backgroundColor: '#ffffff',
			// 	})
			// } else {
			// 	uni.setNavigationBarColor({
			// 		frontColor: '#ffffff',
			// 		backgroundColor: '#ffffff'
			// 	})
			// 	this.fontColor = '#ffffff'
			// }
		},
		onLoad(options) {
			if (options.params) {
			    let params = JSON.parse(decodeURIComponent(options.params)); // 将URL解码后解析为对象
			    console.log(params);
				this.orderId = params.orderId;	
			}	
			console.log("this.orderId :" + this.orderId)
			this.fetchServiceDetails();
		},
		methods: {
			clickLeft() {
				uni.navigateBack({
					delta: 1
				})
			},
			
			btn1Click() {
				if ( this.service.status == 2 ) {
					var currentDate = new Date(); // 创建一个新的 Date 对象，表示当前时间
					console.log("currentDate："+ currentDate)
					uniCloud.callFunction({
						name: "nurse-order-update",
						data: 
						{
							id: this.orderId,
							status: 7,
						},
						success: (res) => {	
							console.log(res.result.data)
						},
						fail: (err) => {					
							console.error("请求失败: " + err);
						},
						complete: (res) => {
							console.log("请求完成");
						}
					});
					
					uni.showToast({
					  title: `退款已申请`
					});
					
				} else if ( this.service.status == 1) {
					console.log("item===支付====")
					
					//let user_id = uni.getStorageSync('user_id');
					
					let obj = {
						totalFee: this.service.total_fee,
						//userName: user_id,
						serviceName: this.service.title,
						orderId: this.orderId
					};
					let params = encodeURIComponent(JSON.stringify(obj)); // 将对象转换为字符串并进行URL编码
																				
					uni.navigateTo({
						url: '/pages/service/function/voucher_center_?params=' + params,
						success: res => {},
						fail: () => {},
						complete: () => {}
					})
				} else {
					// var currentDate = new Date(); // 创建一个新的 Date 对象，表示当前时间
					// console.log("currentDate："+ currentDate)
					// uniCloud.callFunction({
					// 	name: "nurse-order-update",
					// 	data: 
					// 	{
					// 		id: this.orderId,
					// 		status: 1,
					// 	},
					// 	success: (res) => {	
					// 		console.log(res)
					// 	},
					// 	fail: (err) => {					
					// 		console.error("请求失败: " + err);
					// 	},
					// 	complete: (res) => {
					// 		console.log("请求完成");
					// 	}
					// });
				}
			},
			btn2Click() {
				uni.switchTab({
					url: '/pages/index/index',
					success: (res) => {
						// 处理成功的情况，如果需要的话
					},
					fail: (err) => {
						// 处理失败的情况，如果需要的话
					}
				});

			},
			
			/**
			 * @function 复制功能
			 */
			copyText(msg) {
				uni.setClipboardData({
					data: msg,
					success: () => {
						Alert.success('复制成功');
					},
					fail: () => {
						Alert.success('复制失败');
					}
				});

			},
			
			
			async fetchServiceDetails() {
					
				uni.showLoading({
					mask: true
				})
					
				try {
				// Replace this with your actual UniCloud API call to fetch service details
				uniCloud.callFunction({
					name: "nurse-order-get",
					data: 
					{
						id: this.orderId,
					},
					success: (res) => {	
						console.log(res.result.data)
						this.service = res.result.data[0];
						//this.btn1name = this.service.status == 2 ? "退款" : "支付";
						if ( this.service.status == 2 ) {
							this.btn1name = "退款";
						} else if ( this.service.status == 1) {
							this.btn1name = "支付"
						} else {
							this.btn1name = this.getStatusText(this.service.status)
						}
						
						this.fetchNurseServiceDetails(this.service.service_id);
					},
					fail: (err) => {
						uni.hideLoading({
							mask: true
						})
						console.error("请求失败: " + err);
					},
					complete: (res) => {
						uni.hideLoading({
							mask: true
						})
						console.log("请求完成");
					}
				});
			    
				// Assuming response.data contains the JSON data you provided
			    
				} catch (error) {
					console.error('Error fetching service details:', error);
				}
			},
			
			async fetchNurseServiceDetails(id) {
					
				try {
				// Replace this with your actual UniCloud API call to fetch service details
				uniCloud.callFunction({
					name: "nurse-service-getid",
					data: 
					{
						id: id,
					},
					success: (res) => {	
						console.log(res.result.data)
						this.nurseSrvice = res.result.data[0];
					},
					fail: (err) => {

						console.error("请求失败: " + err);
					},
					complete: (res) => {

						console.log("请求完成");
					}
				});
				
				// Assuming response.data contains the JSON data you provided
				
				} catch (error) {
					console.error('Error fetching service details:', error);
				}
			},
			
			formatTime(timestamp) {
				
				const date = new Date(timestamp);
				if (!(date instanceof Date) || isNaN(date.getTime())) {
					return ''; // or throw an error if you prefer
				}
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			getStatusText(status) {
			  switch (status) {
			    case 1:
			      return '待支付';
			    case 2:
			      return '已支付';
			    case 3:
			      return '已派单';
			    case 4:
			      return '已接受';
			    case 5:
			      return '已拒绝';
			    case 6:
			      return '已完成';
			    case 7:
			      return '退款审核中';
			    case 8:
			      return '退款中';
			    case 9:
			      return '已退款';
			    default:
			      return '未知状态';
			  }
			}
			
		}
	}
</script>

<style lang="scss">
	.content {
		color: #1cbbb4;
		font: normal 14px/2.2 Arial, Verdana, Tahoma, sans-serif;
		background-color: #F5F5F5;
	}

	.tang-feng-bg {
		width: 100%;
		height: 700rpx;
		position: relative;
		background: linear-gradient(to top, #ffffff, #8CDDD9);
	}

	.tang-feng-block {
		padding: 20rpx;
		box-sizing: border-box;
		margin-top: -520rpx;
		position: relative;
		z-index: 3;

		.tang-feng-data {
			border-radius: 12rpx;
			margin-bottom: 20rpx;

			.detail-top {
				width: 100%;
				margin-bottom: 20rpx;

				.detail-top-1 {
					color: #ffffff;
					font-weight: bold;
					font-size: 46rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 70rpx;
						height: 65rpx;
						margin-right: 10rpx;
					}
				}

				.detail-top-2 {
					color: #ffffff;
					font-size: 32rpx;
					text-align: center;
					letter-spacing: 3rpx;
				}
			}

			.detailitem {
				background-color: #ffffff;
				border-radius: 20rpx;
				box-shadow: 0 0upx 6upx 0upx rgba(0, 0, 150, .2);
				margin-bottom: 20rpx;
				padding: 20rpx;
				box-sizing: border-box;
			}

			.detail-address {
				.top {
					font-weight: bold;
					letter-spacing: 3rpx;
					font-size: 32rpx;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				.address {
					color: rgba(0, 0, 0, .7);
				}
			}

			.shopBox {

				// height: 200rpx;
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;

					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 10rpx;
					}

					.conBox {
						flex: 1;
						min-height: 200rpx;
						padding: 10rpx 20rpx;
						box-sizing: border-box;
						border-bottom: 2rpx solid #f3f3f3;

						.conBox-1 {
							font-size: 28rpx;
							font-weight: bold;
						}

						.conBox-2 {
							font-size: 22rpx;
							font-weight: bold;
							color: rgba(0, 0, 0, .7);
						}

						.conBox-3 {
							font-size: 34rpx;
							font-weight: bold;
							color: red;
						}
					}

					.number {
						width: 70rpx;
						text-align: center;
					}
				}
			}

			.orderItem {
				.orderItem-min {
					width: 100%;
					display: flex;
					align-items: center;
					letter-spacing: 4rpx;
					border-bottom: 2rpx solid #f3f3f3;
					padding: 15rpx 0;

					.orderItem-1 {
						width: 170rpx;
						color: rgba(0, 0, 0, .7);
					}

					.orderItem-2 {
						color: #000000;
						font-weight: bold;
						margin-right: 20rpx;
					}

					.orderItem-3 {
						padding: 0rpx 20rpx;
						box-sizing: border-box;
						border-radius: 10rpx;
						background-color: #eeeeee;
					}
				}

				.orderInfo {
					justify-content: space-between;
				}
			}
		}
	}

	.bottomBox {
		background-color: #ffffff;
		border: 1px solid #cccccc;
		/* 设置边框 */
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
		/* 设置阴影 */
		width: 750rpx;
		height: 140rpx;
		position: fixed;
		bottom: 0;
		z-index: 20;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		letter-spacing: 5rpx;

		.leftTxt {
			color: #e55239;
			font-size: 40rpx;
			font-weight: bold;
		}

		.gnBox {
			height: 100%;
			display: flex;
			align-items: center;

			.item {
				// width: 70rpx;
				background-color: #e55239;
				color: #ffffff;
				padding: 0rpx 20rpx;
				box-sizing: border-box;
				margin-left: 15rpx;
				border-radius: 10rpx;
			}

			.zhun {
				background-color: #e55239;
			}

			.jie {
				background-color: #6b5ef8;
			}

			.lianxi {
				background-color: #51baad;
			}
		}
	}
</style>