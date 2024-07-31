<template>

	<view class="content">
		<!-- <uni-nav-bar left-text="返回" right-text="设置" title="标题" /> -->
		<!-- <uni-nav-bar left-icon="left" height="120rpx" right-icon="cart" title="标题" /> -->
		<uni-nav-bar dark :fixed="true" shadow background-color="#1cbbb4" status-bar left-icon="location"
			:left-text="cityName" title="首页" @clickLeft="selectCity" />

		<!-- 	<uni-icons name="heart"></uni-icons> -->

		<!-- icon: 右侧菜单图标 @searchClick：搜索点击  @rigIconClick：右侧菜单点击 -->
		<cc-headerSearch icon="../../static/scan_icon.png" @searchClick="searchClick"
			@rigIconClick="rigIconClick"></cc-headerSearch>

		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in serviceKinds" @click.native="tapGrid(index)"
				:key="index">
				<uni-icons class="icon" color="#1cbbb4" :type=iconName[index%4] size="34"></uni-icons>
				<text style="color:#1cbbb4;font-size: 22rpx;">{{item.name}}</text>
			</uni-grid-item>
		</uni-grid>

		<view class="tips">
			<!-- <view>{{gridList[this.navIndex].text}}</view> -->
			<cc-waterListView :proList="projectList" @click="goProDetail"></cc-waterListView>
		</view>

		<tabbar index="0"></tabbar>

	</view>
</template>

<script>
	import CcHeaderSearch from '@/node_modules/cc-headerSearch/components/cc-headerSearch/cc-headerSearch.vue';
	import CcWaterListView from '@/node_modules/cc-waterListView/components/cc-waterListView/cc-waterListView.vue';

	export default {
		components: {
			CcHeaderSearch,
			CcWaterListView
		},
		data() {
			return {
				cityName: '城市',
				pageTitle: '自定义导航栏',
				// 列表数组
				projectList: [],
				navIndex: 0,
				loading: 0, //0默认  1加载中  2没有更多了
				iconName: ["staff", "wallet", "map", "compose", ],
				serviceKinds: [],
				// gridList: [{
				// 		"text": "推荐服务",
				// 		"icon": "staff",
				// 		"index": "6646b0b49755e32830aab169"
				// 	},
				// 	{
				// 		"text": "专业护理",
				// 		"icon": "wallet",
				// 		"index": "6646b41699c6244dcf963a53"
				// 	},
				// 	{
				// 		"text": "尊享套餐",
				// 		"icon": "map",
				// 		"index": "6646b8cc9755e32830ac1290"
				// 	},
				// 	{
				// 		"text": "母婴护理",
				// 		"icon": "compose",
				// 		"index": "6646ba84466d41f58522bb33"
				// 	},
				// 	{
				// 		"text": "陪诊服务",
				// 		"icon": "staff",
				// 		"index": "6646bc558b0da4a4e41e78be"
				// 	},
				// 	{
				// 		"text": "居家康复",
				// 		"icon": "wallet",
				// 		"index": "6646bbae21821b6d2bf66d62"
				// 	},
				// 	{
				// 		"text": "医美拆线",
				// 		"icon": "map",
				// 		"index": "6646bc830d2b315faffe729a"
				// 	},
				// 	{
				// 		"text": "居家照护",
				// 		"icon": "compose",
				// 		"index": "6646bc24b9fb2360b007f42a"
				// 	},
				// ],
			}
		},

		onLoad(event) {
			this.getCid()
			//this.checkLocationPermission()
			this.getServiceKind()
		},

		onShow() {
			this.navIndex = 0;
			let mylocation = uni.getStorageSync("location")
			const address = mylocation
			const cityIndex = address.indexOf("市");
			if (cityIndex !== -1) {
				this.cityName = address.substring(address.lastIndexOf("省") + 1, cityIndex + 1) || "城市";
			} else {
				this.cityName = mylocation || "城市";
			}
		},

		onNavigationBarButtonTap(e) {

		},

		methods: {
			checkLocationPermission() {
				uni.getSetting({
					success: (res) => {
						// 检查是否授权了位置信息  
						if (res.authSetting['scope.userLocation']) {
							// 用户已授权  
							console.log('已授权定位权限');
							// 在这里可以调用需要定位权限的 API，如 uni.getLocation  
						} else {
							// 用户未授权  
							console.log('未授权定位权限');
							// 你可以在这里调用 uni.openSetting 来引导用户去设置页面授权  
							uni.showModal({
								title: '提示',
								content: '需要您授权定位信息才能正常使用功能，请前往设置页面授权',
								showCancel: false,
								success: (modalRes) => {
									if (modalRes.confirm) {
										uni.openSetting({
											success: function(res) {
												console.log('设置页面已打开');
											},
											fail: function(err) {
												console.error('打开设置页面失败', err);
											}
										});
									}
								}
							});
						}
					},
					fail: (err) => {
						console.error('获取设置失败', err);
						this.shouldHidePositionButton = false;
					}
				});
			},

			getCid() {

				uni.getPushClientId({
					success: (res) => {
						let push_clientid = res.cid
						console.log('客户端推送标识:', push_clientid)
						uni.setStorageSync("push_client_id", push_clientid)
					},
					fail(err) {
						console.log(err)
					}
				})

			},

			selectCity() {
				// 处理城市选择逻辑
				console.log('选择城市');
				uni.navigateTo({
					url: '/pages/service/city/city'
				});
			},

			getServiceKind() {
				uniCloud.callFunction({
					name: "nurse-service-categories-get",
					data: {},
					success: (res) => {
						this.serviceKinds = res.result.data
						this.serviceKinds.sort((a, b) => a.sort - b.sort);
						this.getServiceData();
					},
					fail: (err) => {
						console.error("请求失败: " + err);
					},
					complete: (res) => {
						// console.log("请求完成");
					}
				});
			},

			getServiceData() {
				uni.showLoading({
					mask: true
				})

				// let category = this.gridList[this.navIndex].index
				let category = this.serviceKinds[this.navIndex]._id
				uniCloud.callFunction({
					name: "nurse-service-get",
					data: {
						category_id: category
					},
					success: (res) => {
						this.loading = 2

						// this.newsArr = res.result.data
						this.projectList = [];
						res.result.data.forEach(item => {
							if (item.is_on_sale == true) {
								this.projectList.push({
									'proImg': item.service_thumb,
									'proName': item.name,
									'proDetail': item.service_desc,
									'proPrice': item.price,
									// 'status': item.consumable == 1? "可退款":"不可退款",
									'id': item._id
								});
							}
						});

						// this.newsArr=[...this.newsArr,...res.result.data]
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
						// console.log("请求完成");
					}
				});


			},
			// 列表条目点击事件
			goProDetail(item) {
				// console.log(item.id)
				// return;
				uni.navigateTo({
					url: `/pages/service/servicedetails/servicedetails?item=${item.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			tapGrid(index) {
				this.navIndex = index
				uni.navigateTo({
					url: `/pages/service/hushizhan/hushizhan?index=${index}`,
					// url: `/pages/index/indexservice/indexservice?index=${index}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});

			},
			requestData() {

				// 模拟请求参数设置
				let reqData = {

					'area': '',
					"pageSize": 10,
					"pageNo": this.curPageNum
				}
				// 模拟请求接口
				this.totalNum = 39;
				this.projectList = [];

			},

			searchClick: function() {
				console.log("点击了搜索框");

				uni.navigateTo({
					url: './search'
				})

			},
			rigIconClick() {
				console.log("点击了右侧图标");
				uni.showModal({
					title: '温馨提示',
					content: '点击了右侧扫一扫'
				})
			}

		}
	}
</script>

<style>
	page {

		background-color: #f2f2f2;
	}

	.content {
		display: flex;
		flex-direction: column;

	}

	.grid {
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 16px;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}

	.tips {
		font-size: 32rpx;
		/* 设置文字大小 */
		color: #40C6C0;
		/* 设置文字颜色 */
		font-weight: bold;
		/* 设置文字加粗 */
		text-align: center;
		/* 设置文字居中 */
		text-transform: uppercase;
		/* 将文字转换为大写 */
		/* 添加其他样式属性以满足您的需求 */
	}
</style>