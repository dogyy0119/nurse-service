'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {

	let field = event;
	const  collection = db.collection("nurse-open-city-list")
	
	let res = await collection.get()
	
	console.log(res.data)
	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}


};