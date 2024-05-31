'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	let field = event;
	const  collection = db.collection("nurse-service-consumable")
	
	let res = await collection.where({
		_id: event.id
	}).get()
	
	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};
