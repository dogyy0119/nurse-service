'use strict';
const db = uniCloud.database();  
const collection = db.collection('nurse-order');  
  
exports.main = async (event, context) => {  
    // 获取传入的OrderID和新的Flag值  
    const { _id, status } = event;  
  
    try {  
        // 使用where条件来定位要更新的记录，并使用update方法更新Flag字段  
        const res = await collection.where({  
            _id: _id  
        }).update({  
            status: status  
        });  
  
        // 返回更新结果  
        return {  
            code: 0,  
            message: '更新成功',  
            updated: res.updated, // 更新的记录数  
            data: null  
        };  
    } catch (e) {  
        // 错误处理  
        console.error(e);  
        return {  
            code: -1,  
            message: '更新失败',  
            data: null  
        };  
    }  
};
