'use strict';
const db = uniCloud.database()

exports.main = async (event, context) => {

    const collection = db.collection("nurse-order")

	console.log( event.id )

    let res = await collection.doc(event.id).update({
		status: event.status
	})

    // 返回数据给客户端
    return {
        code: 200, // 成功状态码
        msg: '请求成功',
        data: res.data // 返回的数据
    }

};