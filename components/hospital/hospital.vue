<template>
	<view class="hospital">
		<view class="pic">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="text">
			<view class="title">
				{{item.name}}
			</view>
			<view class="info" >
				<!-- <text>{{item.hospital_name}}</text> -->
				<text>地址：{{item.address}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "hospital",
		props: {
			item: {
				type: Object,
				default () {
					return {
						name: "组件内默认的标题",
						hospital_name: "张三",
						price: 668,
						avatar: "../../static/images/nopic.jpg"
					}
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.hospital {
		display: flex;

		.pic {
			width: 230rpx;
			height: 160rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 36rpx;
				color: #333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden; //溢出内容隐藏
				text-overflow: ellipsis; //文本溢出部分用省略号表示
				display: -webkit-box; //特别显示模式
				-webkit-line-clamp: 2; //行数
				line-clamp: 2;
				-webkit-box-orient: vertical; //盒子中内容竖直排列			
			}

			.info {
				font-size: 32rpx;
				color: #999;

				text {
					padding-right: 30rpx;
				}
			}
		}
	}
</style>