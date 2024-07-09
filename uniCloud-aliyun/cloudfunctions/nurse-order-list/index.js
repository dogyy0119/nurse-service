'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	const  collection = db.collection("nurse-order")
	
	
	try {
        let query = {
            user_id: event.userId
        };

        // Check if status is 1, then include status condition in the query
        if (event.status !== undefined) {
			console.log("event.status:" + event.status)
            query.status = event.status;
        } else {
			console.log("event.status: undefined - ")		
		}

        let res = await collection.where(query).get();

        return {
            code: 200,
            msg: '请求成功',
            data: res.data
        };
    } catch (error) {
        // Handle error
    }
};