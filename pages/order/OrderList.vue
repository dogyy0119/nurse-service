<template>
	<view class="content">
		<view class="me-head">
			<u-sticky bgColor="#fff">
			   <u-tabs :list="allList" lineColor="#07BCAD"
					:activeStyle="{color: '#07BCAD',fontWeight: 'bold',transform: 'scale(1.05)'}" @click="tabClick"></u-tabs>
			  </u-sticky>
		</view>
		<view class="me-center">
			<view class="list-tab">
				<ul class="item-ul" v-for="(item, index) in orderList" :key="index">
					<li v-if="item.odStatus == tabsIndex || tabsIndex == 0">
						<view  class="item-top">
							<view>
								<text>订单编号：</text>
								<text>{{item.odNumber}}</text>
							</view>
							<view class="pay-type" :class="getStatusClass(item.odStatus)">
								<text>{{allList[item.odStatus].name}}</text>
							</view>
						</view>
						<u-line dashed></u-line>
						<view class="item-content">
							<view  class="item-left">
								<u-image :src="item.picUrl" :fade="true" radius="5"
									width="70" height="70" duration="450"></u-image>
							</view>
							<view class="item-right"  @click="goDetail(item)">
								<view class="item-right-v1">
									<text class="item-title">{{item.odName}}</text>
								</view>
								<view class="item-right-v1 induce">
									<text class="rate-text1">订单地址：{{item.odAddress}}</text>
								</view>
								<view class="item-right-v1 induce">
									<text class="rate-text1">下单时间：{{item.odTime}}</text>
								</view>
								<view class="item-right-v2">
									<view class="v2-fh">￥<text class="v2-price">{{item.odPrice}}</text></view>
								</view>
							</view>
						</view>
						
						<u-line dashed></u-line>
						<view class="item-btom" v-if="item.odStatus == 1">
							<view @click="cancelClick(item)">
								<view class="item-btom-btn">取消</view>
							</view>
							<view  @click="payClick(item)">
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
	</view>
</template>
<script>
	export default {
		data() {
			return {
				tabsIndex: 0,
				allList: [
					{tabId: 0,name: '全部'},
					{tabId: 1,name: '待支付'},
					{tabId: 2,name: '已支付'},
					{tabId: 3,name: '已完成'},
					{tabId: 4,name: '已取消'},
					{tabId: 5,name: '售后'},
				],
				orderList: [
					{
						picUrl: '/static/logo.png',
						odNumber: '2023070611124267',
						odName: '名称1',
						odPrice: '236',
						odAddress: '订单地址',
						odTime: '2023-06-23',
						odStatus: 1,
					},
					{
						picUrl: '/static/logo.png',
						odNumber: '2023070611124268',
						odName: '名称2',
						odPrice: '135',
						odAddress: '订单地址',
						odTime: '2023-06-23',
						odStatus: 3,
					}
				],

			}
		},
		onLoad() {
			
		},

		methods: {
			tabClick(item){
				this.tabsIndex = item.index
			},
			getStatusClass(status) {
			    return {
			        'status-red': status == 1,
					'status-2': status == 2,
			        'status-green': status == 3,
			    };
			},
				
			// 取消
			cancelClick(item){
				uni.showModal({
					title: '温馨提示',
					content: '确定要取消该订单吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: (res=> {
						if (res.confirm) {
							
						}
					})
				})
			},
			
			payClick(item){
				console.log("item===支付====",item)
			},
			evaluateClick(item){
				uni.navigateTo({
					url: '../order/OrderEvaluate?detailDate=' + encodeURIComponent(JSON.stringify(item))
				});
			},
			
		}
	};
</script>
<style scoped lang="scss">
	page {
		text-align: center;
		background-color: #F7F8FA;
	}
	
	.content{
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.me-head{
		width: 100%;
		height: 80upx;
		padding-bottom: 20upx;
	}
	
	.me-center{
		flex: 1;
		overflow-y: auto;
		width: 100%;
		margin-top: 20upx;
		
		.pullScrollView {
			display: flex;
			flex-direction: column;
		}
		
		.list-tab{
			width: 93%;
			margin: 0 auto;

			.item-ul{
				margin-bottom: 20upx;
			}
			.item-ul li{
				background-color: #ffffff;
				border-radius: 15upx;
				box-shadow: 0 0upx 6upx 0upx rgba(0, 0, 150, .2);
			}
			
			.item-top{
				display: flex;
				justify-content: space-between;
				padding: 20rpx;
				font-size: 28rpx;
				
				.pay-type{
					font-weight: bold;
				}
				.status-red{
					color: #ff5500;
				}
				.status-2{
					color: #4891d9;
				}
				.status-green{
					color: #00d500;
				}
			}
			.item-content{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10upx 20upx;
			}
			
			.item-right{
				flex: 1;
				margin-left: 20upx;
				
				.item-right-v1{
					width: 100%;
					padding: 8rpx 0;

					.item-title{
						font-weight: bold;
						display: -webkit-box;
					}
				}
				
				.induce{
					display: flex;
					align-items: center;
					
					.rate-text1{
						font-size: 26rpx;
					}
					.rate-text2{
						margin-left: 20rpx;
						font-size: 26rpx;
						color: #B9B9B9;
					}
				}
		
				.item-right-v2{
					padding: 8rpx 0;
					display: flex;
					justify-content: space-between;
					color: #a3a3a3;
					font-size: 26upx;
					
					.v2-fh{
						color: #ff5500;
						font-size: 22upx;
					}
					.v2-price{
						color: #ff5500;
						font-weight: bold;
						font-size: 32upx;
					}
				}
			}	
			
			.item-btom{
				display: flex;
				justify-content: flex-end;
				padding: 20rpx 10upx;
				font-size: 28upx;
				
				.item-btom-btn{
					padding: 6upx 40upx ;
					border: 1px solid #d2d3d4;
					border-radius: 40upx;
					margin-right: 20upx;
					align-items: center;
				}
				.pay{
					background-color: #07BCAD;
					border: 1px solid #07BCAD;
					color: #ffffff;
				}
			}
		}
	}
</style>
