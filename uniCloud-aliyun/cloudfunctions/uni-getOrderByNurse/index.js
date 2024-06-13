// 云函数 getOrdersByNurse 的代码示例  
'use strict';  
  
const db = uniCloud.database();  
const collection = db.collection('orderlist');  
const userCollection = db.collection('uni-id-user');  
  
exports.main = async (event, context) => {  
    const nickname = event.nickname; // 假设从前端传递了 nickname 参数  
  
    // 首先，根据 nickname 找到对应的 user，获取其 _id  
    const userResult = await userCollection.where({  
        nickname: nickname  
    }).get();  
  
    if (userResult.data.length === 0) {  
        return {  
            error: 'User not found'  
        };  
    }  
  
    const userId = userResult.data[0]._id;  
  
    // 然后，根据 userId（假设你之前在 orderlist 里存储的是 userId 而不是 nickname）查询 orderlist  
    const orderResult = await collection.where({  
        Nurse: userId // 假设在 orderlist 表中存储的是 userId，而不是 nickname  
        // 如果你的 orderlist 表中存储的是 nickname，则使用下面的查询条件  
        // nurse: nickname  
    }).get();  
  
    return orderResult.data; // 返回查询到的订单数据  
};
