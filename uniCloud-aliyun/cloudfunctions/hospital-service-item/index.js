'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	let field = event;
	const  collection = db.collection("hospital-service-item")
	
	let res = await collection.get()
	
	console.log(res)
	//返回数据给客户端
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
	
};
