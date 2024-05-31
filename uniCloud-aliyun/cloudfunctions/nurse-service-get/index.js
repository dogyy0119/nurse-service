'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	let field = event;
	const  collection = db.collection("nurse-service")
	
	let res = await collection.where({
		category_id: event.category_id
	}).get()
	
	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};
