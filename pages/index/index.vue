<template>

	<view class="content">
		<!-- <uni-nav-bar left-text="返回" right-text="设置" title="标题" /> -->
		<!-- <uni-nav-bar left-icon="left" height="120rpx" right-icon="cart" title="标题" /> -->
		<uni-nav-bar dark :fixed="true" shadow background-color="#1cbbb4" status-bar title="首页" @clickLeft="selectCity"
			left-text-style="font-size: 120rpx;" title-style="font-size: 120rpx;" />

		<view class="col-posi">
			<uni-row class="demo-uni-row">
				<uni-col :span="2">
					<view class="icon-item">
						<view class="position" @click="handleClick">
						<!-- 	<uni-icons @click="showDrawer('showRight')" customPrefix="customicons" type="location"
								color="#1CBBB4" :size="38" /> -->
						<uni-icons @click="pickCity" customPrefix="customicons" type="location"
							color="#1CBBB4" :size="38" />		
								
							<!-- <uni-drawer ref="showRight" mode="right" :mask-click="false"
								@change="change($event,'showRight')">
								<view class="scroll-view">
									<scroll-view class="scroll-view-box" scroll-y="true">
										<view class="my-info">
										</view>
										<view class="info">
											<text class="info-text">请选择您所在城市 ：</text>
										</view>
										<view class="container">

											<view class="info-content"  @click="chooseCity(item)" v-for="item in array" :key="item">
												<text class="info-content-text" >
													{{item.name}}</text>
											</view>
										</view>
										<view class="close">
											<button class="word-btn-white"
												@click="closeDrawer('showRight')"><text>关闭</text></button>
										</view>
									</scroll-view>
								</view>
							</uni-drawer> -->
						</view>
					</view>
				</uni-col>

				<uni-col :span="10">
					<!-- <view @click="showDrawer('showRight')" class="icon-item"> -->
					<view @click="pickCity" class="icon-item">
						<label class="readonly-label">{{ cityName || '城市' }}</label>

					</view>
				</uni-col>

				<uni-col :span="12">
					<view class="icon-item">
						<cc-headerSearch icon="../../static/scan_icon.png" @searchClick="searchClick"
							@rigIconClick="rigIconClick"></cc-headerSearch>
					</view>
				</uni-col>

			</uni-row>
		</view>

		<!-- 		<picker @change="bindPickerChange" :value="indexItem" :range="array">
			<label class="readonly-label">{{array[indexItem]}}</label>
		</picker>

		<picker v-if="isPickerVisible" @change="bindPickerChange" :value="indexItem" :range="array">
			<view class="uni-input">{{array[indexItem]}}</view>
		</picker> -->


		<!-- 
		<cc-headerSearch icon="../../static/scan_icon.png" @searchClick="searchClick"
			@rigIconClick="rigIconClick"></cc-headerSearch> -->

		<!-- icon: 右侧菜单图标 @searchClick：搜索点击  @rigIconClick：右侧菜单点击 -->


		<uni-grid class="grid" :column="4" :highlight="true" :showBorder="false" :square="true"
			custom-style="opacity:1">
			<uni-grid-item class="item" v-for="(item,indexItem) in serviceKinds"
				:class="{ active: activeIndex === indexItem }" @click.native="tapGrid(indexItem)" :key="indexItem">
				<uni-icons class="icon" color="#1cbbb4" :type=iconName[indexItem%4] size="34"></uni-icons>
				<text style="color:#1cbbb4;font-size: 18px;">{{item.name}}</text>
			</uni-grid-item>
		</uni-grid>
		<view class="tips">
			<view class="title" v-if="serviceKinds">{{serviceKinds[navIndex].name}}</view>
			<cc-waterListView :proList="projectList" @click="goProDetail"></cc-waterListView>
		</view>

		<tabbar index="0"></tabbar>
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
			if(!this.hasLocate) {
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
			
			if ( this.cityCode === null || this.cityCode === '') {
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
				// const cityIndex = address.indexOf("市");
				// if (cityIndex !== -1) {
				// this.cityName = address.substring(address.lastIndexOf("省") + 1, cityIndex + 1) || "城市";
				this.cityName = this.truncateAddress(address);
				// } else {
				// this.cityName = mylocation || "城市";
				// }
				console.log("this.cityName:", this.cityName)
				//console.log("serviceKinds[this.navIndex].name:", this.serviceKinds)
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
				    if(this.array[i].code === cityCode) {
						findCityCode = true;
						this.cityCode = this.array[i].code
						this.cityName = this.array[i].name
					}
				}
									
				if (!findCityCode) {
					// console.log("matchCityCode: navigateTo");
					// uni.navigateTo({
					// 	url: '/pages/index/front'
					// });
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
						  
						  // console.log("autoGetLocation  fail: navigateTo ")
						  // uni.navigateTo({
						  // 	url: '/pages/index/front'
						  // });
						  
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
							
							// this.hasLocate = true;
							// this.autoGetLocation();

							// uni.navigateTo({
							// 	url: '/pages/service/city/city'
							// });
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
							
							// console.log('checkLocationPermission: navigateTo');
							
							// uni.navigateTo({
							// 	url: '/pages/index/front'
							// });
						}
					},
					fail: (err) => {
						// console.log('checkLocationPermission fail: navigateTo');
						// uni.navigateTo({
						// 	url: '/pages/index/front'
						// });
						
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
						// this.serviceKinds = res.result.data
						
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
				this.activeIndex = index;
				this.navIndex = index;
				this.getServiceData();
				// uni.navigateTo({
				// 	url: `/pages/service/hushizhan/hushizhan?index=${index}`,
				// 	// url: `/pages/index/indexservice/indexservice?index=${index}`,
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });

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
		background-color: #f2f2f2;
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

	.position {
		margin-top: 8px;
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

	// 处理抽屉内容滚动
	.scroll-view-box {
		display: flex;
		flex-direction: column;
		/* justify-content: flex-start; */
		/* flex: 1;
		position: absolute; */
/* 		top: 0;
		right: 0;
		bottom: 0;
		left: 0; */
	}

	.my-info {

		padding: 20px;
		/* margin-top: 60px; */
		margin-bottom: 60px;	 
		
		/* 增加内边距 */
		margin: 10px 0;
		/* 增加上下边距 */
		background-color: #f9f9f9;
		/* 背景颜色 */
		border-radius: 8px;
		/* 圆角 */
		/* border: 1px solid #ddd; */
		/* 边框 */
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
		/* 阴影效果 */
	}

	.info {

		padding: 15px;
		/* margin-top: 60px; */
		margin-bottom: 60px;	 
		
		/* 增加内边距 */
		margin: 10px 0;
		/* 增加上下边距 */
		background-color: #f9f9f9;
		/* 背景颜色 */
		border-radius: 8px;
		/* 圆角 */
		border: 1px solid #ddd;
		/* 边框 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
	}

	.info-text {
		/* margin-top: 60px; */
		/* margin-bottom: 60px;	 */
		
		font-size: 18px;
		/* 字体大小 */
		font-weight: bold;
		/* 字体加粗 */
		color: #333;
		/* 字体颜色 */
		text-align: center;
		/* 文本居中对齐 */
		display: block;
		/* 确保文本占满块级空间 */
	}

	.container {
		padding: 10px;
		background-color: #f5f5f5;
		/* 背景颜色 */
		border-radius: 8px;
		/* 圆角 */
	}

	.info-content {
		display: flex;
		/* 使用 Flexbox 布局 */
		align-items: center;
		/* 垂直居中对齐 */
		justify-content: center;
		/* 水平居中对齐 */
		padding: 15px;
		/* 增加内边距 */
		margin: 10px 0;
		/* 上下边距 */
		background-color: #fff;
		/* 背景颜色 */
		border: 1px solid #ddd;
		/* 边框 */
		border-radius: 8px;
		/* 圆角 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
		cursor: pointer;
		/* 鼠标悬停时显示手形光标 */
		transition: background-color 0.3s, transform 0.3s;
		/* 过渡效果 */
	}

	.info-content:hover {
		background-color: #f0f0f0;
		/* 鼠标悬停时背景颜色变化 */
		transform: scale(1.02);
		/* 鼠标悬停时放大 */
	}

	.info-content-text {
		font-size: 16px;
		/* 字体大小 */
		color: #333;
		/* 字体颜色 */
		position: relative; /* 确保层叠上下文不会影响事件 */
		z-index: 1;
	}

	.city-item {
		font-size: 16px;
		/* 字体大小 */
		color: #333;
		/* 字体颜色 */
	}

	.city-item:hover {
		color: #007bff;
		/* 悬停时字体颜色 */
		cursor: pointer;
		/* 鼠标样式 */
	}

	.close {
		padding: 10px;
	}

	.word-btn-white {
		background-color: #1cbbb4;

	}
</style>