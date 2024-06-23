<template>
	<view class="home">	
		<!-- <view> -->
<!-- 			<uni-nav-bar dark :fixed="true" shadow background-color="#1cbbb4" status-bar left-icon="back" left-text=""
								title="服务分类" @clickLeft="selectCity" /> -->
		<!-- </view> -->
							
		<scroll-view scroll-x class="navscroll">
			<view class="item" 
			:class="index==navIndex ? 'active' : ''" v-for="(item,index) in navArr" 
			@click="clickNav(index,item.id)"
			:key="item.id"
			>{{item.type}}</view>			
		</scroll-view>
		
<!-- 		<view class="content" >
			<div class="row" v-for="item in newsArr" :key="item._id">
				<newsbox :item="item" @click.native="goDetail(item)"></newsbox>
			</div>
		</view> -->
		<view  class="content" >
			<cc-waterListView :proList="projectList" @click="goProDetail"></cc-waterListView>
		</view> 
<!-- 		<view class="nodata" v-if="!newsArr.length">
			<image src="/static/images/nodata.png" mode="widthFix"></image>
		</view> -->
		
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
	// import NewsBox from '@/components/newsbox/newsbox.vue';
	import CcWaterListView from '@/node_modules/cc-waterListView/components/cc-waterListView/cc-waterListView.vue';
	
	export default {
		components: {
			// NewsBox,
			CcWaterListView
		},
		data() {
			return {
				type: '',
				projectList: [],
				navIndex:0,
				navArr:[],
				newsArr:[],
				currentPage:1,
				currentId:50,
				loading:0,       //0默认  1加载中  2没有更多了	
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
		onLoad(query) {
			this.navIndex = query.index;
			// console.log("onload query:" + query.index)
			this.getNavData();
			// this.getNewsData();
		},
		
		onShow() {
			// console.log("onShow")
			
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
			goProDetail(object) {
								
				uni.navigateTo({
					 url: `/pages/service/servicedetails/servicedetails?item=${object.id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
			},
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
				// 	 url: `/pages/service/servicedetails/servicedetails?item=${item.id}`,
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			},
						
			//获取导航列表数据
			getNavData() {				
				uniCloud.callFunction({
				    name: "hospital-service-item",
				    data: {
				        
				    },
				    success: (res) => {					
						// console.log("getNavData")
						// console.log(res.result.data)
						this.navArr = res.result.data
						this.getNewsData();
				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        // console.log("请求完成");
				    }
				});
				
			},
			
			//获取新闻列表数据
			getNewsData(id=0){
				
				// console.log("this.navIndex :" + this.navIndex)
				// console.log("this.navArr length: :" + this.navArr.length)
				let servicetype = this.navArr[this.navIndex].type;
				let category = this.gridList.find(item => item.text === servicetype)?.index;

				// category = "6646bc558b0da4a4e41e78be"
				// console.log("this.navIndex :" + category)	
				uniCloud.callFunction({
				    name: "nurse-service-get",
				    data: {						
				        category_id: category 
				    },
				    success: (res) => {
						this.loading=2
						// console.log(" getNewsData navIndex :");						
						// console.log(res.result.data);
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
				        // console.log("请求完成");
				    }
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
		font-size: 31upx;
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
	// padding:30rpx;
	padding-top:130rpx;	
	// .row{
	// 	border-bottom:1px dotted #efefef;
	// 	padding:20rpx 0;
	// }
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
