<template>
	
	<view class="container">
		<uni-section title="  必填项  " type="line">
			
		</uni-section>
		
		<view class="example">
			<!-- 基础用法，不包含校验规则 -->
			<uni-forms ref="baseForm"  :rules="customRules" :model="baseFormData" labelWidth="80px">
				<uni-forms-item label="姓名" required>
					<uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="身份证" required>
					<uni-easyinput v-model="baseFormData.sfid" placeholder="请输入身份证号" />
				</uni-forms-item>

				<uni-forms-item label="地址" required>
					<uni-easyinput v-model="baseFormData.address" placeholder="请输入服务位置信息" />
				</uni-forms-item>

				<uni-forms-item label="联系电话" required>
					<uni-easyinput v-model="baseFormData.phoneNum" placeholder="请输入手机号码" />
				</uni-forms-item>
		
				<uni-forms-item label="预约时间" >
					<uni-datetime-picker type="datetime" return-type="timestamp"
						v-model="baseFormData.datetimesingle" />
				</uni-forms-item>
								
<!-- 				<uni-forms-item label="选择城市">
					<uni-data-picker v-model="baseFormData.city" :localdata="cityData" popup-title="选择城市">
					</uni-data-picker>
				</uni-forms-item> -->
				
		
			<uni-section title=" 套餐信息:  " type="line">		
				<view class="example-body">
					<view class="price" >￥：{{totalPrice}}</view>
				</view>
			</uni-section>
								
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
						class="text">套餐: {{taocan}}</text>
						</view>
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
						class="text">耗材类型：{{haocaiName}}</text>
						</view>
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }"><text
						class="text">耗材详细：{{haocaiDetail}}</text>
						</view>
				
			</uni-forms>
			<div class="flex-container">
				<button class="reserve-btn" @click="submit('baseForm')">确定预约</button>
				<!-- <button class="amount">金额：￥{{totalPrice}}</button> -->
			</div>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				serviceName: '',
				categoryId: '',
				type: 'exampleValue',
				taocan: '',
				taocanId: '',
				taocanType: '',
				packageId: '',
				consumableId: '',
				// haocaiId: [],
				haocaiName: '',
				haocaiDetail: '',
				totalPrice: 0,
				// 基础表单数据
				baseFormData: {
					name: '',
					sfid: '',
					address: '',
					phoneNum: '',
					datetimesingle: 1627529992399,
					// city: '',
				},
				// 城市数据
				cityData: [{
					text: "北京",
					value: "10001",
				}, {
					text: "上海",
					value: "10002",
				}, {
					text: "深圳",
					value: "10004",
				}],
				
				// 分段器数据
				current: 0,
				items: ['左对齐', '顶部对齐'],
				// 校验表单数据
				valiFormData: {
					name: '',
					age: '',
					introduction: '',
				},
				// 校验规则
				baseRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					sfid: {
						rules: [{
							required: true,
							errorMessage: '身份证不能为空'
						}, {
							format: 'number',
							errorMessage: '身份证只能输入数字'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '地址不能为空'
						}]
					},
					phoneNum: {
						rules: [{
							required: true,
							errorMessage: '联系电话不能为空'
						}, {
							format: 'number',
							errorMessage: '联系电话只能输入数字'
						}]
					}
					
				},
				// 自定义表单数据
				customFormData: {
					name: '',
					sfid: '',
					address: '',
					phoneNum: ''
				},
				// 自定义表单校验规则
				customRules: {
					name: {
						rules: [{
							required: true,
							errorMessage: '姓名不能为空'
						}]
					},
					sfid: {
						rules: [{
							required: true,
							errorMessage: '身份证不能为空'
						}, {
							format: 'number',
							errorMessage: '身份证只能输入数字'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '地址不能为空'
						}]
					},
					phoneNum: {
						rules: [{
							required: true,
							errorMessage: '联系电话不能为空'
						}, {
							format: 'number',
							errorMessage: '联系电话只能输入数字'
						}]
					}

				},
				dynamicFormData: {
					email: '',
					domains: []
				},
				dynamicLists: [],
				dynamicRules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '域名不能为空'
						}, {
							format: 'email',
							errorMessage: '域名格式错误'
						}]
					}
				}
			}
		},
		computed: {
			// 处理表单排列切换
			alignment() {
				if (this.current === 0) return 'left'
				if (this.current === 1) return 'top'
				return 'left'
			}
		},
		onLoad(options) {
			
			uni.showLoading({
			    mask: true
			}) 
			   
		    if (options.params) {
		        let params = JSON.parse(decodeURIComponent(options.params)); // 将URL解码后解析为对象
		        console.log(params);
				this.serviceName = params.serviceName;
				this.categoryId = params.categoryId;
				this.totalPrice = params.totalPrice;
				this.taocan = params.taocan;
				this.taocanId = params.taocanId;
				this.taocanType = params.category_id;
				this.consumableId = params.consumableId;
				this.packageId = params.packageId;
				// this.haocaiId = params.haocaiId;
				this.haocaiName = params.haocaiName;
				this.haocaiDetail = params.haocaiDetail.trim();
				// if (params && params.haocaiDetail) {
				//     this.haocaiDetail = params.haocaiDetail.trim();
				//     console.log(this.haocaiDetail);  // 输出处理后的 haocaiDetail
				// } else {
				//     console.error("params.haocaiDetail 不存在或未定义。");
				// }
				console.log(this.haocaiDetail);
				const now = new Date();
				const timestamp = now.getTime();
				this.baseFormData.datetimesingle = timestamp;
		    }
			
			uni.hideLoading({
				mask: true
			})

		},
		onShow() {
			let mylocation = uni.getStorageSync("address")
			this.baseFormData.address =  mylocation || "";
		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			
			goSubmit() {
				this.$refs.customForm.setRules(this.customRules)				
			},
			onClickItem(e) {
				console.log(e);
				this.current = e.currentIndex
			},
			add() {
				this.dynamicFormData.domains.push({
					label: '域名',
					value: '',
					rules: [{
						'required': true,
						errorMessage: '域名项必填'
					}],
					id: Date.now()
				})
			},
			del(id) {
				let index = this.dynamicLists.findIndex(v => v.id === id)
				this.dynamicLists.splice(index, 1)
			},
			submit(ref) {
				console.log(this.baseFormData);
				// this.$refs[ref].validate().then(res => {
				// 	console.log('success', res);
				// 	uni.showToast({
				// 		title: `校验通过`
				// 	})
				// }).catch(err => {
				// 	console.log('err', err);
				// })
				if (
				  !this.baseFormData.name ||
				  !this.baseFormData.name.trim() || // Additional check to handle whitespace
				  !this.baseFormData.sfid ||
				  !this.baseFormData.phoneNum ||
				  !this.baseFormData.address ||
				  !this.baseFormData.datetimesingle
				) {
				  uni.showToast({
				    title: `校验未通过`
				  });
				  return;
				}
				
				let user_id = uni.getStorageSync('user_id');
								
				// uniCloud.callFunction({
				//     name: "nurse-order-get",
				//     data: orderData,
				//     success: (res) => {
						
				//     },
				//     fail: (err) => {
				//         console.error("请求失败: " + err);
				//     },
				//     complete: (res) => {
				//         console.log("请求完成");
				//     }
				// });	
				
				let orderData = {};
				
				{
				    orderData.title = this.taocan,
				    orderData.type = this.categoryId,
				    orderData.service_id = this.taocanId,
				    orderData.total_fee = this.totalPrice,
				    orderData.user_id = user_id,
				    orderData.servants_name = this.baseFormData.name,
				    orderData.servants_address = this.baseFormData.address,
				    orderData.servants_phone = this.baseFormData.phoneNum,
				    orderData.reservation_time = this.baseFormData.datetimesingle,
				    orderData.nurse_id = "",
				    orderData.nurse_phone = "",
				    orderData.status = 1,
				    orderData.transaction_id = "",
				    orderData.paid_time = "",
				    orderData.info = "",
				    orderData.consumable_id = this.consumableId,
				    orderData.package_id = this.packageId
				}
				
				this.addOrder(orderData)
				
				// let obj = {
				// 	totalFee: this.totalPrice,
				// 	userName: userName,
				// 	serviceId: this.taocanId,
				// 	serviceName: this.taocan
				// };
				// let params = encodeURIComponent(JSON.stringify(obj)); // 将对象转换为字符串并进行URL编码
							
				// uni.navigateTo({
				// 	url: '/pages/function/voucher_center_?params=' + params,
				// 	success: res => {},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			},
			
			addOrder(orderData) {
				// 派单
								
				uniCloud.callFunction({
				    name: "nurse-order-add",
				    data: orderData,
				    success: (res) => {
						// 跳转到支付
						
						console.log( res)
						
						let obj = {
							totalFee: orderData.total_fee,
							userName: orderData.userName,
							serviceId: orderData.service_id,
							serviceName: orderData.title,
							orderId: res.result.data
						};
						let params = encodeURIComponent(JSON.stringify(obj)); // 将对象转换为字符串并进行URL编码
						
						uni.showToast({
						  title: `预约成功`
						});
									
						uni.navigateTo({
							url: '/pages/service/function/voucher_center_?params=' + params,
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						
				    },
				    fail: (err) => {
						uni.showToast({
						  title: `预约失败`
						});
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				        console.log("请求完成");
				    }
				});	
				
			},
		}
	}
</script>

<style lang="scss">
	.container{
		// margin-top: 190rpx; /* 下移 60 像素 */
	}
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		line-height: 35px;
		margin-left: 10px;
	}
	
	.reserve-btn {
	    flex: 1; 
	    height: 40px; /* 设置按钮高度为14像素 */
	    background-color: #1CBBB4;; /* 设置背景色为粉色 */
	    color: #fff; /* 设置字体颜色为白色 */
	    border: none; /* 移除按钮边框 */
	    padding: 1px 10px; /* 设置按钮内边距 */
	    border-radius: 5px; /* 添加圆角 */
	    cursor: pointer; /* 设置鼠标指针为手型 */
	    font-size: 16px;
	    position: fixed; /* 设置按钮的定位方式为固定定位 */
	    bottom: 0; /* 将按钮定位在页面底部 */
	    left: 0; /* 将按钮置于页面左侧 */
	    width: 100%; /* 让按钮占据整个页面宽度 */
	}
	
	.popup-content {
		color: #FF8F91;
		font-weight: bold;  
		margin-bottom: 2px;  
		//text-align: center;  
		margin-left: 6px; /* 左外边距 */  
		margin-right: 6px; /* 右外边距 */  
		font-size: 13px;
		padding: 4px; /* 添加内边距 */	
	}
	
	.amount {
	    flex: 1; 
	    height: 40px; /* 设置按钮高度为14像素 */
	    background-color: #1CBBB4; /* 设置背景色为粉色 */
	    color: #fff; /* 设置字体颜色为白色 */
	    /* border: none; */ /* 移除按钮边框 */
	    /* padding: 1px 1px; */ /* 设置按钮内边距 */
	    // border-radius: 5px; /* 添加圆角 */
	    cursor: pointer; /* 设置鼠标指针为手型 */
	    font-size: 16px;    
	    position: fixed; /* 设置按钮的定位方式为固定定位 */
	    bottom: 40px; /* 将按钮定位在页面底部 */
	    right: 0; /* 将按钮置于页面右侧 */
	    margin-right: 0px; /* 设置按钮距离页面右侧的距离 */
		width: 100%
	}
	
	.price {
		font-size: 15px;
		color: #FF8F91;
	    margin-bottom: 5px; /* 设置各项之间的垂直间距 */
		font-weight: bold; /* 设置价格文字加粗 */
	}
	
</style>
