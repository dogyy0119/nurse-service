s<template>
	<view class="content">
		<view class="me-head">
		    <u-sticky bgColor="#fff">
		        <u-tabs class="custom-tabs" :list="allList" lineColor="#1cbbb4"
		            :activeStyle="{color: '#1cbbb4', fontWeight: 'bold', transform: 'scale(1.05)', fontSize: '20px'}"
		            @click="tabClick"
		            style="font-size: 20px;"> <!-- 修改这里来设置默认字体大小 -->
		        </u-tabs>
		    </u-sticky>
		</view>
		<view class="me-center">
			<view class="list-tab">
				<ul class="item-ul" v-for="(item, index) in orderList" :key="index">
					<li v-if="item.odStatus == tabsIndex || tabsIndex == 0">
						<view class="item-top">
							<view>
								<text>订单编号：</text>
								<text>{{item.odNumber}}</text>
							</view>
							<!-- 	<view class="pay-type" :class="getStatusClass(item.odStatus)">
								<text>{{allList[item.odStatus].name}}</text>
							</view> -->
							<view class="pay-type">
								<text>{{allList[item.odStatus].name}}</text>
							</view>
						</view>
						<u-line dashed></u-line>
						<view class="item-content">
							<view class="item-left">
								<u-image :src="item.picUrl" :fade="true" radius="5" width="70" height="70"
									duration="450"></u-image>
							</view>
							<view class="item-right" @click="goDetail(item)">
								<view class="item-right-v1">
									<text class="item-title">{{item.odName}}</text>
								</view>
								<view class="item-right-v1 induce">
									<text class="rate-text1">订单地址：{{item.odAddress}}</text>
								</view>
								<view class="item-right-v1 induce">
									<text class="rate-text1">付款时间：{{formatDate(item.odPaytime)}}</text>
								</view>
								<view class="item-right-v1 induce">
									<text class="rate-text1">预约时间：{{formatTime(item.odTime)}}</text>
								</view>
								<view class="item-right-v2">
									<view class="v2-fh">￥<text class="v2-price">{{item.odPrice/100}}</text></view>
								</view>
							</view>
						</view>

						<u-line dashed></u-line>
						<view class="item-btom" v-if="item.odStatus == 1">
							<view @click="cancelClick(item)">
								<view class="item-btom-btn">取消</view>
							</view>
							<view @click="payClick(item)">
								<view class="item-btom-btn pay">支付</view>
							</view>
						</view>

						<view class="item-btom" v-if="item.odStatus == 3">
							<view class="item-btom-btn" @click="evaluateClick(item)">评价</view>
						</view>
					</li>
				</ul>
			</view>
		</view>
		<tabbar index="1"></tabbar>
	</view>
</template>
<script>
	// import uSticky  from '@/node_modules/uview-ui/components/u-sticky/u-sticky.vue';

	export default {
		// components:{
		//     uSticky,
		// },
		data() {
			return {
				tabsIndex: 0,
				user_id: "",
				allList: [{
						tabId: 0,
						name: '全部'
					},
					{
						tabId: 1,
						name: '待支付'
					},
					{
						tabId: 2,
						name: '已支付'
					},
					{
						tabId: 3,
						name: '已派单'
					},
					{
						tabId: 4,
						name: '已接受'
					},
					{
						tabId: 5,
						name: '已拒绝'
					},
					{
						tabId: 6,
						name: '已完成'
					},
					{
						tabId: 7,
						name: '退款审核中'
					},
					{
						tabId: 8,
						name: '退款中'
					},
					{
						tabId: 8,
						name: '已退款'
					},
				],
				// "订单状态，1：待付款，2：已付款，3：已派单，4：已接受，5：已拒绝，6：已完成，7：退款审核中，8：退款中，9：已退款，-1：已取消付款/退款，-2：退款拒绝，-3：退款失败"

				orderList: [],

			}
		},
		onShow() {
			console.log("onLoad");
			this.user_id = uni.getStorageSync('user_id');
			console.log("user_id :" + this.user_id)
			this.getOrderData(0);
		},

		methods: {
			formatDate(timestamp) {
				// 判断 timestamp 是否为有效的时间格式
				if (!timestamp || isNaN(new Date(timestamp).getTime())) {
					return "未付款";
				}
				// 如果 timestamp 是有效时间格式，则格式化显示
				return this.formatTime(timestamp); // 假设你有一个 formatTime 方法来格式化时间
			},
			formatTime(timestamp) {
				const date = new Date(timestamp); // Assuming timestamp is in seconds
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			goDetail(item) {
				console.log("liuhang :" + item)
				console.log("liuhang odNumber :" + item.odNumber)

				let obj = {
					orderId: item.odNumber,
				};
				let params = encodeURIComponent(JSON.stringify(obj)); // 将对象转换为字符串并进行URL编码


				uni.navigateTo({
					// url: `/pages/order/OrderDetails/OrderDetails?params=${item.odNumber}`,
					//url: '/pages/order/OrderDetails/OrderDetails?params=' + params,
					url: '/pages/order/OrderDetails/OrderDetail/OrderDetail?params=' + params,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},

			getOrderData(type) {
				uni.showLoading({
					mask: true
				})
				console.log("this.user_id :" + this.user_id)
				let remoteQuery = {};
				if (type !== 0) {
					remoteQuery.status = type,
						remoteQuery.userId = this.user_id
				} else {
					remoteQuery.userId = this.user_id
				}

				uniCloud.callFunction({
					name: "nurse-order-list",
					data: remoteQuery,
					// {
					//        status: 3,
					//        userId: "liyongsheng"
					//    },
					success: (res) => {
						this.orderList = [];
						res.result.data.forEach(item => {

							console.log("item.order_thumb:", item.order_thumb)

							let orderThumb = item.order_thumb;

							// 使用三元运算符来判断 orderThumb 是否为空或为空字符串
							let variable = (orderThumb && orderThumb.trim() !== "") ? orderThumb :
								"/static/logo.png";
							this.orderList.push({
								'picUrl': variable,
								'odNumber': item._id,
								'odName': item.title,
								'odPrice': item.total_fee,
								'odAddress': item.servants_address,
								'odPaytime': item.paid_time,
								'odTime': item.reservation_time,
								'odStatus': item.status
							});
						});

						this.orderList.reverse();

						// this.orderList.forEach((item) => {
						//     if (item.odNumber !== undefined) {
						//         console.log(item.odNumber);
						//     } else {
						//         console.log("odNumber is undefined for this item");
						//     }
						// });

						// console.log(this.orderList)						
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

			},

			tabClick(item) {
				this.tabsIndex = item.index
				this.getOrderData(item.index)

			},
			getStatusClass(status) {

				return {
					'status-red': status == 1,
					'status-2': status == 2,
					'status-green': status == 3,
				};
			},

			// 取消
			cancelClick(option) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要取消该订单吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: (res => {
						if (res.confirm) {
							// 删除订单
							console.log(option.odNumber)
							uniCloud.callFunction({
								name: "nurse-order-del",
								data: {
									id: option.odNumber
								},
								success: (res) => {
									console.log(res)
									this.orderList = this.orderList.filter(item => item
										.odNumber !== option.odNumber);
								},
								fail: (err) => {
									console.error("请求失败: " + err);
								},
								complete: (res) => {
									console.log("请求完成");
								}
							});

						}
					})
				})
			},

			payClick(item) {

				console.log("item===支付====", item)

				let user_id = uni.getStorageSync('user_id');

				let obj = {
					totalFee: item.odPrice,
					userName: user_id,
					// serviceId: this.odNumber,
					serviceName: item.odName,
					orderId: item.odNumber
				};
				let params = encodeURIComponent(JSON.stringify(obj)); // 将对象转换为字符串并进行URL编码

				uni.navigateTo({
					url: '/pages/service/function/voucher_center_?params=' + params,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 评价
			evaluateClick(item) {

			},

		}
	};
</script>
<style scoped lang="scss">
	page {
		text-align: center;
		background-color: #F7F8FA;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-size: 18px;
	}

	.me-head {
		width: 100%;
		height: 80upx;
		padding-bottom: 20upx;

		.custom-tabs .u-tabs__item {
			font-size: 26px;
			/* 设置文字大小 */
		}
	}

	.me-center {
		flex: 1;
		overflow-y: auto;
		width: 100%;
		margin-top: 20upx;

		.pullScrollView {
			display: flex;
			flex-direction: column;
		}

		.list-tab {
			width: 93%;
			margin: 0 auto;

			.item-ul {
				margin-bottom: 20upx;
			}

			.item-ul li {
				background-color: #ffffff;
				border-radius: 15upx;
				box-shadow: 0 0upx 6upx 0upx rgba(0, 0, 150, .2);
			}

			.item-top {
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				font-size: 15px;

				.pay-type {
					font-weight: bold;
				}

				.status-red {
					color: #ff5500;
				}

				.status-2 {
					color: #4891d9;
				}

				.status-green {
					color: #00d500;
				}
			}

			.item-content {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10upx 20upx;
			}

			.item-right {
				flex: 1;
				margin-left: 20upx;

				.item-right-v1 {
					width: 100%;
					padding: 8rpx 0;

					.item-title {
						font-weight: bold;
						display: -webkit-box;
						font-size: 18px;
					}
				}

				.induce {
					display: flex;
					align-items: center;

					.rate-text1 {
						font-size: 17px;
					}

					.rate-text2 {
						margin-left: 20rpx;
						font-size: 17px;
						color: #B9B9B9;
					}
				}

				.item-right-v2 {
					padding: 8rpx 0;
					display: flex;
					justify-content: space-between;
					color: #a3a3a3;
					font-size: 17px;

					.v2-fh {
						color: #ff5500;
						font-size: 17px;
					}

					.v2-price {
						color: #ff5500;
						font-weight: bold;
						font-size: 17px;
					}
				}
			}

			.item-btom {
				display: flex;
				justify-content: flex-end;
				padding: 20rpx 10upx;
				font-size: 16px;
				;

				.item-btom-btn {
					padding: 6upx 40upx;
					border: 1px solid #d2d3d4;
					border-radius: 40upx;
					margin-right: 20upx;
					align-items: center;
				}

				.pay {
					background-color: #1cbbb4;
					border: 1px solid #1cbbb4;
					color: #ffffff;
				}
			}
		}
	}
</style>