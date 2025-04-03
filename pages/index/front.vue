<template>
  <view class="container">
    <view class="pic">
		<image src="/static/logo.png" class = "logo-image"></image>
    </view>

	<view class="grid-wrapper" :style="'grid-template-columns: repeat(' + columns + ', 1fr); gap:' + gapNumber + 'rpx;'">
	  <view v-for="(item, index) in cityArray" :key="index" :class="{'grid-item': true}" @click="tapGrid(index)" :style="{height: height + 'rpx'}">
		<image
		  class="icon-house"
		  src="/static/images/img_11.png" 
		  :alt="item.name"
		/>
		<text>{{ item.name || index + 1 }}</text>
	  </view>
	</view>


    <!-- 下单说明控件 -->
    <view class="order-instructions">
      <view class="instructions-title"> 下单说明</view>
      <view class="instructions-content">
       <p>1. 预约请仔细核对联系方式地址是否正确。2. 护士接单后一般会在30分钟内跟您电话联系，如遇到没有及时联系的请联系护士或者平台客服，以免耽误您的行程安排。3. 预约订单护士接单后由于您个人原因退款将收取百分之30的手续费；护士接单已经出发后由于个人原因取消订单将扣除百分之50的手续费；护士未接单取消订单全额退款。4. 晚上超过8点的订单统一加收80的夜班费。5. 为保障您的权益，请在护士完成订单后再确认服务完成。</p>
      </view>
    </view>
	
  </view>
</template>
<script>
	
	import { getSetting } from '@dcloudio/uni-app';
import cityVue from '../service/city/city.vue';

	export default {
		data() {
			return {
				cityArray: '', // ['沈阳市', '丹东市', '抚顺市', '鞍山市'],
				// 每行显示的格子数量
				columns: 2,
				// 行与列的间隙(rpx)
				gapNumber: 10,
				// 格子高度(rpx)
				height: 180

			}
		},
		
		onLoad(event) {
			console.log("in the front onLoad...")
			this.getCitylist()
			// uni.setStorageSync('cityName', "城市");
			uni.setStorageSync('cityCode', "110100");
		},
		
		methods: {
			
			tapGrid( index ){
				console.info("请求 index: " + index );
				uni.setStorageSync('cityName', this.cityArray[index].name);
				uni.setStorageSync('cityCode', this.cityArray[index].code);
				
				uni.switchTab({
				  url: '/pages/index/index',
				  success: (res) => {
				    // Handle success if needed
				  },
				  fail: (err) => {
				    // Handle failure if needed
				  }
				});
				
			},
			getCitylist() {
			
				uniCloud.callFunction({
					name: "nurse-open-city-list-get",
					data: {},
					success: (res) => {
						this.cityArray = res.result.data
						console.log(" getCitylist  res.result.data:", this.cityArray)
					},
					fail: (err) => {
						console.error("请求失败: " + err);
					},
					complete: (res) => {
						// console.log("请求完成");
					}
				});
			
			},	
		}
	}
</script>

<style scoped>
.container {
	/* background-color: #f7f8fa; */
	width: 100vw;
	height: 100vh;
	position: relative; /* 或者 absolute */
	background-color: #f7f8fa;
  /* padding: 20px; */
}

.title {
  font-size: 24px; /* 设置字体大小 */
  color: #333; /* 字体颜色 */
}

.pic {
  width: 100%; /* 你可以根据需要调整宽度 */
  height: 140px; /* 设置固定高度，确保图标不会过高 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #f7f8fa;/* 背景颜色，可选  white;  */
   /* background-color: skyblue; */
  box-sizing: border-box; /* 确保内边距和边框不影响总体大小 */
  padding: 10px; /* 内边距，可选 */
/*  margin-bottom: 30px; */ /* 增加底部外边距，防止压盖 */
}

.logo-image {
  width: 130px; /* 设置图片宽度 */
  height: 120px; /* 设置图片高度 */
  background-size: contain; /* 确保图片适应容器 */
  background-repeat: no-repeat; /* 防止图片重复 */
  background-position: center; /* 居中显示图片 */
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 默认每行2列 */
  /* gap: 5%; */ /* 增加网格间距 */
  background-color: #f7f8fa; /* rgba(255, 255, 255, 1); */
  margin-bottom: 10px;
  width: 86%;
  margin: 0 auto;
}

.grid-item {
  display: flex;
  flex-direction: column; /* 纵向排列 */
  justify-content: center;
  align-items: center;
  padding: 10px; /* 宫格内边距 */
  box-sizing: border-box; /* 确保内边距和边框不影响总体大小 */
  background-color: #e0e0e0; /* 宫格背景颜色 */
  background-color: rgba(255, 255, 255, 1);
  border-radius: 25.348837209302324rpx;
  width: 90%; /* 设定为 80% 的宽度 */
  margin: 0 auto; /* 居中对齐 */
  margin-bottom: 10px;
}

.icon-house {
  align-self: center;
  width: 40rpx;
  height: 40rpx;
  margin-right: 1.744186046511628rpx;
}


/* 下单说明控件样式 */
.order-instructions {
  /* margin-top: 20px; */ /* 与 grid-wrapper 的间距 */
  /* padding: 20px; /* 内边距 */
  background-color: white; /* 背景颜色 */
 /* border: 1px solid #ddd; */ /* 边框 */
  border-radius: 5px; /* 圆角 */
  width: 85%; /* 设定为 80% 的宽度 */
  margin: 0 auto; /* 居中对齐 */
  height: 446rpx; 
}

.instructions-title {
  font-size: 34rpx; /* 标题字体大小 */
  font-weight: bold; /* 标题加粗 */
  margin-bottom: 10px; /* 标题与内容的间距 */
  padding: 20rpx 15rpx;
  
}

.instructions-content {
  font-size: 25rpx; /* 内容字体大小 */
  line-height: 1.5; /* 行高 */
  padding: 1rpx 15rpx;;
  margin: 10rpx auto;
}

</style>