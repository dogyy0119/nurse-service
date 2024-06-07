'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	const collection = db.collection("nurse-order")
	
	try {
        let query = {
            _id: event.id
        };

        // Check if status is 1, then include status condition in the query
  //       if (event.status !== undefined) {
		// 	console.log("event.status:" + event.status)
  //           query.status = event.status;
  //       } else {
		// 	console.log("event.status: undefined - " + event.status)		
		// }

        let res = await collection.where(query).remove();

        return {
            code: 200,
            msg: '删除成功',
            data: res.deleted
        };
    } catch (error) {
        // Handle error
        return {
            code: 500,
            msg: '删除失败：' + error.message
        };
    }
};