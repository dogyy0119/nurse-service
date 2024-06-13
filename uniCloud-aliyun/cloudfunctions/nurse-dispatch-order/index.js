'use strict';
const db = uniCloud.databaseForJQL();  
  
exports.main = async (event, context) => {  
    // 获取传入的OrderID和新的Flag值  
    //console.log('event : ', event)
    
    const nurse_users = await db.collection('uni-id-users').where('type==1').field('_id, mobile').get();
    console.log(nurse_users)
    
    var min_order_nurse;
    var min_order = 1000;
    for (var i=0;i<nurse_users.data.length;i++)
    { 
        var user_id = nurse_users.data[i]._id
        console.log(i + "   " + user_id)
        
        const nurse_orders = await db.collection('nurse-order').where('and(nurse_id == ' +'"'  + user_id + '"' + ', status >= 3)').field('nurse_id').count(); 
        console.log(nurse_orders)
        if(nurse_orders.total<min_order){
           min_order =  nurse_orders.total;
           min_order_nurse = nurse_users.data[i];
        }
            
    }

    console.log(min_order_nurse)
    console.log(min_order_nurse.mobile)
    console.log(min_order_nurse._id)

     const { _id} = event;  	
    
    try {  
        const  collection = db.collection("nurse-order")
        // 使用where条件来定位要更新的记录，并使用update方法更新Flag字段  
        const res = await collection.where({  
            _id: _id  
        }).update({
            status:3,
            nurse_phone: min_order_nurse.mobile,
            nurse_id:min_order_nurse._id
        });  
 
    } catch (e) {  
        // 错误处理  
        console.error(e);  
        return {  
            code: -1,  
            message: '派单失败',  
            data: null  
        };  
    }  
    
    //推送消息到客户端和商家端
    
    
    // 返回更新结果  
    return {  
        code: 0,  
        message: '派单成功',  
        updated: res.updated, // 更新的记录数  
        data: null  
    };  
};
