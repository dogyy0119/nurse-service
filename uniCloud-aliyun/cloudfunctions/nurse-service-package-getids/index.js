'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let field = event;
	const  collection = db.collection("nurse-service-package")

	
	let res = await collection.where({
		_id: db.command.in(event.ids)

	}).get()
	
	
	//返回数据给客户端
	// return res
	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};
