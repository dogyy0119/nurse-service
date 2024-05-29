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
	        getCity({city,name}){
				console.log(city)
				console.log(name)
	            // city 城市名称
	            // name 定位名称
	        }
	    }
	}
</script>

<style>

</style>
