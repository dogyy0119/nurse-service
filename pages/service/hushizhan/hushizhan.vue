<template>
	<view class="home">	
		<!-- <view> -->
<!-- 			<uni-nav-bar dark :fixed="true" shadow background-color="#1cbbb4" status-bar left-icon="back" left-text=""
								title="服务分类" @clickLeft="selectCity" /> -->
		<!-- </view> -->
							
		<scroll-view scroll-x class="navscroll">
			<view class="item" 
			:class="index==kindIndex ? 'active' : ''" v-for="(item,index) in serviceKinds" 
			@click="clickKind(index,item._id)"
			:key="item._id"
			>{{item.name}}</view>			
		</scroll-view>
		

		<view  class="content" >
			<cc-waterListView :proList="serviceDatas" @click="goProDetail"></cc-waterListView>
		</view> 
		
		<view class="loading" v-if="serviceDatas.length">			
<!-- 			<view v-if="loading==1">数据加载中...</view>
			<view v-if="loading==2">没有更多了~~</view> -->
		</view>
	</view>
</template>

<script>
	// const gps = new Gps(),
	const db = uniCloud.database();
	import CcWaterListView from '@/node_modules/cc-waterListView/components/cc-waterListView/cc-waterListView.vue';
	
	export default {
		components: {
			CcWaterListView
		},
		data() {
			return {
				kindIndex:0,
				serviceKinds:[],
				serviceDatas:[],
			}
		},
		onLoad(query) {			
			this.kindIndex = query.index;
			this.getServiceKind();
		},
		
		onShow() {
			
		},
			
		methods: {
			goProDetail(object) {							
				uni.navigateTo({
					 url: `/pages/service/servicedetails/servicedetails?item=${object._id}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
			},
			//点击导航切换
			clickKind(index,id){
				console.log("index:" + index)
				this.kindIndex= index;	
				this.currentId=id;			

				this.getServiceData(index);
			},
			
			getServiceKind() {
				uni.showLoading({
				    mask: true
				}) 
				uniCloud.callFunction({
				    name: "nurse-service-categories-get",
				    data: {        
				    },
				    success: (res) => {					
						this.serviceKinds = res.result.data
						this.serviceKinds.sort((a, b) => a.sort - b.sort);
						this.getServiceData( this.kindIndex ); 
				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
						uni.hideLoading({
							mask: true
						})
				    },
				    complete: (res) => {
				        // console.log("请求完成");
						uni.hideLoading({
							mask: true
						})
				    }
				});
			},
			
			//获取新闻列表数据
			getServiceData(index=0){
				let category = this.serviceKinds[index]._id
			
				uniCloud.callFunction({
				    name: "nurse-service-get",
				    data: {						
				        category_id: category 
				    },
				    success: (res) => {
						this.serviceDatas = [];
						res.result.data.forEach(item => {
							this.serviceDatas.push({
								'proImg': item.service_thumb,
								'proName': item.name,
								'proDetail': item.service_desc,
								'proPrice': item.price,
								// 'status': item.consumable == 1? "可退款":"不可退款",
								'id': item._id
							});
						});
						

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
