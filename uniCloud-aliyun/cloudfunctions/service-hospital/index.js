'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	console.log('event : ', event)
	const  collection = db.collection("hospital-service")
	let res = collection.add(event)
	
	//event为客户端上传的参数
	 console.log('res : ', res)
	
	//返回数据给客户端
	// return res
	
	return {
		code: 500,
		msg: '请求错误'
	};
};

