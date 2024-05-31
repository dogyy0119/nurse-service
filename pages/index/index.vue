<template>

	<view class="content">
	<!-- <uni-nav-bar left-text="返回" right-text="设置" title="标题" /> -->
    <!-- <uni-nav-bar left-icon="left" height="120rpx" right-icon="cart" title="标题" /> -->
	<uni-nav-bar dark :fixed="true" shadow background-color="#1cbbb4" status-bar left-icon="location" :left-text="cityName"
			title="首页" @clickLeft="selectCity" />
	
<!-- 	<uni-nav-bar>
	    <view>标题栏</view>
	    <view v-slot:left>left</view>
	    <view v-slot:right>right</view>
	</uni-nav-bar> -->

	
	<!-- 	<uni-icons name="heart"></uni-icons> -->

		<!-- icon: 右侧菜单图标 @searchClick：搜索点击  @rigIconClick：右侧菜单点击 -->
		<cc-headerSearch icon="../../static/scan_icon.png" @searchClick="searchClick"
			@rigIconClick="rigIconClick"></cc-headerSearch>

		<uni-grid class="grid" :column="4" :showBorder="false" :square="true">
			<uni-grid-item class="item" v-for="(item,index) in gridList" @click.native="tapGrid(index)" :key="index">
				<uni-icons class="icon" color="#1cbbb4" :type="item.icon" size="34"></uni-icons>
				<text style="color:#1cbbb4;font-size: 22rpx;">{{item.text}}</text>
			</uni-grid-item>
		</uni-grid>
		
		<view class="tips">
			<view>{{gridList[this.navIndex].text}}</view>
		</view>
		<!--  proList: 条目数组数据  goProDetail:条目点击事件跳转（实现了点击条目数据传值）-->
		<cc-waterListView :proList="projectList" @click="goProDetail"></cc-waterListView>
		
		<tabbar index="0"></tabbar>

	</view>
</template>

<script>
	
	// import CcHeaderSearch from 'cc-header-search';
	// import vk from 'uni_modules/vk-unicloud';
	// Vue.use(vk);

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
				loading:0, //0默认  1加载中  2没有更多了
				gridList: [{
						"text": "推荐服务",
						"icon": "staff",
						"index": "6646b0b49755e32830aab169"
					},
					{
						"text": "专业护理",
						"icon": "wallet",
						"index": "6646b41699c6244dcf963a53"
					},
					{
						"text": "尊享套餐",
						"icon": "map",
						"index": "6646b8cc9755e32830ac1290"
					},
					{
						"text": "母婴护理",
						"icon": "compose",
						"index": "6646ba84466d41f58522bb33"
					},
					{
						"text": "陪诊服务",
						"icon": "staff",
						"index": "6646bc558b0da4a4e41e78be"
					},
					{
						"text": "居家康复",
						"icon": "wallet",
						"index": "6646bbae21821b6d2bf66d62"
					},
					{
						"text": "医美拆线",
						"icon": "map",
						"index": "6646bc830d2b315faffe729a"
					},
					{
						"text": "居家照护",
						"icon": "compose",
						"index": "6646bc24b9fb2360b007f42a"
					},
				],
			}
		},
		
		onLoad() {
			let mylocation = uni.getStorageSync("location")
			
			console.log(mylocation)
			if (mylocation != '') {
				this.cityName = mylocation
			} else {
				console.log("mylocation is null")
			}
			
			// this.requestData();
		},
		
		onShow() {			
			this.getNewsData();
		},
				
		onNavigationBarButtonTap(e) {
				
		},
		
		methods: {
			selectCity() {
			      // 处理城市选择逻辑
			      console.log('选择城市');
				  uni.navigateTo({
				    url: '/pages/city/city'	
				  });
			},
			getNewsData(id=0){
				console.log("this.navIndex :" + this.navIndex)
				let category = this.gridList[this.navIndex].index
				category = "6646bc558b0da4a4e41e78be"
				console.log("this.navIndex :" + category)	
				uniCloud.callFunction({
				    name: "nurse-service-get",
				    data: {						
				        category_id: category 
				    },
				    success: (res) => {
						this.loading=2
						console.log(" getNewsData navIndex :");
						
						console.log(res.result.data);
						// this.newsArr = res.result.data
						this.projectList = [];
						res.result.data.forEach(item => {
							this.projectList.push({
								'proImg': item.service_thumb,
								'proName': item.name,
								'proDetail': item.service_desc,
								'proPrice': item.price,
								// 'status': item.consumable == 1? "可退款":"不可退款",
								'id': item._id
							});
						});
						
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
			// 列表条目点击事件
			goProDetail(item) {

				uni.navigateTo({
					 url: `/pages/servicedetails/servicedetails?item=${item}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			tapGrid(index) {
				this.navIndex = index
				uni.navigateTo({
					url: `/pages/hushizhan/hushizhan?index=${index}`,
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
					url:'./search'
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
	    font-size: 20px; /* 设置文字大小 */
	    color: #40C6C0; /* 设置文字颜色 */
	    font-weight: bold; /* 设置文字加粗 */
	    text-align: center; /* 设置文字居中 */
	    text-transform: uppercase; /* 将文字转换为大写 */
	    /* 添加其他样式属性以满足您的需求 */
	}
</style>