<template>
  <view>
	  <view>
	    <div class="flex-container">
	      <!-- <button class="cacel-btn" @click="cancel">取消</button> -->
	      <button class="ok-btn" @click="ok">确定</button>
	    </div>
	  </view>
  <view>
    <Citylist :getCity="getCity"></Citylist>
  </view>

  </view>
</template>

<script>
	import Citylist from '@/components/bazaar-city_list/index.vue'
	
	//注册组件
	export default {
	    components:{
	        Citylist,
	    },
	    methods:{
	        getCity(city,address){
				console.log("city:" + city)
				console.log("address:" + address)
				uni.setStorageSync("location",city)
				//uni.setStorageSync("address",city + address)
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
			
			cancel() {
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
			
			ok() {
				uni.switchTab({
				  url: '/pages/index/index',
				  success: (res) => {
				    // Handle success if needed
				  },
				  fail: (err) => {
				    // Handle failure if needed
				  }
				});
			}
	    }
	}
</script>

<style lang="scss">

	.flex-container {
	    display: flex;
	    justify-content: space-between; /* 将元素分别放在行的两端 */
	    align-items: center; /* 垂直居中对齐 */
		width: 100%; /* 让.flex-container占据其父元素的整个宽度 */

		.cacel-btn {
			flex: 1; 
			height: 40px; /* 设置按钮高度为14像素 */
		    background-color: #ff69b4;; /* 设置背景色为粉色 */
		    color: #fff; /* 设置字体颜色为白色 */
		    border: none; /* 移除按钮边框 */
		    padding: 1px 10px; /* 设置按钮内边距 */
		    border-radius: 5px; /* 添加圆角 */
		    cursor: pointer; /* 设置鼠标指针为手型 */
			font-size: 12px;		
		}
		
		.ok-btn {
			flex: 1; 
			 height: 40px; /* 设置按钮高度为14像素 */
		    background-color: #ff69b4;; /* 设置背景色为粉色 */
		    color: #fff; /* 设置字体颜色为白色 */
		    // border: none; /* 移除按钮边框 */
		    // padding: 1px 1px; /* 设置按钮内边距 */
		    border-radius: 5px; /* 添加圆角 */
		    // cursor: pointer; /* 设置鼠标指针为手型 */
			 font-size: 12px;		    
		}
	}

</style>
