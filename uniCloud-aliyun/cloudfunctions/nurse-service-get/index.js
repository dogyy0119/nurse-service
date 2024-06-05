'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {

	let field = event;
	const  collection = db.collection("nurse-service")
	
	let query = {
	    
	};
	
	// Check if status is 1, then include status condition in the query
	if (event.category_id !== undefined) {
		console.log( "event.category_id" )
	    query.category_id = event.category_id;
	} 
	
	if (event.name !== undefined){
		console.log( "event.name" )
		query.name  = event.name; 
	}
	
	let res = await collection.where(query).get()
	
	
	return  {
	    code: 200, // 成功状态码
	    msg: '请求成功',
	    data: res.data // 返回的数据
	}
};
