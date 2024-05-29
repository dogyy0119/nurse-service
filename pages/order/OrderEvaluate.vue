<template>
	<view class="page_pingjia2">
		<view class="zhuti">
			<view class="touxiang">
				<u--image :showLoading="true" :src="evaluateForm.picUrl" width="80px" height="80px" @click="click"></u--image>
			</view>
			<view class="heti">
				<view class="heti-title">{{evaluateForm.odName}}</view>
				<view class="heti-title ht-price">￥{{evaluateForm.odPrice}}</view>
				<view class="text-rate">
					<view class="miaoshu" style="font-size: 12px;">服务评价</view>
					<view class="ve-rate">
						<u-rate :count="5" v-model="evaluateForm.rateCount" :allowHalf="true" activeColor="#FE8938" :gutter="0"></u-rate>
					</view>
				</view>
			</view>
		</view>
		<view class="dianping">
			<view class="kuang">
				<u-textarea placeholder="请输入您的评价"
					v-model="evaluateForm.content" height="100" :maxlength="-1" confirmType="done"></u-textarea>
				<u-upload class="up-load" :fileList="fileList1" @afterRead="afterEvent" @delete="deleteEvent" name="1" multiple
					:maxCount="9" action='链接地址'></u-upload>
			</view>
			<view class="sub-btn">
				<view class="sub-btn-tijiao" @tap="submitTap">提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: [],
				evaluateForm: {
					src: require('../../static/logo.png'),
					title: "",
					content: "",
					rateCount: 0
				},
			}
		},
		onLoad(event) {
			const payload = event.detailDate || event.payload;
			try {
				this.evaluateForm = JSON.parse(decodeURIComponent(payload));
			} catch (error) {
				this.evaluateForm = JSON.parse(payload);
			}
			this.evaluateForm.rateCount = 0;
			console.log("OE接受参数---",this.evaluateForm);

		},
		methods: {
			// 删除图片
			deleteEvent(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterEvent(event) {
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFileFun(lists[i].thumb)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFileFun(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://127.0.0.1:8080/upload',
						filePath: url,
						name: 'file',
						formData: {user: 'test'},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			
			submitTap(){
				if(!this.evaluateForm.content) uni.showToast({ title: '评价内容不能为空！', icon: 'none'})
				this.evaluateForm.imgList = this.fileList1;
				console.log("提交====",this.evaluateForm)
			},
		}
	}
</script>

<style scoped lang="scss">

	.page_pingjia2 {
		height: 100vh;
		width: 100vw;
		background-color: #F4F4F6;

		.pingjia2 {
			color: #fff;

		}
		
		.zhuti {
			display: flex;
			align-items: center;
			height: 200upx;
			width: 100%;
			background-color: #ffffff;
		}
		
		.ve-rate {
			margin-left: 5px;
		}

		.kuang {
			padding-top: 30upx;
			width: 95%;
			padding-left: 10px;
		}
		
		.up-load{
			margin-top: 30upx;
		}
		

		.dianping {
			margin-top: 20upx;
			height: 100%;
			width: 100%;
			background-color: #ffffff;
			position: relative;
		}

		.miaoshu {
			margin-top: 3px;
			display: flex;
			color: #888888;
		}

		.heti {
			width: 100%;
			margin-left: 15px;
			
			.heti-title{
				width: 95%;
				font-size: 14px; 
				font-weight: 600;
			}
			.ht-price{
				margin-top: 20upx;
			}

			.text-rate{
				display: flex;
				align-items: center;
				margin-top: 20upx;
			}
	
		}

		.touxiang {
			margin-left: 10px;
		}

		
		
		.sub-btn{
			width: 100%;
			position: fixed;
			bottom: 30upx;
			
			.sub-btn-tijiao{
				box-shadow: 0upx 5upx 10upx rgba(7, 188, 173, 0.4);
				width: 90%;
				margin: 0 auto;
				height: 80upx;
				border-radius: 50upx;
				background-color: #07BCAD;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
