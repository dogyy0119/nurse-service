// 云函数 getOrderList 中的代码  
'use strict';  
  
const db = uniCloud.database();  
const collection = db.collection('nurse-order');  
  
exports.main = async (event, context) => {  
    try {  
        const res = await collection.get({  
            fields: {  
                _id: true,  
                Service: true,   
				total_fee: true,  
                reservation_time: true,
				servants_address:true,
            }  
        });  
        return {  
            code: 0,  
            msg: '数据获取成功',  
            data: res.data  
        };  
    } catch (e) {  
        return {  
            code: -1,  
            msg: '数据获取失败',  
            error: e  
        };  
    }  
};
