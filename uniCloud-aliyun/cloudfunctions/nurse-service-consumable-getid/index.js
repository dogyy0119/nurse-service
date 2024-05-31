'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let field = event;
	const  collection = db.collection("nurse-service-consumable")

	console.log("liuhang id: event.id : " + event.id)
	
	let res = await collection.where({
		_id: event.id
	}).get()
	
	//event为客户端上传的参数
	 console.log('liuhang result : ', JSON.stringify(res.data))
	
	//返回数据给客户端
	// return res
	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};
