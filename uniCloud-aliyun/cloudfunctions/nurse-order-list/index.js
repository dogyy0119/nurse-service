'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	const  collection = db.collection("nurse-order")
	
	
	let res = await collection.where({
		status: event.status,
		user_id: event.userId
	}).get()
		

	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};