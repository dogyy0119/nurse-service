<template>
  <view>
	  <view>
	    <div class="flex-container">
	      <!-- <button class="cacel-btn" @click="cancel">取消</button> -->
			<button class="ok-btn" :class="{ 'ok-btn-hidden': shouldHideOkButton }" @click="ok">确定</button>  

	    </div>
		
		<div class="flex-container">
		  <!-- <button class="cacel-btn" @click="cancel">取消</button> -->
			<button class="position-btn" :class="{ 'position-btn-hidden': shouldHidePositionButton }" @click="positionSet">确定</button>  
		
		</div>
		
	  </view>
  <view>
    <Citylist :getCity="getCity"></Citylist>
	<!-- <citySelect @back_city="back_city"> </citySelect> -->
  </view>


  </view>
</template>

<script>
	import Citylist from '@/components/bazaar-city_list/index.vue'
	// import citySelect from '@/components/linzq-citySelect/linzq-citySelect.vue';


	//注册组件
	export default {
	    components:{
	        Citylist,
			// citySelect,
	    },
		data() {  
		    return {  
		      // 假设这是控制按钮是否隐藏的数据属性  
		      shouldHideOkButton: true ,// 设置为true将隐藏按钮  
			  shouldHidePositionButton: true,
		    }  
		},  
		onLoad() {
			// this.getdad();
			this.checkLocationPermission()
			
		},
	    methods:{
			checkLocationPermission() {  
			    uni.getSetting({  
			        success: (res) => {  
			          // 检查是否授权了位置信息  
			          if (res.authSetting['scope.userLocation']) {  
			            // 用户已授权  
			            console.log('已授权定位权限');  
			            // 在这里可以调用需要定位权限的 API，如 uni.getLocation  
			          } else {  
			            // 用户未授权  
			            console.log('未授权定位权限');  
			            // 你可以在这里调用 uni.openSetting 来引导用户去设置页面授权  
			            uni.showModal({  
			              title: '提示',  
			              content: '需要您授权定位信息才能正常使用功能，请前往设置页面授权',  
			              showCancel: false,  
			              success: (modalRes) => {  
							if (modalRes.confirm) {  
			                  uni.openSetting({
			                      success: function (res) {  
										console.log('设置页面已打开'); 
			                      },  
			                      fail: function (err) {  
										console.error('打开设置页面失败', err); 
			                      }  
			                  });  
			                }  
			              }  
			            });  
			          }  
			        },  
			        fail: (err) => {  
						console.error('获取设置失败', err); 
						this.shouldHidePositionButton = false;
			        }  
			    });  
			},
			
			getdad() {
				uni.authorize({
				    scope:'scope.userLocation',
				    success:function(){
				        console.log("授权地理位置：成功");
				    },
				    fail:function(){
				        console.log("授权地理位置：失败");
				    }
				});
			},
			
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
			},
			
			positionSet() {
				uni.openSetting({
				    success: function (res) {  
						console.log('设置页面已打开');  
				    },  
				    fail: function (err) {  
						console.error('打开设置页面失败', err);   
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
			font-size: 20px;		
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
			font-size: 20px;		    
		}
		
		.ok-btn-hidden {  
			display: none;  
		}
		
		.position-btn {
			flex: 1; 
			height: 40px; /* 设置按钮高度为14像素 */
		    background-color: #1cbbb4;; /* 设置背景色为粉色 */
		    color: #fff; /* 设置字体颜色为白色 */
		    // border: none; /* 移除按钮边框 */
		    // padding: 1px 1px; /* 设置按钮内边距 */
		    border-radius: 5px; /* 添加圆角 */
		    // cursor: pointer; /* 设置鼠标指针为手型 */
			font-size: 20px;		    
		}
		
		.position-btn-hidden{
			display: none;
		}
	}

</style>
