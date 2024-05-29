<template>
	<view class="home">		
		<!-- <scroll-view scroll-x class="navscroll">
			<view class="item" 
			:class="index==navIndex ? 'active' : ''" v-for="(item,index) in navArr" 
			@click="clickNav(index,item.id)"
			:key="item.id"
			>{{item.classname}}</view>			
		</scroll-view> -->
		<scroll-view scroll-x class="navscroll">
			<view class="item" 
			:class="index==navIndex ? 'active' : ''" v-for="(item,index) in navArr" 
			@click="clickNav(index,item.id)"
			:key="item.id"
			>{{item.type}}</view>			
		</scroll-view>
		
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
	// const gps = new Gps(),
	const db = uniCloud.database();
	import NewsBox from '@/components/newsbox/newsbox.vue';
	export default {
		components: {
			NewsBox
		},
		data() {
			return {
				navIndex:0,
				navArr:[],
				newsArr:[],
				currentPage:1,
				currentId:50,
				loading:0       //0默认  1加载中  2没有更多了
			}
		},
		async onLoad(query) {
			this.navIndex = query.index;
			this.getNavData();
			await this.getNewsData( query.index );
		},
		onReachBottom(){
			console.log("到底部了")
			if(this.loading==2){
				return;
			}
			this.currentPage++;
			this.loading=1;
			this.getNewsData(this.navIndex);
		},
		

		
		methods: {
			// async fetchData() {
			//       try {
			//         let res = await db.collection('hospital-service').get();
			//         console.log( "fetchData" + res)
			//         // 处理查询结果
			//         // if (res.data && res.data.length > 0) {
			//         //     // 数据库中存在符合条件的数据
			//         //     console.log("查询到的数据：", res.data);
			//         // } else {
			//         //     // 数据库中不存在符合条件的数据
			//         //     console.log("未查询到符合条件的数据");
			//         // }
			//       } catch (error) {
			//         console.error(error);
			//       }
			// },
			
			//点击导航切换
			clickNav(index,id){
				console.log("index:" + index)
				this.navIndex=id;	
				this.currentPage=1;	
				this.currentId=id;			
				this.newsArr=[]
				this.loading=0;
				this.getNewsData(id);
			},
			
			//跳转到详情页
			goDetail(item){				
				// uni.navigateTo({
				// 	url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				// })
			},
			
			
			
			//获取导航列表数据
			getNavData() {				
				uniCloud.callFunction({
				    name: "hospital-service-item",
				    data: {
				        
				    },
				    success: (res) => {
						console.log("getNavData")
						console.log(res.result.data)
						this.navArr = res.result.data
				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        console.log("请求完成");
				    }
				});
				
			},
			
			//获取新闻列表数据
			async getNewsData(id=0){
				console.log("this.navIndex :" + this.navIndex)
				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						
					    name: "hospital-service-get",
					    data: {
					        type: this.navIndex ? this.navIndex:0
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
				});
				
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.navscroll{
	height: 100rpx;
	background: #F7F8FA;
	white-space: nowrap;
	position: fixed;
	top:var(--window-top);
	left:0;
	z-index: 10;
	/deep/ ::-webkit-scrollbar {
		width: 4px !important;
		height: 1px !important;
		overflow: auto !important;
		background: transparent !important;
		-webkit-appearance: auto !important;
		display: block;
	}
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
}

.content{
	padding:30rpx;
	padding-top:130rpx;	
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
