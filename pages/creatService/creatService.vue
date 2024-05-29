<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.sendData()
		},
		
		methods: {
			sendData() {
				
				uniCloud.callFunction({
					name: "hospital-service-api",
					data: {
						avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-gacrhzeynhss7c6d04/249516a0-3941-11eb-899d-733ae62bed2f.jpg",
						city: "北京",
						user_id: 123,
						hospital_id: 12,
						hospital_name: "大医院",
						type: 4,
						title: "参绷带",
						price: 199.99,
						detail: "20分钟",
						consumable: 1,
					}
				}).then(res=>{
					
				})
			}
		}
	}
</script>

<style>

</style>
