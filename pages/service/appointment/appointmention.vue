<template>

	<view class="container">
		<!-- 		<uni-section title="  必填项  " type="line">

		</uni-section> -->
		<view class="caption">必填项 </view>
		<view class="container_1">
			<!-- 基础用法，不包含校验规则 -->
			<div class="wrapper_2">
				<div class="group_2">
					<text class="nickname" :index="25">*姓名 </text> <text class="nickname_next" :index="24">请输入姓名 </text>
				</div>
				<image class="divider" :index="23" src="/static/images/images-point/img_8.png" />
				<div class="group_3">
					<text class="nickname_1" :index="22">*年龄 </text> <text class="nickname_next_1" :index="21">37
					</text>
				</div>
			</div>
			<div class="wrapper_3">
				<image class="divider_1" :index="20" src="/static/images/images-point/img_9.png" />
				<div class="group_4">
					<text class="nickname_2" :index="19">*性别 </text>
					<div class="view_2">
						<text class="caption_1" :index="18">男 </text>
						<image class="icon_right" :index="17" src="/static/images/images-point/img_10.png" />
					</div>
				</div>
			</div>
			<image class="divider_2" :index="15" src="/static/images/images-point/img_11.png" />
			<div class="wrapper_4">
				<text class="nickname_3" :index="14">*地址 </text>
				<image class="icon_user" :index="16" src="/static/images/images-point/img_12.png" />
			</div>
			<image class="divider_3" :index="13" src="/static/images/images-point/img_13.png" />
			<div class="wrapper_5">
				<div class="group_5">
					<text class="nickname_4" :index="12">*详细地址 </text>
					<text class="nickname_next_2" :index="11">请输入详细地址 </text>
				</div>
				<image class="divider_4" :index="10" src="/static/images/images-point/img_14.png" />
			</div>
			<div class="wrapper_6">
				<div class="group_6">
					<text class="nickname_5" :index="9">*联系电话 </text>
					<text class="nickname_next_3" :index="8">请输入手机号码 </text>
				</div>
				<image class="divider_5" :index="7" src="/static/images/images-point/img_15.png" />
			</div>
			<div class="wrapper_7">
				<div class="group_7">
					<text class="nickname_6" :index="6">*紧急联系人 </text>
					<text class="nickname_next_4" :index="5">请输入紧急联系人 </text>
				</div>
				<image class="divider_6" :index="4" src="/static/images/images-point/img_16.png" />
				<div class="group_8">
					<text class="caption_2" :index="3">预约时间 </text>
					<div class="view_3">
						<image class="icon_circle_1" :index="1" src="/static/images/images-point/img_17.png" />
						<text class="title_2" :index="2">2025-04-16 19:26:37 </text>
					</div>
				</div>
			</div>

		</view>

		<div class="block_1">
			<text class="title_3" :index="27">退款说明 </text>
			<div class="body" :index="26">
				<text class="section"
					:index="0">1.套餐内按使用次数计算服务贾，剩余金额退回。2.已发送代金券不子计算不予退还。3.退款均在1-15个工作日内返回到支付账戸。4.凡需立即上门(1小时内)和特殊时间段(21:00-6:00)上门服务的，需另付加急贾50元，否则护士可以柜绝提供服务。修改、取消预约
					1.预约成功后个人原因取消订单，將收取30%的服务贾。2.如需修改请提前3小时通知护士，护士出发后取消订单將收取70%的服务贾。
				</text>
			</div>
			<div class="footer" :index="1">
				<!-- <text class="confirm" :index="0">确定预约 </text> -->
				<button class="confirm" @click="submit('baseForm')">确定预约</button>
				
			</div>
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				service_thumb: "",
				imageUrl: [],
				sourceType: ['camera', 'album'], // 设置来源类型，拍照或相册
				selectedFiles: [], // 用于存储选择的文件信息
				filePath: '', // 存储选择的文件路径
				uploadedFileUrl: '', // 存储上传后的文件 URL
				serviceName: '',
				categoryId: '',
				type: 'exampleValue',
				taocan: '',
				taocanId: '',
				taocanType: '',
				packageId: '',
				consumableId: '',
				isNeedReport: false,
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
				this.isNeedReport = params.isNeedReport;
				this.service_thumb = params.service_thumb;
				if (params.hasOwnProperty('consumableId')) {
					this.consumableId = params.consumableId;
				} else {
					console.log('params 中不包含 consumableId');
				}

				this.packageId = params.packageId;

				if (params.hasOwnProperty('haocaiName')) {
					this.haocaiName = params.haocaiName;
				} else {
					console.log('params 中不包含 haocaiName');
				}

				if (params.hasOwnProperty('haocaiDetail')) {
					this.haocaiDetail = params.haocaiDetail.trim();
				} else {
					console.log('params 中不包含 haocaiDetail');
				}

				const now = new Date();
				const timestamp = now.getTime();
				this.baseFormData.datetimesingle = timestamp;
			}

			uni.hideLoading({
				mask: true
			})

			let mylocation = uni.getStorageSync("address")
			this.baseFormData.address = mylocation || "";
		},
		onShow() {


		},
		onReady() {
			// 设置自定义表单校验规则，必须在节点渲染完毕后执行
			// this.$refs.customForm.setRules(this.customRules)
		},
		methods: {
			select(e) {
				// console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				// console.log('上传进度：', e)
			},

			// 上传成功
			success(res) {
				// console.log('上传成功', res)
			},

			// 上传失败
			fail(e) {
				// console.log('上传失败：', e)
			},

			deleteImage(e) {
				console.log('删除：', e.tempFilePath)
				// this.imageUrl.unshift(e.tempFilePath)
				// console.log("this.imageUrl：",this.imageUrl)
			},

			onFilePickerChange(e) {
				console.log("file:" + file)
				// 处理文件选择后的逻辑，例如更新 selectedFiles
				this.selectedFiles = e.detail.files;
			},
			uploadImage() {
				if (this.selectedFiles.length === 0) {
					uni.showToast({
						title: '请先选择图片',
						icon: 'none'
					});
					return;
				}
				// 获取选择的第一个文件
				const file = this.selectedFiles[0];
				console.log("file:" + file)
				// 使用 uni.uploadFile 或其他方法上传文件
				const uploadTask = uni.uploadFile({
					url: '你的上传接口URL', // 替换为你的上传接口地址
					filePath: file.path,
					name: 'file', // 根据后端接口要求填写
					formData: {
						'user': 'test' // 可以添加额外的表单数据
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes);
						uni.showToast({
							title: '上传成功',
							icon: 'success'
						});
					},
					fail: (err) => {
						console.error(err);
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					}
				});
			},
			/*
						chooseImage() {
							uni.chooseImage({
								count: 1,
								success: (res) => {
									this.filePath = res.tempFilePaths[0];
								}
							});
						},
						uploadImage() {
							const uploadTask = uni.uploadFile({
								url: 'https://yourserver.com/upload', // 替换为你的上传接口 URL
								filePath: this.filePath,
								name: 'file',
								success: (res) => {
									const data = JSON.parse(res.data);
									if (res.statusCode === 200) {
										this.uploadedFileUrl = data.fileUrl; // 假设返回的数据中包含文件 URL
										uni.showToast({
											title: '上传成功',
											icon: 'success'
										});
									} else {
										uni.showToast({
											title: '上传失败',
											icon: 'none'
										});
									}
								},
								fail: (err) => {
									uni.showToast({
										title: '上传失败',
										icon: 'none'
									});
									console.error('上传失败', err);
								}
							});

							uploadTask.onProgressUpdate((res) => {
								console.log('上传进度', res.progress);
								console.log('已经上传的数据长度', res.totalBytesSent);
								console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
							});
						},
						*/

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

				let orderData = {}; {
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
						orderData.package_id = this.packageId,
						orderData.order_thumb = this.service_thumb,
						orderData.is_need_report = this.isNeedReport,
						orderData.laboratory_report = this.imageUrl.map(item => item.url);
				}

				this.addOrder(orderData)
			},

			addOrder(orderData) {
				// 派单

				uniCloud.callFunction({
					name: "nurse-order-add",
					data: orderData,
					success: (res) => {
						// 跳转到支付

						console.log(res)
						console.log("orderData.is_need_report :", orderData.is_need_report)
						let obj = {
							totalFee: orderData.total_fee,
							userName: orderData.userName,
							serviceId: orderData.service_id,
							serviceName: orderData.title,
							orderId: res.result.data,
							isNeedReport: orderData.is_need_report,
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
	.container {
		// margin-top: 190rpx; /* 下移 60 像素 */
		background-color: #f7f8fa;
	}

	.caption {
		background-color: #f7f8fa;
		align-self: flex-start;
		overflow: hidden;
		height: 100%;
		max-width: 100%;
		font-family: 'MiSans-Demibold';
		font-size: 34rpx;
		font-style: normal;
		font-weight: 400;
		line-height: 41rpx;
		color: rgba(0, 0, 0, 1);
		text-align: left;
		text-decoration: none;
		letter-spacing: 0.96rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 0rpx 0rpx;
		padding: 30rpx 30rpx;
	}

	.container_1 {
		display: flex;
		bottom: 0;
		flex-direction: column;
		overflow: auto;
		width: 95%;
		padding: 35rpx 20rpx 0;
		border: 1rpx solid rgba(0, 0, 0, 1);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 26rpx;
		box-sizing: border-box;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		margin-left: 20rpx;

		.wrapper_2 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-self: center;
			width: 100%;
			box-sizing: border-box;

			.group_2 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				box-sizing: border-box;

				.nickname {
					align-self: center;
					margin-left: 3rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(255, 1, 1, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.nickname_next {
					align-self: center;
					font-family: 'MiSans-Medium';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(101, 101, 101, 1);
					text-align: right;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}
			}

			.divider {
				align-self: flex-start;
				width: 100%;
				height: 4rpx;
				margin-top: 23rpx;
			}

			.group_3 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				padding: 22rpx 0;
				box-sizing: border-box;

				.nickname_1 {
					align-self: center;
					margin-left: 3rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(255, 1, 1, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.nickname_next_1 {
					align-self: center;
					margin-top: 1rpx;
					font-family: 'MiSans-Medium';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(101, 101, 101, 1);
					text-align: right;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}
			}
		}

		.wrapper_3 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-self: center;
			width: 100%;
			box-sizing: border-box;

			.divider_1 {
				align-self: flex-start;
				width: 100%;
				height: 4rpx;
			}

			.group_4 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				padding: 22rpx 0;
				box-sizing: border-box;

				.nickname_2 {
					align-self: center;
					margin: 0 0 1rpx 3rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(255, 1, 1, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.view_2 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-self: center;
					width: 56rpx;
					margin: 1rpx -2rpx 0 0;
					box-sizing: border-box;

					.caption_1 {
						align-self: center;
						font-family: 'MiSans-Medium';
						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 41rpx;
						color: rgba(101, 101, 101, 1);
						text-align: right;
						text-decoration: none;
						letter-spacing: 0.84rpx;
						white-space: nowrap;
					}

					.icon_right {
						align-self: center;
						width: 20rpx;
						height: 29rpx;
					}
				}
			}
		}

		.divider_2 {
			align-self: center;
			width: 100%;
			height: 4rpx;
		}

		.wrapper_4 {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-self: center;
			width: 100%;
			padding: 27rpx 0 26rpx;
			box-sizing: border-box;

			.nickname_3 {
				align-self: center;
				margin: 0 0 1rpx 3rpx;
				font-family: 'MiSans-Demibold';
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 28rpx;
				color: rgba(255, 1, 1, 1);
				text-align: left;
				text-decoration: none;
				letter-spacing: 0.84rpx;
				white-space: nowrap;
			}

			.icon_user {
				align-self: center;
				width: 34rpx;
				height: 32rpx;
				margin-right: -1rpx;
			}
		}

		.divider_3 {
			align-self: center;
			width: 100%;
			height: 4rpx;
		}

		.wrapper_5 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-self: center;
			width: 100%;
			margin-top: 22rpx;
			box-sizing: border-box;

			.group_5 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				box-sizing: border-box;

				.nickname_4 {
					align-self: center;
					margin-left: 3rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(255, 1, 1, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.nickname_next_2 {
					align-self: center;
					margin-top: 1rpx;
					font-family: 'MiSans-Medium';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(101, 101, 101, 1);
					text-align: right;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}
			}

			.divider_4 {
				align-self: flex-start;
				width: 100%;
				height: 4rpx;
				margin-top: 23rpx;
			}
		}

		.wrapper_6 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-self: center;
			width: 100%;
			margin-top: 23rpx;
			box-sizing: border-box;

			.group_6 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				box-sizing: border-box;

				.nickname_5 {
					align-self: center;
					margin-left: 3rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(255, 1, 1, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.nickname_next_3 {
					align-self: center;
					margin-right: 1rpx;
					font-family: 'MiSans-Medium';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(101, 101, 101, 1);
					text-align: right;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}
			}

			.divider_5 {
				align-self: flex-start;
				width: 100%;
				height: 4rpx;
				margin-top: 23rpx;
			}
		}

		.wrapper_7 {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-self: center;
			width: 100%;
			margin-top: 23rpx;
			box-sizing: border-box;

			.group_7 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				box-sizing: border-box;

				.nickname_6 {
					align-self: center;
					margin-left: 3rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(255, 1, 1, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.nickname_next_4 {
					align-self: center;
					font-family: 'MiSans-Medium';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(101, 101, 101, 1);
					text-align: right;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}
			}

			.divider_6 {
				align-self: flex-start;
				width: 100%;
				height: 4rpx;
				margin-top: 23rpx;
			}

			.group_8 {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-self: flex-start;
				width: 100%;
				padding: 23rpx 1rpx 34rpx;
				box-sizing: border-box;

				.caption_2 {
					align-self: flex-end;
					margin-left: 2rpx;
					font-family: 'MiSans-Demibold';
					font-size: 28rpx;
					font-style: normal;
					font-weight: 400;
					line-height: 41rpx;
					color: rgba(0, 0, 0, 1);
					text-align: left;
					text-decoration: none;
					letter-spacing: 0.84rpx;
					white-space: nowrap;
				}

				.view_3 {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-self: flex-end;
					width: 319rpx;
					height: 40rpx;
					padding: 2rpx 0;
					box-sizing: border-box;

					.icon_circle_1 {
						align-self: center;
						width: 30rpx;
						height: 30rpx;
					}

					.title_2 {
						align-self: center;
						font-family: 'MiSans-Medium';
						font-size: 28rpx;
						font-style: normal;
						font-weight: 400;
						line-height: 41rpx;
						color: rgba(101, 101, 101, 1);
						text-align: right;
						text-decoration: none;
						letter-spacing: 0;
						white-space: nowrap;
					}
				}
			}
		}
	}

	.block_1 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-self: flex-start;
		width: 100%;
		padding: 0 20rpx;
		margin-top: 20rpx;
		box-sizing: border-box;

		.title_3 {
			align-self: flex-start;
			overflow: hidden;
			max-width: 100%;
			margin-left: 19rpx;
			font-family: 'MiSans-Demibold';
			font-size: 32rpx;
			font-style: normal;
			font-weight: 400;
			line-height: 41rpx;
			color: rgba(0, 0, 0, 1);
			text-align: left;
			text-decoration: none;
			letter-spacing: 0.96rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.body {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-self: center;
			overflow: auto;
			width: 100%;
			padding: 20rpx 12rpx;
			border: 1rpx solid rgba(0, 0, 0, 1);
			margin: 23rpx 1rpx 0 0;
			background-color: rgba(255, 255, 255, 1);
			border-radius: 26rpx;
			box-sizing: border-box;

			.section {
				align-self: flex-start;
				overflow: hidden;
				width: 100%;
				height: 323rpx;
				margin-left: 20rpx;
				font-family: 'MiSans-Regular';
				font-size: 24rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 36rpx;
				color: rgba(102, 102, 102, 1);
				text-align: left;
				text-decoration: none;
				letter-spacing: 0;
				white-space: break-spaces;
				text-overflow: ellipsis;
				webkit-line-clamp: 7;
				webkit-box-orient: vertical;
			}
		}

		.footer {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-self: center;
			overflow: auto;
			width: 100%;
			padding: 25rpx 12rpx 24rpx;
			border: 1rpx solid rgba(0, 0, 0, 1);
			margin: 47rpx 1rpx 0 0;
			background-color: rgba(28, 105, 237, 1);
			border-radius: 16rpx;
			box-sizing: border-box;

			.confirm {
				align-self: flex-start;
				overflow: hidden;
				max-width: 100%;
				margin-right: 2rpx;
				font-family: 'MiSans-Medium';
				font-size: 28rpx;
				font-style: normal;
				font-weight: 400;
				line-height: 29rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				text-decoration: none;
				letter-spacing: 0.84rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
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
		height: 40px;
		/* 设置按钮高度为14像素 */
		background-color: #1cbbb4;
		;
		/* 设置背景色为粉色 */
		color: #fff;
		/* 设置字体颜色为白色 */
		border: none;
		/* 移除按钮边框 */
		padding: 1px 10px;
		/* 设置按钮内边距 */
		border-radius: 5px;
		/* 添加圆角 */
		cursor: pointer;
		/* 设置鼠标指针为手型 */
		font-size: 16px;
		position: fixed;
		/* 设置按钮的定位方式为固定定位 */
		bottom: 0;
		/* 将按钮定位在页面底部 */
		left: 0;
		/* 将按钮置于页面左侧 */
		width: 100%;
		/* 让按钮占据整个页面宽度 */
	}

	.popup-content {
		color: #FF8F91;
		font-weight: bold;
		margin-bottom: 2px;
		//text-align: center;  
		margin-left: 6px;
		/* 左外边距 */
		margin-right: 6px;
		/* 右外边距 */
		font-size: 13px;
		padding: 4px;
		/* 添加内边距 */
	}

	.amount {
		flex: 1;
		height: 40px;
		/* 设置按钮高度为14像素 */
		background-color: #1cbbb4;
		/* 设置背景色为粉色 */
		color: #fff;
		/* 设置字体颜色为白色 */
		/* border: none; */
		/* 移除按钮边框 */
		/* padding: 1px 1px; */
		/* 设置按钮内边距 */
		// border-radius: 5px; /* 添加圆角 */
		cursor: pointer;
		/* 设置鼠标指针为手型 */
		font-size: 16px;
		position: fixed;
		/* 设置按钮的定位方式为固定定位 */
		bottom: 40px;
		/* 将按钮定位在页面底部 */
		right: 0;
		/* 将按钮置于页面右侧 */
		margin-right: 0px;
		/* 设置按钮距离页面右侧的距离 */
		width: 100%
	}

	.price {
		font-size: 15px;
		color: #FF8F91;
		margin-bottom: 5px;
		/* 设置各项之间的垂直间距 */
		font-weight: bold;
		/* 设置价格文字加粗 */
	}
</style>