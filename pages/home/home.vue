<template>
	<view>
		<!-- banner --> 
<!-- 		<unicloud-db ref="bannerdb" v-slot:default="{data, loading, error, options}" collection="opendb-banner"
			field="_id,bannerfile,open_url,title" @load="onqueryload">
			
			<image v-if="!(loading||data.length)" class="banner-image" src="/static/grid/empty.png" mode="aspectFill"
				:draggable="false" />
			<uni-swiper-dot v-else class="uni-swiper-dot-box" @clickItem="clickItem" :info="data" :current="current"
				field="content">
				<swiper class="swiper-box" @change="changeSwiper" :current="swiperDotIndex">
					<swiper-item v-for="(item, index) in data" :key="item._id">
						<view class="swiper-item" @click="clickBannerItem(item)">
							<image class="banner-image" :src="item.bannerfile.url" mode="aspectFill"
								:draggable="false" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</unicloud-db> -->
		
		<!-- 搜索功能 -->
		<view class="uni-search-box">
			<uni-search-bar v-model="keyword" ref="searchBar" radius="100" cancelButton="none" disabled
				:placeholder="inputPlaceholder" />
			<view class="cover-search-bar" @click="searchClick"></view>
		</view>
		
		<!-- 导航菜单 -->
		
		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index)" :key="index">
				<uni-icons class="icon" color="#1cbbb4" :type="item.icon" size="34"></uni-icons>
				<text style="color:#1cbbb4;font-size: 22rpx;">{{item.text}}</text>
			</uni-grid-item>
		</uni-grid>
		
		<view class="tips">
			<view>{{gridList[this.navIndex].text}}</view>
			</view>
		<view class="content" >
			<div class="row" v-for="item in newsArr" :key="item._id">
				<newsbox :item="item" @click.native="goDetail(item)"></newsbox>
			</div>
		</view>
		
		<view class="nodata" v-if="!newsArr.length">
			<image src="../../static/images/nodata.png" mode="widthFix"></image>
		</view>
		
		<view class="loading" v-if="newsArr.length">			
			<view v-if="loading==1">数据加载中...</view>
			<view v-if="loading==2">没有更多了~~</view>
		</view>
		
		<tabbar index="0"></tabbar>
	</view>
</template>

<script>
	let cdbRef;
	import {
		mapGetters,
	} from 'vuex';
	import Gps from '@/uni_modules/json-gps/js_sdk/gps.js';
	const gps = new Gps(),
		db = uniCloud.database();
	export default {
		data() {
			return {
				navIndex: 0,
				newsArr:[],
				currentPage:1,
				currentId:50,
				loading:0       ,//0默认  1加载中  2没有更多了
				
				current: 0,
				swiperDotIndex: 0,
				where: '"article_status" == 1',
				keyword: "",
				showRefresh: false,
				listHight: 0,
				gridList: [{
						"text": "推荐服务",
						"icon": "staff"
					},
					{
						"text": "专业护理",
						"icon": "wallet"
					},
					{
						"text": "尊享套餐",
						"icon": "map"
					},
					{
						"text": "母婴护理",
						"icon": "compose"
					},
					{
						"text": "陪诊服务",
						"icon": "staff"
					},
					{
						"text": "居家康复",
						"icon": "wallet"
					},
					{
						"text": "医美拆线",
						"icon": "map"
					},
					{
						"text": "居家照护",
						"icon": "compose"
					},
				],
			}
		},
		computed: {
			inputPlaceholder(e) {
				if (uni.getStorageSync('CURRENT_LANG') == "en") {
					return 'Please enter the search content'
				} else {
					return '请输入搜索内容'
				}
			},
			...mapGetters({
				hasLogin: 'user/hasLogin'
			}),
			
			colList() {
				return [
					db.collection('opendb-news-articles').where(this.where).field(
						'avatar,title,excerpt,last_modify_date,user_id').getTemp(),
					db.collection('uni-id-users').field('_id,username').getTemp()
				]
			}
		},
		async onReady() {
			// #ifdef APP-NVUE
			/* 可用窗口高度 - 搜索框高 - 状态栏高 */
			this.listHight = uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - 50 +
				'px';
			// #endif
			// #ifndef APP-NVUE
			this.listHight = 'auto'
			// #endif
			cdbRef = this.$refs.udb
		},
		async onShow() {
			this.keyword = getApp().globalData.searchText
			getApp().globalData.searchText = ''
			//这里仅演示如何，在onShow生命周期获取设备位置，并在设备或者应用没有权限时自动引导。设置完毕自动重新获取。
			//你可以基于他做自己的业务，比如：根据距离由近到远排序列表数据等
			// uni.showLoading({
			// 	title:"获取定位中"
			// });
			//默认h5端不获取定位
			// #ifndef H5
			let location = await gps.getLocation({
				geocode: true
			})
			console.log(location);
			// #endif
			// if(location){
			// 	uni.showToast({
			// 		title: JSON.stringify(location),
			// 		icon: 'none'
			// 	});
			// }
			// uni.hideLoading()
			this.getNewsData();
		},
		// #ifndef APP-NVUE
		onPullDownRefresh() {
			this.refresh()
		},
		onReachBottom() {
			this.loadMore()
		},
		// #endif
		onNavigationBarButtonTap(e) {
			console.log(e)
			console.log("success")
			uni.navigateTo({
				// url: '/pages/allin/rules/rules'
			})
		},
		
		methods: {
			getNewsData(id=0){
					console.log("this.navIndex :" + this.navIndex)
				
					uniCloud.callFunction({
					
				    name: "hospital-service-get",
				    data: {
				        type: this.navIndex 
				    },
				    success: (res) => {
						this.loading=2
				
						this.newsArr = res.result.data
						// this.newsArr=[...this.newsArr,...res.result.data]
				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        console.log("请求完成");
				    }
				});
				
			},
			searchClick(e) { //点击搜索框
				console.log("searchClick")
				uni.hideKeyboard();
				uni.navigateTo({
					url: '/pages/list/search/search',
					animationType: 'fade-in'
				});
			},
			retry() {
				this.refresh()
			},
			refresh() {
				cdbRef.loadData({
					clear: true
				}, () => {
					uni.stopPullDownRefresh()
					// #ifdef APP-NVUE
					this.showRefresh = false
					// #endif
					console.log('end');
				})
				console.log('refresh');
			},
			loadMore() {
				//cdbRef.loadMore()
			},
			onqueryerror(e) {
				console.error(e);
			},
			onpullingdown(e) {
				console.log(e);
				this.showRefresh = true
				if (e.pullingDistance > 100) {
					this.refresh()
				}
			},
			tapGrid(index) {
				this.navIndex = index
				uni.navigateTo({
					url: `/pages/hushizhan/hushizhan?index=${index}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
				// if(index==0){
				// 	uni.navigateTo({
				// 		url: '/pages/common/webview/webview?url=https://www.gsxt.gov.cn/index.html&title=企查查',
				// 		success: res => {},
				// 		fail: () => {},
				// 		complete: () => {}
				// 	});
				// }else if(index==1){
					
				// }else if(index==2){
					
				// }else if(index==3){
					
				// }
			},
			/**
			 * banner加载后触发的回调
			 */
			onqueryload(data) {},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			/**
			 * 点击banner的处理
			 */
			clickBannerItem(item) {
				// 有外部链接-跳转url
				if (item.open_url) {
					uni.navigateTo({
						url: '/pages/common/webview/webview?url=' + item.open_url + '&title=' + item.title,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				// 其余业务处理
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.tips {
	    font-size: 20px; /* 设置文字大小 */
	    color: #40C6C0; /* 设置文字颜色 */
	    font-weight: bold; /* 设置文字加粗 */
	    text-align: center; /* 设置文字居中 */
	    text-transform: uppercase; /* 将文字转换为大写 */
	    /* 添加其他样式属性以满足您的需求 */
	}
	
	.content{
		padding:30rpx;
		padding-top:10rpx;	
		.row{
			border-bottom:1px dotted #efefef;
			padding:20rpx 0;
		}
	}
	
	.banner-image {
		width: 750rpx;
		height: 400rpx;
	}

	.swiper-box {
		height: 400rpx;
	}

	/* 以下是子菜单 */
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

	.loading{
		text-align: center;
		font-size: 26rpx;
		color:#888;
		line-height: 2em;
	}

	/* 以下是文章加载 */
	/* #ifndef APP-NVUE*/
	// view {
	// 	display: flex;
	// 	box-sizing: border-box;
	// 	flex-direction: column;
	// }

	/* #endif */
	.pages {
		background-color: #FFFFFF;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}

	.main {
		justify-content: space-between;
		flex: 1;
	}

	.title {
		font-size: 16px;
	}

	.excerpt {
		font-size: 12px;
		color: #a5a5a5;
		text-overflow:ellipsis;
	}

	.info {
		flex-direction: row;
		justify-content: space-between;
	}

	.author,
	.last_modify_date {
		font-size: 14px;
		color: #999999;
	}
</style>
