'use strict';
/**
 * 此处建议只改下订单状态，保证能及时返回给第三方支付服务器成功状态
 * 限制4秒内必须执行完全部的异步回调逻辑，建议将消息发送、返佣、业绩结算等业务逻辑异步处理（如用定时任务去处理这些异步逻辑）
 * 特别注意：因为金额是前端传的，需要再判断下金额和你业务系统订单中的金额是否一致，如果不一致，直接返回 return false;
 * 特别注意：因为金额是前端传的，需要再判断下金额和你业务系统订单中的金额是否一致，如果不一致，直接返回 return false;
 * 特别注意：因为金额是前端传的，需要再判断下金额和你业务系统订单中的金额是否一致，如果不一致，直接返回 return false;
 */
module.exports = async (obj) => {
	let user_order_success = true;
	let { data = {} } = obj;
	let {
		order_no,
		out_trade_no,
		total_fee,
		custom = {},
	} = data; // uni-pay-orders 表内的数据均可获取到

	console.log("------------type：test-------------- order_no");
	
	var currentDate = new Date(); // 创建一个新的 Date 对象，表示当前时间
	var timestamp1 = new Date().getTime();
	// 获取当前时间的各个部分
	var year = currentDate.getFullYear();       // 获取年份
	var month = currentDate.getMonth() + 1;     // 获取月份（注意月份是从0开始的，所以要加1）
	var day = currentDate.getDate();            // 获取日期
	var hours = currentDate.getHours();         // 获取小时
	var minutes = currentDate.getMinutes();     // 获取分钟
	var seconds = currentDate.getSeconds();     // 获取秒钟
	
	// 构建特定格式的日期时间字符串
	var formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	
	uniCloud.callFunction({
	    name: "nurse-order-update",
	    data: {
			id: order_no,
			status: 2,
			pay_type: 'wxpay',
			paid_time: timestamp1,
			update_time: timestamp1,
	    },
	    success: (res) => {
	    },
	    fail: (err) => {
			user_order_success = false;
	    },
	    complete: (res) => {
			user_order_success = true;
	    }
	});


	// let nurse_id = '';
	
	// uniCloud.callFunction({
	//     name: "nurse-dispatch-order",
	//     data: {
	// 		id: order_no
	//     },
	//     success: (res) => {
	// 		nurse_id = res.result.data
			
	// 		uniCloud.callFunction({
	// 		    name: "mydevice",
	// 		    data: {
	// 				uid: res.result.data
	// 		    },
	// 		    success: (res) => {
	// 				console.log(res);
	// 				uniCloud.callFunction({
	// 				    name: "nurse-order-update",
	// 				    data: {
	// 						id: order_no,
	// 						status: nurse_id
	// 				    },
	// 				    success: (res) => {
	// 				    },
	// 				    fail: (err) => {
	// 						user_order_success = false;
	// 				    },
	// 				    complete: (res) => {
	// 						user_order_success = true;
	// 				    }
	// 				});
	// 		    },
	// 		    fail: (err) => {
	// 		    },
	// 		    complete: (res) => {
	// 		    }
	// 		});
	//     },
	//     fail: (err) => {
	//     },
	//     complete: (res) => {
	//     }
	// });
	
	
	// let push_clientid = "0eb40275629a13867b7fe787cc530a65"
	
	// uniCloud.callFunction({
	//     name: "testUniPush",
	//     data: {
	// 		pushId: push_clientid,
	// 		title: "您被选中自动派单",
	// 		content: order_no,
	// 		text: "价格：" + total_fee,
	//     },
	//     success: (res) => {
	// 		console.log(res)
	//     },
	//     fail: (err) => {
	//         console.error("请求失败: " + err);
	//     },
	//     complete: (res) => {
	//          console.log("请求完成");
	//     }
	// });
	
	

	user_order_success = true;
	return user_order_success;
};