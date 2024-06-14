'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {
	
	// uniID = uniID.createInstance({
	// 	context
	// })
	// console.log('event : ' + JSON.stringify(event))
		
	const  collection = db.collection("my-device")

	const res = await collection.where({
		"user_id": event.uid,		
	}).get()
	// if (res.data.length > 0) {
	// 	res = await collection.where({
	// 		"user_id": event.uid,
	// 	}}).update({
	// 		"push_clientid": event.push_clientid,
	// 	})
	// } else {
	// 	res = await collection.add(event)
	// }
		
	//返回数据给客户端
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};
