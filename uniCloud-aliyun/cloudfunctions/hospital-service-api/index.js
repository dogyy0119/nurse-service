'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	console.log('event : ', event)
	const  collection = db.collection("hospital-service")
	
	let res = await collection.add(event)
	
	//event为客户端上传的参数
	 console.log('add res : ', res)
	
	//返回数据给客户端
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
	
	// return {
	// 	code: 500,
	// 	msg: '请求错误'
	// };
};
