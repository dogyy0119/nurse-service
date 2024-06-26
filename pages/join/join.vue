<template>
	<view>
		<form class="row custom-form" @submit="onSubmit">
			
			<label for="user_id" class="form-label">用户id：</label>
			<input type="text" id="user_id" name="user_id" class="form-input"/>
			
			<label for="city" class="form-label">城市：</label>
			<input type="text" id="city" name="city" class="form-input"/>
			
			<label for="hospital_id" class="form-label">医院ID：</label>
			<input type="text" id="hospital_id" name="hospital_id" class="form-input"/>

			<label for="hospital_name" class="form-label">医院Name：</label>
			<input type="text" id="hospital_name" name="hospital_name" class="form-input"/>

			
			<label for="type" class="form-label">类型：</label>
			<input type="text" id="type" name="type" class="form-input"/>
			
			<label for="title" class="form-label">标题：</label>
			<input type="text" id="title" name="title" class="form-input"/>
			
			<label for="price" class="form-label">价格：</label>
			<input type="text" id="price" name="price" class="form-input"/>
			
			<label for="detail" class="form-label">详情：</label>
			<input type="text" id="detail" name="detail" class="form-input"/>
			
			<label for="avatar" class="form-label">图片：</label>
			<input type="text" id="avatar" name="avatar" class="form-input"/>
			
			<label for="consumable" class="form-label">可退货：</label>
			<input type="text" id="consumable" name="consumable" class="form-input"/>
			
			<button form-type="submit" class="form-button">提交</button>
		</form>
	</view>
</template>

<script>
	
	const db = uniCloud.database()

	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			//this.resq()
			//this.sendMyData()
			// this.sendMyData();
			//this.sendMyData()
		},
		onLoad() {
		    this.sendMyData()
			console.log(" in onLoad")
			// uniCloud.callFunction({
			// 	name: 'hospital-service-api',
			// 	data: {id: 123123123123,
			// 		hospitalId: 12,
			// 		type: 1,
			// 		title: "灌肠",
			// 		price: 99.99,
			// 		detail: "5分钟",
			// 		detailPic: "可以两次",
			// 		consumable: false,
			// 	},
			// 	success(res){
			// 		console.log( "success" )
					
			// 		console.log( res )
			// 	},
			// 	fail(){
					
			// 	},
			// 	complete(){
					
			// 	}
			// });
			
		},
		
		methods: {
			onSubmit(e){
				this.resq()
				return ;
				//sendMyData()
				// console.log(e)
				let obj = e.detail.value
				console.log(obj)
				
				// const collection = db.collection("hospital-service")
					
					
				// 	// 使用add方法向hospital_service集合中添加数据
				// const res = collection.add(obj)
				uniCloud.callFunction({
					name: "hospital-service-api",
					data: obj
		
				}).then(res=>{
					console.log(res)
				})
			},
			sendMyData()
			{
				uniCloud.callFunction({
					name: "hospital-service-api",
					data: {
						// id: 123123123123,
						avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-gacrhzeynhss7c6d04/249516a0-3941-11eb-899d-733ae62bed2f.jpg",
						city: "北京",
						user_id: 123,
						hospital_id: 14,
						hospital_name: "医院",
						type: 1,
						title: "按摩",
						price: 33.99,
						detail: "10分钟",
						consumable: 1,
						// datatime: new Date()
					}
				}).then(res=>{
					console.log(res)
				})
			},
			resq(){
				uniCloud.callFunction({
					name: "hospital-service-get",
					data: {
						type: 1
					}
				}).then(res=>{
					console.log(res)
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.row {
		display: flex; /* 使用flex布局 */
		flex-direction: column; /* 垂直排列 */
		align-items: flex-start; /* 左对齐 */
		background-color: #f5f5f5; /* 设置背景颜色 */
		border: 1px solid #ddd; /* 设置边框 */
		border-radius: 8px; /* 设置圆角 */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
		padding: 10px; /* 设置内边距 */
		margin: 10px 0; /* 设置外边距 */
	}

	.form-label {
		font-weight: bold; /* 设置粗体字体 */
		margin-bottom: 3px; /* 设置下边距 */
	}

	.form-input {
		width: 100%; /* 设置宽度为100% */
		padding: 8px; /* 设置内边距 */
		margin-bottom: 10px; /* 设置下边距 */
		border: 1px solid #ccc; /* 设置边框 */
		border-radius: 5px; /* 设置圆角 */
	}

	.form-button {
		background-color: #007bff; /* 设置背景颜色 */
		color: #fff; /* 设置文字颜色 */
		padding: 5px 5px; /* 设置内边距 */
		border: none; /* 移除边框 */
		border-radius: 5px; /* 设置圆角 */
		cursor: pointer; /* 设置鼠标样式为手型 */
	}
</style>