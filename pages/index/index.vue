<template>
	<view class="content">
		<uni-nav-bar dark :fixed="true" shadow background-color="#DBE9FA" status-bar title="首页" color="black"
			@clickLeft="selectCity" left-text-style="font-size: 120rpx;" title-style="font-size: 120rpx;" />

		<view class="col-posi">


			<div class="header" :index="12">
				<div class="wrapper">
					<text class="location-own" :index="1" @click="pickCity"> {{ cityName || '城市' }} </text>
					<image class="icon-down" :index="0" src="@/static/images/images-home/img_0.png" @click="pickCity" />
					<image class="vertical-line" :index="7" src="@/static/images/images-home/img_1.png" />
					<image class="icon-search" :index="8" src="@/static/images/images-home/img_2.png"
						@click="searchIcon" />
					<!-- <text class="info-my" :index="10">请输入要搜索的关键词 </text> -->
					<view class="info-search">
						<cc-headerSearch @searchClick="searchClick" @rigIconClick="rigIconClick"></cc-headerSearch>
					</view>
				</div>
				<div class="wrapper-1" :index="11">
					<text class="search" :index="9" @click="searchIcon">搜索 </text>
				</div>
			</div>
		</view>

		<view>
			<div v-for="index in Math.ceil(serviceKinds.length / 4)" :key="index" class="body">
				<div class="wrapper-2">
					<div v-if="serviceKinds.length > 0" class="group" @click.native="tapGrid((index) * 4)">
						<img class="action-bg" :index="6" src="@/static/images/images-home/img_3.png" />
						<text class="logo"> {{serviceKinds[(index) * 4].name}} </text>
						<div class="label-wrapper" :index="1"><text class="label" :index="0">立即查看 </text></div>
						<img class="picture" :index="1" src="@/static/images/images-home/img_5.png" />
					</div>
					<div v-if="serviceKinds.length > 1" class="group-1" @click.native="tapGrid((index) * 4 + 1)">
						<img class="button-bg" :index="5" src="@/static/images/images-home/img_6.png" />
						<text class="logo-1"> {{serviceKinds[(index) * 4 + 1].name}} </text>
						<div class="tag-wrapper" :index="1"><text class="tag" :index="0">立即查看 </text></div>
						<img class="image" :index="0" src="@/static/images/images-home/img_8.png" />
					</div>
				</div>
				<div class="wrapper-3">
					<div v-if="serviceKinds.length > 2" class="group-2" @click.native="tapGrid((index) * 4 + 2)">
						<img class="action-bg-1" :index="5" src="@/static/images/images-home/img_9.png" />
						<text class="logo-2"> {{serviceKinds[(index) * 4 + 2].name}} </text>
						<div class="tag-wrapper-1" :index="3"><text class="tag-1" :index="2">立即查看 </text></div>
						<img class="figure" :index="0" src="@/static/images/images-home/img_11.png" />
					</div>
					<div v-if="serviceKinds.length > 3" class="group-3" @click.native="tapGrid((index) * 4 + 3)">
						<img class="button-bg-1" :index="4" src="@/static/images/images-home/img_12.png" />
						<text class="logo-3"> {{serviceKinds[(index) * 4 + 3].name}} </text>
						<div class="word-wrapper" :index="2"><text class="word" :index="1">立即查看 </text></div>
						<img class="large-icon" :index="0" src="@/static/images/images-home/img_14.png" />
					</div>
				</div>
			</div>
		</view>

		<view class="tips">


			<div class="mod">
				<div v-if="true" class="body-2">
					<div class="wrapper-list" :index="4">
						<text v-if="true" class="title-list" :index="2">医护上门 </text>
						<div v-for="(item, mindex) in projectList" :key="mindex" class="group-item-0-list">
							<image class="entry-pic-list" :index="0" :src="(item.proImg)" />
							<div class="price-wrapper-list">
								<text class="item-title-list" :index="1">{{item.proName}} </text>
								<text class="price-list" :index="0">￥{{item.proPrice/100}} </text>
							</div>
							<div class="view-list" :index="1">
								<text v-if="true" class="detail-list" :index="0" @click="goProDetail(item)">查看详情
								</text>
							</div>
						</div>
					</div>
				</div>
			</div>
		</view>


		<!-- <tabbar index="0"></tabbar> -->
	</view>
</template>

<script>
	import CcHeaderSearch from '@/node_modules/cc-headerSearch/components/cc-headerSearch/cc-headerSearch.vue';
	import CcWaterListView from '@/node_modules/cc-waterListView/components/cc-waterListView/cc-waterListView.vue';
	import amap from '../../components/amap-wx.130.js';

	export default {
		components: {
			CcHeaderSearch,
			CcWaterListView,
		},
		data() {
			return {
				array: '', // ['沈阳市', '丹东市', '抚顺市', '鞍山市'],
				cityCode: '110100',
				indexItem: 0,
				// isPickerVisible: false, // 控制 picker 是否显示
				key: '6609bbd1a913ad2c3f5e2e604491790f', //22460069778e1b73885d69dd7aa23de6
				activeIndex: 0, // 保存当前被点击的索引
				cityName: '定位城市',
				pageTitle: '自定义导航栏',
				// 列表数组
				projectList: [],
				navIndex: 0,
				loading: 0, //0默认  1加载中  2没有更多了
				iconName: ["staff", "wallet", "map", "compose", ],
				serviceKinds: [],
				hasLocate: false,
			}
		},

		async onLoad(event) {
			try {
				await Promise.all([
					this.getCitylist(),
					this.checkLocationPermission(),
					this.getCid()
				]);

				// uni.navigateTo({
				//     url: '/pages/index/front'
				// });
			} catch (error) {
				console.error('Error during initialization:', error);
				// Handle error, possibly show a message to the user
			}
		},

		async onShow() {
			if (!this.hasLocate) {
				console.log("onShow ready to autoGetLoaction ...")
				this.autoGetLocation();
				this.hasLocate = true;
			}
			this.cityName = uni.getStorageSync('cityName');
			this.cityCode = uni.getStorageSync('cityCode');

			console.log("onShow getStorageSync:", this.cityName);
			console.log("onShow getStorageSync:", this.cityCode);



			this.navIndex = 0;
			this.getServiceKind()

			if (this.cityCode === null || this.cityCode === '') {
				console.log("onShow cityCode is null navigateTo /pages/index/front");

				uni.navigateTo({
					url: '/pages/index/front'
				});
			} else {
				console.log("onShow cityCode is not null ", this.cityCode);

			}
		},

		onNavigationBarButtonTap(e) {

		},

		methods: {

			searchIcon() {
				uni.navigateTo({
					url: './search'
				})
			},

			pickCity() {
				console.log("pickCity:");
				uni.navigateTo({
					url: '/pages/index/front'
				});
			},

			chooseCity(item) {
				console.log("choosecity:", item.name);
				console.log("cityCode:", item.code);
				this.cityName = item.name;
				this.cityCode = item.code;
				this.closeDrawer("showRight");

				this.getServiceKind()
			},

			// 打开窗口
			showDrawer(e) {
				console.log("showDrawer")

				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				console.log("closeDrawer")

				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},

			handleClick() {
				this.isPickerVisible = true; // 显示 picker
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value; // 更新选中的索引
				this.isPickerVisible = false; // 选择后隐藏 picker
			},

			showPosition() {
				let mylocation = uni.getStorageSync("location")
				const address = mylocation

				this.cityName = this.truncateAddress(address);

				console.log("this.cityName:", this.cityName)
			},

			truncateAddress(address) {
				if (address.length > 3) {
					// 截取前五个字符
					const firstFive = address.substring(0, 3);
					// 拼接省略号和截取后的字符串
					return firstFive + '...'; //+ address.substring(address.length - 3, address.length);
				} else {
					// 如果字符串长度小于或等于5，直接返回原字符串
					return address;
				}
			},

			matchCityCode(cityCode) {
				console.log("matchCityCode:", cityCode);
				var findCityCode = false;

				for (let i = 0; i < this.array.length; i++) {
					if (this.array[i].code === cityCode) {
						findCityCode = true;
						this.cityCode = this.array[i].code
						this.cityName = this.array[i].name
					}
				}

				if (!findCityCode) {

				} else {
					uni.setStorageSync("cityName", this.cityName);
					uni.setStorageSync("cityCode", this.cityCode);
				}
			},

			autoGetLocation() {

				console.log("autoGetLocation start...")

				this.amapPlugin = new amap.AMapWX({
					key: this.key
				});

				uni.showLoading({
					title: '获取位置信息中'
				});

				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(data)
						// const addressDesc = data[0].desc;
						//const address = data[0].name;
						const validCitycodes = ['021', '010', '022', '023']; // 注意 citycode 应该是字符串类型
						const citycode = data[0].regeocodeData.addressComponent.citycode;

						if (validCitycodes.includes(citycode)) {
							// citycode 在 validCitycodes 数组中
							const addressDesc = data[0].regeocodeData.addressComponent.province || '定位城市';
							uni.setStorageSync("location", addressDesc);
						} else {
							// citycode 不在 validCitycodes 数组中
							const addressDesc = data[0].regeocodeData.addressComponent.city || '定位城市';
							uni.setStorageSync("location", addressDesc);
						}
						var mycityCode = data[0].regeocodeData.addressComponent.adcode || '';

						let prefix = mycityCode.substring(0, 4);

						// 默认使用 '00' 补充后两位
						let suffix = '00';

						console.log("prefix: ", prefix);

						// 拼接前四位和后两位
						var cityCode = prefix + suffix;

						console.log("this.cityCode: ", cityCode)
						// uni.setStorageSync("cityCode", this.cityCode);

						this.matchCityCode(cityCode);
						uni.hideLoading();

						//this.showPosition();
					},
					fail: (err) => {

						console.log("autoGetLocation fail... : ", err)

						// 处理失败情况
						uni.showToast({
							title: '获取位置信息失败，请稍后重试',
							icon: 'none'
						});

						uni.hideLoading();
					}
				});

			},

			checkLocationPermission() {
				uni.getSetting({
					success: (res) => {
						// 检查是否授权了位置信息  
						if (res.authSetting['scope.userLocation']) {
							// 用户已授权  
							console.log('已授权定位权限');

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

			getCitylist() {

				uniCloud.callFunction({
					name: "nurse-open-city-list-get",
					data: {},
					success: (res) => {
						this.array = res.result.data
						console.log(" getCitylist  res.result.data:", this.array)
					},
					fail: (err) => {
						console.error("请求失败: " + err);
					},
					complete: (res) => {
						// console.log("请求完成");
					}
				});

			},

			selectCity() {
				// 处理城市选择逻辑
				console.log('选择城市');
				return;
				uni.navigateTo({
					url: '/pages/service/city/city'
				});
			},

			getServiceKind() {
				uniCloud.callFunction({
					name: "nurse-service-categories-get",
					data: {},
					success: (res) => {
						this.serviceKinds = [];
						res.result.data.forEach(item => {
							if ((item?.is_index_show ?? false) === true) {
								this.serviceKinds.push(item);
							}
						});

						this.serviceKinds.sort((a, b) => a.sort - b.sort);
						this.getServiceData();
						console.log("serviceKinds[this.navIndex].name:", this.serviceKinds[this.navIndex].name)
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
				console.log("this.serviceKinds[this.navIndex]._id:" + this.serviceKinds[this.navIndex]._id)
				uniCloud.callFunction({
					name: "nurse-service-get",
					data: {
						category_id: category,
						cityCode: this.cityCode
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
				console.log(item.id)
				// return;
				uni.navigateTo({
					url: `/pages/service/servicedetails/servicedetails?item=${item.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			tapGrid(index) {
				console.log("tapGrid index:" + index)
				this.activeIndex = index;
				this.navIndex = index;
				this.getServiceData();
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
		/* background-color: green; */
		background-color: #f7f8fa;
	}

	/* 修改 uni-nav-bar 的字体大小 */
	uni-nav-bar {
		font-size: 20px;
		/* 你可以根据需要调整字体大小 */
	}

	.custom-nav-bar .uni-nav-bar-title {
		font-size: 20px;
	}

	.custom-nav-bar .uni-nav-bar-left-text {
		font-size: 20px;
	}

	.content {
		display: flex;
		flex-direction: column;

	}

	.grid {
		/* margin-top: 1px; */
		background-color: #FFFFFF;
		margin-bottom: 6px;
	}

	.uni-grid .text {
		font-size: 20px;
		height: 25px;
		line-height: 25px;
		color: #817f82;
	}

	.uni-grid-item {
		transition: background-color 0.3s;
	}

	.uni-grid-item:active {
		background-color: #f0f0f0;
	}

	.uni-grid .item ::v-deep .uni-grid-item__box {
		justify-content: center;
		align-items: center;
	}

	.title {
		text-align: center;
		/* 居中文本 */
		color: #1cbbb4;
		/* 蓝色文字，可以根据需求调整 */
		font-family: 'Arial', sans-serif;
		/* 使用 Arial 字体 */
		font-size: 20px;
		/* 字体大小 */
		font-weight: bold;
		/* 粗体字 */
		padding: 1px;
		/* 内边距 */
		margin: 2px;
		/* 外边距 */
		/* border-bottom: 2px solid #007bff; */
		/* 下边框颜色与文字颜色相同 */
		border-radius: 0px;
		/* 圆角边框 */
		background-color: #f0f8ff;
		/* 背景色 */
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
		/* 轻微阴影效果 */
	}

	.tips {
		font-size: 20px;
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

	.demo-uni-row {
		background-color: white;
		top: 5px;
		/* margin-bottom: 10px; */
		height: 24px;
		// 组件在小程序端display为inline
		// QQ、字节小程序文档写有 :host，但实测不生效
		// 百度小程序没有 :host
		/* #ifdef MP-TOUTIAO || MP-QQ || MP-BAIDU */
		display: block;
		/* #endif */
	}

	// 支付宝小程序没有 demo-uni-row 层级
	// 微信小程序使用了虚拟化节点，没有 demo-uni-row 层级
	/* #ifdef MP-ALIPAY || MP-WEIXIN */
	::v-deep .uni-row {
		/* margin-bottom: 10px; */
	}

	/* #endif */

	.icon-item {
		/* padding: 20px 0% 0px 0%; */

		background-color: white;
		height: 130upx;
		/* 设置固定高度 */
		display: flex;
		align-items: center;
		/* 垂直居中对齐内容 */
		/* background-color: green; */
	}

	.demo-uni-col {
		height: 36px;
		border-radius: 5px;
	}

	.dark_deep {
		background-color: #99a9bf;
	}

	.dark {
		background-color: #d3dce6;
	}

	.light {
		background-color: #e5e9f2;
	}

	.readonly-label {
		display: block;
		padding: 7px;
		/* 根据需求调整内边距 */
		/* border: 1px solid #ccc; */
		/* 添加边框，模拟输入框的外观 */
		border-radius: 14px;
		/* 添加圆角样式*/
		background-color: #F5F5F5;
		/* 背景色设置为淡灰色，显示为只读状态 */
		color: #333;
		/* 文本颜色 */
		font-size: 18px;
		/* 字体大小 */
		width: 90%;
		/* 确保宽度填满父容器 */
		box-sizing: border-box;
		/* 包括内边距和边框在内 */
		margin-top: 8px;
		height: 70upx;
	}


	.col-posi {
		background-color: white;
	}

	.header {
		margin-top: 26rpx;
		margin-left: 26rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-self: flex-start;
		width: 93%;
		height: 93rpx;
		padding: 20rpx 12rpx;
		background-image: url(@/static/images/images-home/img_15.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.location-own {
		align-self: center;
		margin-top: 1rpx;
		font-family: 'MiSans-Medium';
		font-size: 26rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 29rpx;
		color: rgba(0, 0, 0, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.72rpx;
		white-space: nowrap;
		margin-left: 5rpx;
	}

	.icon-down {
		align-self: center;
		width: 16rpx;
		height: 11rpx;
		margin-left: 10rpx;
	}

	.vertical-line {
		align-self: center;
		width: 4rpx;
		height: 33rpx;
		margin-left: 27rpx;
	}

	.icon-search {
		margin-top: 10rpx;
		align-self: center;
		width: 32rpx;
		height: 30rpx;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}

	.info-search {
		margin-top: -92rpx;
		/* align-self: center; */
		width: 340rpx;
		height: 27rpx;
		margin-left: 200rpx;
		/* background-color: white; */
		/* height: 130upx; */
		/* display: flex; */
		/* align-items: center; */
		background-color: black;
		opacity: 0.5;
	}

	.info-my {
		align-self: center;
		margin: 1rpx 0 0 19rpx;
		font-family: 'MiSans-Normal';
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 29rpx;
		color: rgba(102, 102, 102, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.72rpx;
		white-space: nowrap;
	}

	.wrapper-1 {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-self: center;
		width: 93rpx;
		height: 53rpx;
		padding: 13rpx 12rpx 12rpx;
		margin-right: 8rpx;
		/* background-image: url(@/static/images/images-home/img_16.png); */
		background-color: #4179FF;
		border-radius: 20rpx;
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
		
	}

	.search {
		align-self: flex-start;
		overflow: hidden;
		max-width: 67rpx;
		margin-left: 1rpx;
		font-family: 'MiSans-Medium';
		font-size: 24rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 29rpx;
		color: rgba(255, 255, 255, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.72rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.position {
		margin-top: 8px;
	}

	.body {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-self: flex-start;
		width: 96%;
		padding-top: 27rpx;
		box-sizing: border-box;
		margin-left: 26rpx;
	}

	.wrapper-2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-self: flex-start;
		width: 693rpx;
		box-sizing: border-box;
	}

	.group {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: center;
		height: 163rpx;
		box-sizing: border-box;
	}

	.action-bg {
		align-self: flex-start;
		width: 333rpx;
		height: 163rpx;
	}

	.logo {
		position: absolute;
		left: 34rpx;
		top: 38rpx;
		width: 135rpx;
		height: 32rpx;
		color: #FFF;
	}

	.label-wrapper {
		position: absolute;
		display: flex;
		left: 30rpx;
		bottom: 28rpx;
		flex-direction: row;
		justify-content: center;
		width: 129rpx;
		height: 47rpx;
		padding: 13rpx 12rpx 10rpx;
		background-image: url(@/static/images/images-home/img_17.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.label {
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

	.picture {
		position: absolute;
		right: 12rpx;
		bottom: 1rpx;
		width: 95rpx;
		height: 89rpx;
	}

	.group-1 {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: center;
		height: 163rpx;
		box-sizing: border-box;
	}

	.button-bg {
		align-self: flex-start;
		width: 333rpx;
		height: 163rpx;
	}

	.logo-1 {
		position: absolute;
		left: 33rpx;
		top: 38rpx;
		width: 137rpx;
		height: 31rpx;
		color: #FFF;
	}

	.tag-wrapper {
		position: absolute;
		display: flex;
		left: 30rpx;
		bottom: 28rpx;
		flex-direction: row;
		justify-content: center;
		width: 129rpx;
		height: 47rpx;
		padding: 13rpx 12rpx 10rpx;
		background-image: url(@/static/images/images-home/img_18.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

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

	.image {
		position: absolute;
		right: 15rpx;
		bottom: 12rpx;
		width: 87rpx;
		height: 86rpx;
	}

	.wrapper-3 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-self: flex-start;
		width: 693rpx;
		margin-top: 27rpx;
		box-sizing: border-box;
	}

	.group-2 {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-self: center;
		height: 173rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}

	.action-bg-1 {
		align-self: flex-start;
		width: 333rpx;
		height: 163rpx;
	}

	.logo-2 {
		position: absolute;
		left: 33rpx;
		top: 38rpx;
		width: 137rpx;
		height: 32rpx;
		color: #FFF;
	}

	.tag-wrapper-1 {
		position: absolute;
		display: flex;
		left: 30rpx;
		bottom: 38rpx;
		flex-direction: row;
		justify-content: center;
		width: 129rpx;
		height: 47rpx;
		padding: 13rpx 12rpx 10rpx;
		background-image: url(@/static/images/images-home/img_19.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.tag-1 {
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

	.figure {
		position: absolute;
		right: 3rpx;
		bottom: 0;
		width: 108rpx;
		height: 108rpx;
	}

	.group-3 {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-self: center;
		height: 173rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}

	.button-bg-1 {
		align-self: flex-start;
		width: 333rpx;
		height: 163rpx;
	}

	.logo-3 {
		position: absolute;
		left: 33rpx;
		top: 38rpx;
		width: 137rpx;
		height: 32rpx;
		color: #FFF;
	}

	.word-wrapper {
		position: absolute;
		display: flex;
		left: 30rpx;
		bottom: 38rpx;
		flex-direction: row;
		justify-content: center;
		width: 129rpx;
		height: 47rpx;
		padding: 13rpx 12rpx 10rpx;
		background-image: url(@/static/images/images-home/img_20.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.word {
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

	.large-icon {
		position: absolute;
		right: 22rpx;
		bottom: 20rpx;
		width: 78rpx;
		height: 92rpx;
	}


	/* // list */

	.mod {
		margin-top: -50rpx;
		position: absolute;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 750rpx;
		height: 1126rpx;
		padding: 0 12rpx;
		/*小人图片*/
		background-image: url(data:image/png;base64,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);
		background-size: 351rpx 313rpx;
		background-repeat: no-repeat;
		background-position: 352rpx 74rpx;
		box-sizing: border-box;
		background-origin: padding-box;
	}

	.body-2 {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: center;
		width: 694rpx;
		margin-top: 66rpx;
		box-sizing: border-box;
	}

	.wrapper-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-self: flex-start;
		width: 693rpx;
		/* height: 1039rpx; */
		padding: 33rpx 12rpx 22rpx;
		margin-left: 1rpx;

		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: 0 0;
		box-sizing: border-box;
		background-origin: padding-box;
		/*矩形蓝色图片*/
		background-image: url(data:image/png;base64,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);
		
	}

	.title-list {
		align-self: flex-start;
		/* overflow: hidden;	 */
		max-width: 593rpx;
		margin-left: 38rpx;
		font-family: 'PangMenZhengDaoBiaoTiTiMianFeiBan-4';
		font-size: 46rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 55rpx;
		color: rgba(27, 104, 236, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.group-item-0-list {
		/* top: 50rpx; */
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: center;
		width: 653rpx;
		height: 183rpx;
		padding: 22rpx 12rpx 21rpx;
		margin-top: 27rpx;
		background-image: url(@/static/images/images-list/img_6.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.entry-pic-list {
		align-self: center;
		width: 231rpx;
		height: 140rpx;
		margin-left: 10rpx;
	}

	.price-wrapper-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-self: center;
		width: 241rpx;
		height: 140rpx;
		padding: 29rpx 0 27.5rpx;
		box-sizing: border-box;
	}

	.item-title-list {
		align-self: flex-start;
		overflow: hidden;
		max-width: 241rpx;
		font-family: 'MiSans-Medium';
		font-size: 32rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 32rpx;
		color: rgba(0, 0, 0, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.84rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 43rpx;
	}

	.price-list {
		align-self: flex-start;
		overflow: hidden;
		max-width: 241rpx;
		margin-top: 20rpx;
		font-family: 'MiSans-Bold';
		font-size: 42rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 34rpx;
		color: rgba(0, 101, 231, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 1.02rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-left: 40rpx;
	}

	.view-list {
		position: absolute;
		display: flex;
		right: 0;
		bottom: 0;
		flex-direction: row;
		justify-content: center;
		width: 147rpx;
		height: 63rpx;
		padding: 21rpx 12rpx 18rpx;
		background-image: url(@/static/images/images-list/img_7.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.detail-list {
		align-self: flex-start;
		overflow: hidden;
		max-width: 121rpx;
		margin-left: 1rpx;
		font-family: 'MiSans-Normal';
		font-size: 22rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 26rpx;
		color: rgba(37, 97, 214, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.66rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.group-item-1-list {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: center;
		width: 653rpx;
		height: 183rpx;
		padding: 22rpx 12rpx 21rpx;
		margin-top: 17rpx;
		background-image: url(@/static/images/images-list/img_8.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.item-title-1-list {
		position: absolute;
		left: 253rpx;
		top: 51rpx;
		z-index: 1;
		font-family: 'MiSans-Medium';
		font-size: 28rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 28rpx;
		color: rgba(0, 0, 0, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.84rpx;
		white-space: nowrap;
	}

	.price-1-list {
		position: absolute;
		right: 244rpx;
		bottom: 48.5rpx;
		z-index: 2;
		font-family: 'MiSans-Bold';
		font-size: 34rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 34rpx;
		color: rgba(0, 101, 231, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 1.02rpx;
		white-space: nowrap;
	}

	.entry-pic-1-list {
		align-self: flex-start;
		z-index: 3;
		width: 249rpx;
		height: 140rpx;
		margin-left: 10rpx;
	}

	.view-1-list {
		position: absolute;
		display: flex;
		right: 0;
		bottom: 0;
		flex-direction: row;
		justify-content: center;
		width: 147rpx;
		height: 63rpx;
		padding: 21rpx 12rpx 18rpx;
		background-image: url(@/static/images/images-list/img_9.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		background-repeat: no-repeat;
		background-position: 0 0;
		background-origin: padding-box;
	}

	.detail-1-list {
		align-self: flex-start;
		overflow: hidden;
		max-width: 121rpx;
		margin-left: 1rpx;
		font-family: 'MiSans-Normal';
		font-size: 22rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 26rpx;
		color: rgba(37, 97, 214, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.66rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	example-body {
		padding: 10px;
	}

	.scroll-view {
		/* #ifndef APP-NVUE */
		width: 100%;
		height: 100%;
		/* #endif */
		flex: 1
	}

</style>