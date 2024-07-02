<template>
	<view>
		<view class="detail">			
			<view class="pic">
				<image :src="detailObj.service_thumb" mode="widthFix"></image>
			</view>
			
			<uni-section :title="detailObj.name" type="line">
				<view class="example-body">
					<view class="price" >总价￥：{{detailObj.price}}</view>
					<!-- <uni-fav :checked="checkList[0]" class="favBtn" :circle="true" bg-color="#dd524d"
						bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick(0)" />	 -->				
				</view>
			</uni-section>
<!-- 		<view class="title">
				<view class="price" >￥：{{detailObj.price}}</view>
			</view> -->
			<view class="tool">
				<view class="author">时长：{{detailObj.service_time}}</view>
				<view class="author">服务详情：{{detailObj.service_desc}}</view>
				<view class="author">发布时间：{{detailObj._add_time_str}}</view>
				<view class="author">套餐选择:</view>
				<view class="uni-px-5">
					<!-- <view class="text">选中：{{taocan[taocanValue].text}}</view> -->
					<uni-data-checkbox mode="tag" v-model="taocanValue" :localdata="taocan" @change="taocanCheckboxChange(taocanValue)"></uni-data-checkbox>
				</view>
				<view class="author">￥：{{detailObj.price}}</view>

			</view>
					
			<view class="tool">		
				<view class="author">选择耗材：</view>
				<!-- <uni-section type="line"> -->
				<view class="uni-px-5">
						<!-- <view class="text">{{JSON.stringify(haocaiValue)}}</view> -->
					<uni-data-checkbox mode="button" v-model="haocaiValue" :localdata="sex" @change="haochaiCheckboxChange(haocaiValue)"></uni-data-checkbox>
				</view>
				<view class="price">￥：{{customPrice}}</view>
				<view class="author">类型：{{toolObj[toolIndex].name}}</view>
				<view class="author">详细：{{toolObj[toolIndex].detail}}</view>
				<!-- </uni-section> -->
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
			
			<div class="flex-container">
				<button class="amount" @click="toggle('bottom')" >金额:￥{{totalPrice}} 详情...</button>
			    <button class="reserve-btn" @click="goToAppointment">立即预约</button>
			</div>
			
<!-- 			<view class="goods-carts">
				<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view> -->
			
		</view>
		
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change" border-radius="10px 10px 0 0">
				<!-- <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
						class="author">套餐: {{taocan[taocanValue].text}}</text></view>
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
						class="author">耗材类型：{{toolObj.name}}</text></view>
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
						class="author">耗材详细：{{toolObj.detail}}</text></view> -->
				<view class="tan-taocan">套餐：{{taocan[taocanValue].text}}</view>
				<view class="tan-desc">耗材类型：{{toolObj[toolIndex].name}}</view>
				<view class="tan-desc">类型：{{toolObj[toolIndex].detail}}</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {parseTime} from '@/utils/tool.js'
	
	let options;
	export default {
		data() {
			return {
				type: '',
				cityName: "",
				checkList: [false, false, false, false, false, false],
				detailObj:{},
				toolObj: [
					{
						_id: '',
						name: '耗材1',
						value: 0,
						price: 100,
						detail: ''
					}, {
						_id: '',
						name: '耗材2',
						value: 1,
						price: 200,
						detail: ''
					}
				],
				toolIndex: 1,
				taocanValue: 0,
				taocanType: '',
				serviceId: '',
				packageList: [],
				consumableList: [],
				price: 0,
				customPrice: 0,
				totalPrice: 0,
				sex: [{
					text: '购买耗材',
					value: 0
				}, {
					text: '自带耗材',
					value: 1
				}],
				haocaiValue: 0,
				taocan: [
					{
						text: '套餐1',
						value: 0,
						price: 100
					}, {
						text: '套餐2',
						value: 1,
						price: 200
					}
				]
			};
		},
		onLoad(event) {

			console.log(event.item)
			console.log(event)
			
			this.serviceId = event.item
		    this.getDetail(event.item);
		    // await this.getConsumaList(options);
				
		    // this.getPackageList(this.detailObj.package_list);
		},
		mounted() {
			    this.calculateTotalPrice();
		},
		methods:{
			toggle(type) {
				console.log("type:" + type)
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			goToAppointment() {
				
				let obj = { 
					serviceName: this.detailObj.name,
					categoryId: this.detailObj.category_id,
					totalPrice: this.totalPrice,
					taocan: this.taocan[this.taocanValue].text,
					taocanId: this.serviceId ,
					taocanType: this.taocanType,
					consumableId: this.toolObj[this.toolIndex]._id,
					packageId: this.packageList,
					haocaiName: this.toolObj[this.toolIndex].name,
					haocaiDetals: this.toolObj[this.toolIndex].detail,	
				};
				let params = encodeURIComponent(JSON.stringify(obj)); // 将对象转换为字符串并进行URL编码
				
				// uni.navigateTo({
				//     url: 'pages/example?params=' + params
				// });
				
				uni.navigateTo({
					// url: `/pages/appointment/appointment?totalPrice=${this.totalPrice}`,
					url: '/pages/service/appointment/appointment?params=' + params,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			calculateTotalPrice() {
				 this.price = this.taocan[0].price
			    if(this.haocaiValue === 0) {
			        this.totalPrice = this.price + this.customPrice;
			    } else if (this.haocaiValue === 1) {
			        this.totalPrice = this.price;
			    }
			},
			taocanCheckboxChange(value) {
				 console.log('选中的值：', value);
				 console.log(this.taocan[value].price)
				 if(this.haocaiValue==0) {
					this.price = this.taocan[value].price
				 	this.totalPrice = this.price + this.customPrice
				 } else if (this.haocaiValue==1) {
					this.price = this.taocan[value].price 
				 	this.totalPrice = this.price
				 }
			},
			haochaiCheckboxChange(value) {
			        // 处理点击事件，value 是选中的值
			        console.log('选中的值：', value);
			        // 在这里执行你想要的逻辑
					if(this.haocaiValue==0) {
						this.totalPrice = this.price + this.customPrice
					} else if (this.haocaiValue==1) {
						this.totalPrice = this.price
					}
			},
			backToTop() {
				uni.switchTab({
				    url: '/pages/index/index'
				})
			},
			favClick(index) {
				this.checkList[index] = !this.checkList[index]
				console.log(this.checkList[index]);
				this.$forceUpdate()
			},
			
			//获取详情
			getDetail(serviceid){
				uniCloud.callFunction({
				    name: "nurse-service-getid",
				    data: {						
				        id:serviceid 
				    },
				    success: (res) => {
						this.loading=2
						// console.log(res.result.data[0].service_banner_imgs)
						console.log(res.result.data);
						
						this.detailObj = res.result.data[0]
						this.price = this.detailObj.price
						this.totalPrice = this.customPrice + this.price
						this.taocanType = this.detailObj.category_id
						this.packageList = this.detailObj.package_list
						this.consumableList = this.detailObj.consumable_list
						
						//
						this.getPackageList(this.detailObj.package_list);
						
						console.log("-------------------------------------------")
						console.log(this.consumableList)
						// 获取耗材
						this.getConsumaList(this.consumableList)
						
						
					},
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        console.log("请求完成");
				    }
				});								
			},
			
			// 获取耗材
			getConsumaList(consumableList){
				console.log(consumableList)
				// let consumableid = "66496ec0ee97ef5896909378"
				// consumableid = options || "66496ec0ee97ef5896909378"
				uniCloud.callFunction({
				    name: "nurse-service-consumable-ids",
				    data: {						
				        ids: consumableList 
				    },
				    success: (res) => {
						this.loading=2
						console.log(consumableList)
						console.log(res.result.data);
						
						this.toolObj = [];
						let i = 0;
						res.result.data.forEach(item => {
							this.toolObj.push({
								'_id' : item._id,
								'name': item.name,
								'value': i,
								'price': item.price,
								'detail': item.detail
							});
							console.log("i:" + i)
							i = i+1;
						});
						console.log(this.toolObj);
						
						// this.toolObj = res.result.data
						// this.customPrice = this.toolObj[this.toolIndex].price
						// this.totalPrice = this.customPrice + this.price

				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        console.log("请求完成");
				    }
				});
			},
			
			//
			getPackageList(packageIds){
				
				// console.log( "packageIds:" + packageIds)
				console.log( "packageList:" + this.packageList)
				uniCloud.callFunction({
				    name: "nurse-service-package-getids",
				    data: {						
				        ids: packageIds
				    },
				    success: (res) => {
						this.loading=2
						
						// console.log(res.result.data);
						
						this.taocan = [];
						let i = 0;
						res.result.data.forEach(item => {
							this.taocan.push({
								'text': item.name,
								'value': i,
								'price': item.price,
							});
							console.log("i:" + i)
							i = i+1;
						});
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
	
	/* 假设 <uni-section> 的标题有一个名为 .uni-section-title 的类名 */  
	
	
	.popup-height {
		// @include height;
		width: 100px;
	}
	.popup-content {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 15px;
		font-size: 10px;
	}
	
	.text {
		font-size: 10px;
		color: #333;
	}
	
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
		color: #FF8F91;
		background: #fff;
		line-height: 1.6em;
		.name {
			
		}
		.price {
			color: #FF8F91;
			padding:0 10rpx;
			margin:20rpx 0;
			background: #f6f6f6;
			font-size: 16rpx;
			color: #DD524D;
			// line-height: 1.6em;
		}
	}
		
	.tool {
	    display: flex;
		color: #FF8F91;
	    flex-direction: column; /* 设置flex子项垂直排列 */
	    align-items: flex-start; /* 子项在水平方向上从左侧开始对齐 */
	    justify-content: flex-start; /* 子项在垂直方向上从顶部开始排列 */
	    padding: 10px; /* 添加内边距 */
	    border: 1px solid #ccc; /* 添加边框 */
	    border-radius: 5px; /* 添加圆角 */
	    margin-bottom: 20px; /* 添加底部间距 */
	}
	
	.author{
		font-size: 14px;
		font-weight: bold;
		color: #FF8F91;
		margin-bottom: 5px; /* 设置各项之间的垂直间距 */
	}
	.price {
		font-size: 15px;
		color: #FF8F91;
	    margin-bottom: 5px; /* 设置各项之间的垂直间距 */
		font-weight: bold; /* 设置价格文字加粗 */
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
	
	.text {
		font-size: 12px;
		color: #FF8F91;
		margin-top: 5px;
	}
	
	.uni-px-5 {
		padding-left: 1px;
		padding-right: 10px;
	}
	
	.uni-pb-5 {
		padding-bottom: 10px;
	}
	
	.flex-container {
	    display: flex;
	    justify-content: space-between; /* 将元素分别放在行的两端 */
	    align-items: center; /* 垂直居中对齐 */
		width: 100%; /* 让.flex-container占据其父元素的整个宽度 */

		.reserve-btn {
			flex: 1; 
			height: 34px; /* 设置按钮高度为14像素 */
		    background-color: #1CBBB4; /* 设置背景色为粉色 */
		    color: #fff; /* 设置字体颜色为白色 */
		    border: none; /* 移除按钮边框 */
		    padding: 1px 10px; /* 设置按钮内边距 */
		    border-radius: 5px; /* 添加圆角 */
		    cursor: pointer; /* 设置鼠标指针为手型 */
			font-size: 14px;		
		}
		
		.amount {
			flex: 1; 
			height: 34px; /* 设置按钮高度为14像素 */
		    background-color: #1CBBB4; /* 设置背景色为粉色 */
		    color: #fff; /* 设置字体颜色为白色 */
		    // border: none; /* 移除按钮边框 */
		    // padding: 1px 1px; /* 设置按钮内边距 */
		    border-radius: 5px; /* 添加圆角 */
		    // cursor: pointer; /* 设置鼠标指针为手型 */
			 font-size: 14px;		    
		}
	}
	
	.amount {
		flex: 1; 
		height: 34px; /* 设置按钮高度为14像素 */
	    background-color: #FF8F91; /* 设置背景色为粉色 */
	    color: #fff; /* 设置字体颜色为白色 */
	    // border: none; /* 移除按钮边框 */
	    // padding: 1px 1px; /* 设置按钮内边距 */
	    border-radius: 5px; /* 添加圆角 */
	    // cursor: pointer; /* 设置鼠标指针为手型 */
		 font-size: 14px;		    
	}

	
	  	
}


	.popup-content { 
	  padding: 20px; /* 添加内边距 */  
	  text-align: center; /* 让内容居中 */  
	}  
	  
	.tan-taocan {  
		color: #FF8F91; /* 字体颜色 */  
		font-size: 16px; /* 字体大小 */  
		font-weight: bold; /* 字体加粗 */  
		margin-bottom: 10px; /* 下边距 */  
		text-align: center; /* 水平居中 */  
		display: block; /* 确保是块级元素，如果已经是块级元素可以省略 */  
		padding: 10px 0; /* 上下内边距，用于增加空间感 */  
		border-bottom: 1px solid #ddd; /* 底部边框，用于分隔内容 */  
		/* ... 其他样式 ... */
		background-color: #f8f9fa; /* 淡灰色背景 */  
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 底部阴影效果 */  
	}  
  	  
	.tan-desc { 
		color: #FF8F91;
		font-size: 15px;  
		font-weight: bold;  
		margin-bottom: 8px;  
		//text-align: center;  
		margin-left: 6px; /* 左外边距 */  
		margin-right: 6px; /* 右外边距 */  
		padding: 0 12px; /* 上下为0，左右为10px */  
	}  

</style>