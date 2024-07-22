'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {

    const collection = db.collection("nurse-order")

	console.log( event.id )
	var timestamp1 = new Date().getTime();

    let res = await collection.doc(event.id).update({
		status: event.status,
		paid_time: event.paid_time,
		update_time: timestamp1
	})

    // 返回数据给客户端
    return {
        code: 200, // 成功状态码
        msg: '请求成功',
        data: res.data // 返回的数据
    }

};