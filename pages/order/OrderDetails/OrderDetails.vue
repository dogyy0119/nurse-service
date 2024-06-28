<template>
 <view class="">
 	<div class="service-details">
 	    <div class="detail-item">
 	      <h2>{{ service.title }}</h2>
 	      <!-- <p><strong>类型：</strong>{{ service.type }}</p> -->
 	      <!-- <p><strong>服务ID：</strong>{{ service.service_id }}</p> -->
 	      <p><strong>总费用：</strong>{{ service.total_fee }}</p>
 	      <!-- <p><strong>用户ID：</strong>{{ service.user_id }}</p> -->
 	      <p><strong>服务人员姓名：</strong>{{ service.servants_name }}</p>
 	      <p><strong>服务人员电话：</strong>{{ service.servants_phone }}</p>
 	      <p><strong>服务人员地址：</strong>{{ service.servants_address }}</p>
 	      <p><strong>预约时间：</strong>{{ formatTime(service.reservation_time) }}</p>
 	      <p><strong>护士ID：</strong>{{ service.nurse_id }}</p>
 	      <p><strong>护士电话：</strong>{{ service.nurse_phone }}</p>
 	      <p><strong>状态：</strong>{{ getStatusText(service.status) }}</p>
 	      <p><strong>交易ID：</strong>{{ service.transaction_id }}</p>
 		  <p><strong>支付时间：</strong>{{ formatTime(service.paid_time) }}</p>
 	      <!-- <p><strong>更新时间：</strong>{{ formatTime(service.update_time) }}</p> -->
 	<!--      <p><strong>额外信息：</strong>{{ service.info }}</p>
 	      <p><strong>添加时间：</strong>{{ service._add_time_str }}</p> -->
 	    </div>
 	  </div>
 </view>
  
</template>

<script>
export default {
	data() {
		return {
			orderId: "",
			service: {
				title: ''
			}
		};
	},
	onLoad(options) {
		
		if (options.params) {
		    let params = JSON.parse(decodeURIComponent(options.params)); // 将URL解码后解析为对象
		    console.log(params);
			this.orderId = params.orderId;	
		}	
		console.log("this.orderId :" + this.orderId)
		this.fetchServiceDetails();
	},
	mounted() {
		// Assuming you fetch the data from UniCloud or another service
		
	},
	methods: {
		async fetchServiceDetails() {
			try {
			// Replace this with your actual UniCloud API call to fetch service details
			uniCloud.callFunction({
				name: "nurse-order-get",
				data: 
				{
					id: this.orderId,
				},
				success: (res) => {	
					console.log(res.result.data)
					this.service = res.result.data[0];
				},
				fail: (err) => {
					console.error("请求失败: " + err);
				},
				complete: (res) => {
		        console.log("请求完成");
				}
			});
        
			// Assuming response.data contains the JSON data you provided
        
		} catch (error) {
			console.error('Error fetching service details:', error);
		}
    },
    formatTime(timestamp) {
		
		const date = new Date(timestamp);
		if (!(date instanceof Date) || isNaN(date.getTime())) {
			return ''; // or throw an error if you prefer
		}
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
	getStatusText(status) {
      switch (status) {
        case 1:
          return '待支付';
        case 2:
          return '已支付';
        case 3:
          return '已派单';
        case 4:
          return '已接受';
        case 5:
          return '已拒绝';
        case 6:
          return '已完成';
        case 7:
          return '退款审核中';
        case 8:
          return '退款中';
        case 9:
          return '已退款';
        default:
          return '未知状态';
      }
    }
  }
};
</script>

<style lang="scss">
.service-details {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap if necessary */
  justify-content: space-between;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.detail-item {
  flex: 1 1 100%; /* Take full width of the container */
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-right: 10px;
  font-size: 16px; /* Adjust text size */
  color: #333; /* Adjust text color */
  margin-bottom: 10px; /* Add space between items */
}

.detail-item h2 {
  font-size: 20px; /* Adjust heading size */
  // color: #007bff; /* Adjust heading color */
  color: #1CBBB4;
}

.detail-item p {
  margin: 5px 0; /* Adjust paragraph margin */
  font-size: 14px; /* Adjust paragraph text size */
  color: #666; /* Adjust paragraph text color */
}

.detail-item strong {
	color: #1CBBB4;
  // color: #FF8F91; /* 字体颜色 */
  font-size: 14px; /* 字体大小 */  
  font-weight: bold; /* 字体加粗 */  
  margin-bottom: 2px; /* 下边距 */  
  // text-align: center; /* 水平居中 */  
  display: block; /* 确保是块级元素，如果已经是块级元素可以省略 */  
  padding: 8px 0; /* 上下内边距，用于增加空间感 */  
  border-bottom: 1px solid #ddd; /* 底部边框，用于分隔内容 */  
  /* ... 其他样式 ... */
  background-color: #f8f9fa; /* 淡灰色背景 */  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 底部阴影效果 */ 
}
</style>