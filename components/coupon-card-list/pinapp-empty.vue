<template>
	<view class="empty-box">
		<image src="./empty.png"></image>
		<view class="txt">{{ title }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '暂无优惠券',
			},
		},
	}
</script>

<style lang="scss">
	.empty-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 0rpx;
		height: 340rpx;

		image {
			width: 517rpx;
			height: 300rpx;
		}

		.txt {
			font-size: 26rpx;
			color: #999;
		}
	}
</style>
