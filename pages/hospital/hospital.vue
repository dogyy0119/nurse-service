<template>
	<view class="home">		
		<view class="uni-search-box">
			<uni-search-bar v-model="keyword" ref="searchBar" radius="100" cancelButton="none" disabled
				:placeholder="inputPlaceholder" />
			<view class="cover-search-bar" @click="searchClick"></view>
		</view>
		
		<view class="content" >
			<div class="row" v-for="item in newsArr" :key="item._id">
				<hospital :item="item" @click.native="goDetail(item)"></hospital>
			</div>
		</view>
		
		<view class="nodata" v-if="!newsArr.length">
			<image src="../../static/images/nodata.png" mode="widthFix"></image>
		</view>
		
		<view class="loading" v-if="newsArr.length">			
			<view v-if="loading==1">数据加载中...</view>
			<view v-if="loading==2">没有更多了~~</view>
		</view>
	</view>
</template>

<script>
	// const gps = new Gps(),
	const db = uniCloud.database();
	import NewsBox from '@/components/newsbox/newsbox.vue';
	import hospital from '@/components/hospital/hospital.vue';
	export default {
		components: {
			NewsBox,
			hospital
		},
		computed: {
			inputPlaceholder(e) {
				if (uni.getStorageSync('CURRENT_LANG') == "en") {
					return 'Please enter the search content'
				} else {
					return '请输入搜索内容'
				}
			},
		},
		data() {
			return {
				navIndex:0,
				newsArr:[],
				currentPage:1,
				currentId:50,
				loading:0       ,//0默认  1加载中  2没有更多了
				keyword: ""
			}
		},
		onShow() {
			this.keyword = getApp().globalData.searchText
			getApp().globalData.searchText = ''
			this.getNewsData();
		},
		onLoad() {
			this.getNewsData();
		},
		onReachBottom(){
			console.log("到底部了")
			if(this.loading==2){
				return;
			}
			this.currentPage++;
			this.loading=1;
			this.getNewsData();
		},
		

		
		methods: {
			async fetchData() {
			      try {
			        let res = await db.collection('hospital-service').get();
			        console.log( "fetchData" + res)
			        // 处理查询结果
			        if (res.data && res.data.length > 0) {
			            // 数据库中存在符合条件的数据
			            console.log("查询到的数据：", res.data);
			        } else {
			            // 数据库中不存在符合条件的数据
			            console.log("未查询到符合条件的数据");
			        }
			      } catch (error) {
			        console.error(error);
			      }
			},
				
			
			//跳转到详情页
			goDetail(item){				
				uni.switchTab({
				    url: '/pages/index/index'
				})
			},
			
			
			//获取新闻列表数据
			// getNewsData(id=0){
			// 		uniCloud.callFunction({
					
			// 	    name: "hospital-info-api",
			// 	    data: {
			// 	    },
			// 	    success: (res) => {
			// 			// if(res.result.data.length==0){
			// 			this.loading=2
			// 			// }
			// 			this.newsArr = res.result.data
			// 			// this.newsArr=[...this.newsArr,...res.result.data]
			// 	    },
			// 	    fail: (err) => {
			// 	        console.error("请求失败: " + err);
			// 	    },
			// 	    complete: (res) => {
			// 	        console.log("请求完成");
			// 	    }
			// 	});
				
			// }
			
			getNewsData(id=0){
					uniCloud.callFunction({
					
				    name: "nurse-hospital-get",
				    data: {
						city: "沈阳市"
				    },
				    success: (res) => {
						// if(res.result.data.length==0){
						this.loading=2
						// }
						console.log(res.result.data)
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
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>

.item{
	font-size: 40rpx;
	display: inline-block;
	line-height: 100rpx;
	padding:0 30rpx;
	color:#333;		
	&.active{
		color:#31C27C;
	}
}


.content{
	padding:30rpx;
	padding-top:10rpx;	
	.row{
		border-bottom:1px dotted #efefef;
		padding:20rpx 0;
	}
}
.nodata{
	display: flex;
	justify-content: center;
	image{
		width: 360rpx;
	}
}
.loading{
	text-align: center;
	font-size: 26rpx;
	color:#888;
	line-height: 2em;
}
</style>
