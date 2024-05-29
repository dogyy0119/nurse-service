<template>
	<view>
		<view class="list-box">
			<view class="list-tab">
				<ul class="item-ul" v-for="(item, index) in evaluateList" :key="index">
					<li>
						<view class="item-left">
							<!-- <u--image :src="item.picUrl" :fade="true" radius="5"
								width="50" height="50" duration="450"></u--image> -->
							<u-avatar :text="item.name.substr(0,1)" fontSize="16" size="32" randomBgColor></u-avatar>
						</view>
						<view class="item-right">
							<view class="item-right-v1">
								<h3>{{item.name}}</h3>
								<p class="p-time">{{item.dataTime}}</p>
							</view>
							<view class="item-right-v3">
								<u-rate :count="5" readonly v-model="item.count" :allowHalf="true" activeColor="#FE8938" :gutter="0"></u-rate>
								<text class="rate-text1">{{item.count}}分</text>
							</view>
							<view class="item-right-v2">
								<text class="info-text">{{item.infoText}}</text>
							</view>
						</view>
					</li>
					<view class="li-img-ls" v-if="item.imgsList.length > 1">
						<view class="li-imgs" v-for="(imgItem,imgIndex) in item.imgsList" :key="imgIndex" >
							<u-image class="li-imgs-img" :radius="5" :src="imgItem.imgUrl" width="80" height="80" :lazy-load="true"></u-image>
						</view>
						
					</view>
				</ul>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				evaluateList: [
					{
						name: '张三',
						dataTime: '2023-06-26',
						count: '5.0',
						infoText: '第一次在平台下单，处理过程中及时沟通，很不错',
						imgsList: [
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
						],
					},
					{
						name: '李四',
						dataTime: '2023-06-26',
						count: '4',
						infoText: '处理过程中及时沟通，很不错',
						imgsList: [
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
							{
								imgUrl: 'https://cdn.uviewui.com/uview/album/1.jpg',
							},
						],
					},
					
				],
				
			};
		},
		onLoad() {
			
		},
		methods: {
		
			
		}
	};
</script>

<style scoped lang="scss">
	@import url("/static/css/common.scss");
	.list-box{
		flex: 1;
		width: 100%;
		overflow: auto;
	}
	.li-img-ls{
		width: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 10upx;
	}
	.li-imgs{
		flex: 0 1 25%;
		padding: 0 0 10upx;
		
		
		.li-imgs-img{
			display: flex;
		}
	}
	
</style>