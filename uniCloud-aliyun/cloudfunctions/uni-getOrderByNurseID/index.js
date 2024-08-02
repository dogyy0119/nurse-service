'use strict';

const db = uniCloud.database();  
const collection = db.collection('nurse-order');  

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)	
		const { nurse_id } = event;
		try {  
		  const res = await collection.where({  
		    nurse_id: nurse_id  
		  }).orderBy('reservation_time', 'desc').get();  
		
		  return {  
		    code: 0,  
		    message: '查询成功',  
		    data: res.data // 假设nurse_id是唯一的 
		  };  
		} catch (error) {  
		  return {  
		    code: -1,  
		    message: error.message,  
		  };  
		}  
		
	
};
