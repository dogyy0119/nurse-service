'use strict';
const db = uniCloud.database();  
const collection = db.collection('nurse-service');  

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const { _id } = event;
	try {  
	  const res = await collection.where({  
	    _id: _id 
	  }).get();  
	
	  return {  
	    code: 0,  
	    message: '查询成功',  
	    data: res.data // 假设订单ID是唯一的  
	  };  
	} catch (error) {  
	  return {  
	    code: -1,  
	    message: error.message,  
	  };  
	}  
};

