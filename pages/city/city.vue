<template>
	<view>
		    <Citylist :getCity="getCity"></Citylist>
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
	        getCity(city){
				console.log(city)
				uni.setStorageSync("location",city)
				
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

<style>

</style>
