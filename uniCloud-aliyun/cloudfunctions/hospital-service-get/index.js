'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	// console.log('liuhang type: event.type : ', event.type)
	let field = event;
	const  collection = db.collection("hospital-service")
	// let res = collection.field(field).limit(10).skip(0).get()

	// let res = collection.field(field).orderBy("_id","asc").get()

	// let res = collection.where({
	// 	city:"沈阳"
	// }}).orderBy("_id","asc").get()
	
	
	let res = await collection.where({
		type: event.type
	}).get()
	

	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}


};