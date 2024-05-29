<template>
	<view>
		<uni-nav-bar dark :fixed="true" shadow background-color="#1cbbb4" status-bar left-icon="back" :left-text="cityName"
				title="服务详情" @clickLeft="backToTop" />
		<view class="detail">
			
			<view class="pic">
				<image :src="detailObj.service_thumb" mode="widthFix"></image>
			</view>
			
			<uni-section :title="detailObj.name" type="line">
				<view class="example-body">
					<!-- <view class="price" >￥：{{detailObj.price}}</view> -->
					<uni-fav :checked="checkList[0]" class="favBtn" :circle="true" bg-color="#dd524d"
						bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick(0)" />
					
				</view>
				
			</uni-section>
						
			<view class="title">
	<!-- 			<view class="name" >{{detailObj.name}}</view> -->
				<view class="price" >￥：{{detailObj.price}}</view>
			</view>
			<view class="tool">
				<view class="author">套餐选择：{{detailObj.service_desc}}</view>
				<view class="time">发布时间：{{detailObj._add_time_str}}</view>
			</view>
			
			<view class="tool">
				<view class="author">选择耗材：</view>
				<view class="author">类型：{{toolObj.name}}</view>
				<view class="author">详细：{{toolObj.detail}}</view>
				<view class="price">￥：{{toolObj.price}}</view>
			</view>
			
			
			
			<!-- <view class="info">
				<view class="author">套餐选择：{{detailObj.service_desc}}</view>
				<view class="time">发布时间：{{detailObj._add_time_str}}</view>
			</view> -->
			
			<view class="content">
				<rich-text :nodes="detailObj.service_banner_imgs"></rich-text>
			</view>
			<view class="pic">
				<image v-for="(item, index) in detailObj.service_banner_imgs" :key="index" :src="item" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {parseTime} from '@/utils/tool.js'
	
	let options;
	export default {
		data() {
			return {
				checkList: [false, false, false, false, false, false],
				detailObj:{},
				toolObj:{}
			};
		},
		onLoad(event){
			options=event;
			this.getDetail(options)
			this.getConsumaList(options)

		},
		methods:{
			backToTop() {
				
			},
			favClick(index) {
				this.checkList[index] = !this.checkList[index]
				console.log(this.checkList[index]);
				this.$forceUpdate()
			},
			//获取详情
			getDetail(options){
				let id
				id = "6648ad28f08210b07d323e0a"
				console.log("this.navIndex :" + id)	
				uniCloud.callFunction({
				    name: "nurse-service-getid",
				    data: {						
				        id: id 
				    },
				    success: (res) => {
						this.loading=2
						console.log(res.result.data);
						this.detailObj = res.result.data[0]
				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        console.log("请求完成");
				    }
				});
				
				
			},
			
			getConsumaList(options){
				let consumableid = "66496ec0ee97ef5896909378"
				
				uniCloud.callFunction({
				    name: "nurse-service-consumable-getid",
				    data: {						
				        id: consumableid 
				    },
				    success: (res) => {
						this.loading=2
						console.log(res.result.data);
						this.toolObj = res.result.data[0]
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

<style lang="scss">
.detail{
	// padding:50rpx 30rpx;
	
	.pic {
		// width: 230rpx;
		// height: 160rpx;
	
		image {
			width: 100%;
			height: 100%;
		}
	}
	.example-body {
		display: flex;
		padding: 10px 15px;
	}

	// .favBtn {
	// 	margin: 0 20rpx 20rpx 0;
	// }

	.title{
		font-size: 40rpx;
		background: #fff;
		line-height: 1.6em;
		.name {
			
		}
		.price {
			padding:0 10rpx;
			margin:20rpx 0;
			background: #f6f6f6;
			font-size: 16rpx;
			color: #DD524D;
			// line-height: 1.6em;
		}
	}
	
	.tool {
		padding:0 30rpx;
		margin:50rpx 0;
	    display: flex;
		background: #f6f6f6;
	    flex-direction: column; /* 设置flex子项垂直排列 */
	    align-items: left; /* 子项在水平方向上居中对齐 */
	    justify-content: flex-start; /* 子项在垂直方向上从顶部开始排列 */
		margin-bottom: 10px;
		
		.price {
			font-size: 30rpx;
			color: #F5C2C1;
			line-height: 1.6em;
		}
	}
	
	.info{
		padding:0 30rpx;
		margin:50rpx 0;
		height: 80rpx;
		background: #f6f6f6;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 22rpx;
		color:#888;
	}
	.state{
		background: #FEF0F0;
		font-size: 26rpx;
		// padding:20rpx;
		color:#F89898;
		line-height: 1.8em;
	}
	
}
</style>