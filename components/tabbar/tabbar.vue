<template>
	<view class="cu-tabbar-height">
		<view class="cu-bar tabbar bg-white foot">
			<block v-for="v,k in tablist" :key="k">
				<view v-if="v.isbulge" class="action  add-action" :class="tabbarIndex==k?'text-cyan':''"
					@click="tabbarItemClick(v,k)">
					<button class="cu-btn cuIcon-cu-image bg-cyan shadow">
						<image :src="tabbarIndex==k?v.selectedIconPath:v.iconPath"></image>
					</button>
					<!-- <text style="font-size: 24upx;">{{v.text}}</text> 想这里显示文本就把注释去掉-->
				</view>
				<view class="action " v-else :class="tabbarIndex==k?'text-cyan':''" @click="tabbarItemClick(v,k)">
					<view class="cuIcon-cu-image">
						<image :src="tabbarIndex==k?v.selectedIconPath:v.iconPath">
						</image>
					</view>
					<text style="font-size: 24upx;">{{v.text}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props: ["index"],
		data() {
			return {
				tabbarIndex: 0,
				tablist: [{
						text: "首页",
						isbulge: false,
						iconPath: "../../static/tabbar/home.png",
						selectedIconPath: "../../static/tabbar/homefill.png",
						pagePath: "/pages/index/index"
					},
					// {
					// 	text: "护士站",
					// 	isbulge: false,
					// 	iconPath: "../../static/tabbar/we.png",
					// 	selectedIconPath: "../../static/tabbar/wefill.png",
					// 	pagePath: "/pages/hospital/hospital"
					// },
					// {
					// 	text: "加入",
					// 	isbulge: true,//是滞显示为凸起来的样式
					// 	iconPath: "../../static/tabbar/add.png",
					// 	selectedIconPath: "../../static/tabbar/add.png",
					// 	pagePath: "/pages/join/join"
					// },
					{
						text: "订单",
						isbulge: false,
						iconPath: "../../static/tabbar/message.png",
						selectedIconPath: "../../static/tabbar/messagefill.png",
						pagePath: "/pages/messge/messge"
					},
					{
						text: "我的",
						isbulge: false,
						iconPath: "../../static/tabbar/my.png",
						selectedIconPath: "../../static/tabbar/myfill.png",
						pagePath: "/pages/ucenter/ucenter"
					},
				],
			};
		},
		mounted() {
			this.tabbarIndex = this.index
			uni.hideTabBar()
		},
		methods: {
			tabbarItemClick(v, k) {
				uni.switchTab({
					url: v.pagePath
				})
			},
		}
	}
</script>

<style>
	/* 引入相应的样式 */
	@import '@/components/tabbar/tabbar.css';
</style>
