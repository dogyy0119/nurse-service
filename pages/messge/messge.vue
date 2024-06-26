<template>
	<view>
		<uni-segmented-control :current="current" :values="items" style-type="text" 
			@clickItem="onClickItem" />
		<block v-for="(item,index) in listData" :key="item.id">
			<uni-card :title="item.author_name" :sub-title="item.published_at" extra="已读">
				<text class="uni-body">{{item.title}}</text>
			</uni-card>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				items: ['全部消息','系统消息', '业务通知'],
				listData: [{
					"author_name": "系统通知",
					"cover": "https://img.36krcdn.com/20200411/v2_b92317dfc59948cea0f3c69a0357e519_img_000?x-oss-process=image/resize,m_mfit,w_432,h_288/crop,w_432,h_288,g_center",
					"id": 121363,
					"tpyeID": 0,
					"isread": 0,
					"gourl": "/pages/tax/taxrecord",
					"published_at": "刚刚",
					"title": "恭喜你成功注册了企税通APP，企税通为你提供在线政策解读，纳税查询，抄报税记录等一条龙服务"
				}, {
					"author_name": "专属会计",
					"cover": "https://img.36krcdn.com/20200410/v2_9c3331af67e64994aa97a27fffb1a380_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center",
					"id": 121375,
					"tpyeID": 1,
					"isread": 1,
					"gourl": "/pages/tax/taxrecord",
					"published_at": "2020-04-11 12:36",
					"title": "你的专属会记已在2020-04-11 17:07为你完成了报税工作，点击可以查看详细信息"
				}, {
					"author_name": "好友消息",
					"cover": "https://img.36krcdn.com/20200401/v2_4afb7581cb5a4c36aac96a51829c13e0_img_png",
					"id": 121356,
					"tpyeID": 2,
					"isread": 0,
					"gourl": "/pages/messge/detail",
					"published_at": "2020-04-11 12:36",
					"title": "你的好友给你发送了一条消息"
				}]
			}
		},
		onLoad() {
			//this.getList()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			getList() {

			},

		}
	}
</script>

<style lang="scss">
	.chat-custom-right {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.chat-custom-text {
		font-size: 12px;
		color: #999;
	}

	.search-result {
		padding-top: 10px;
		padding-bottom: 20px;
		text-align: center;
	}

	.search-result-text {
		text-align: center;
		font-size: 14px;
		color: #666;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
	}

	.uni-mt-10 {
		margin-top: 10px;
	}
</style>
