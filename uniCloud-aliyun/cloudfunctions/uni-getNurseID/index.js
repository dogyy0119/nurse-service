// 云函数 getOrderDetails/index.js  
const db = uniCloud.database();  
const collection = db.collection('uni-id-users');  
  
exports.main = async (event, context) => {  
  const { Nurse } = event;  
  try {  
    const res = await collection.where({  
      username: Nurse  
    }).get();  
  
    return {  
      code: 0,  
      message: '查询成功',  
      data: res.data[0] // 假设OrderID是唯一的，返回第一条数据  
    };  
  } catch (error) {  
    return {  
      code: -1,  
      message: error.message,  
    };  
  }  
};
