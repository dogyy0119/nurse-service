'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
  
exports.main = async (event, context) => {  
    // 获取传入的OrderID和新的Flag值  
    console.log('event : ', event)
    
    //const nurse_users = await db.collection('uni-id-users').where('type==1').field('_id, mobile').get();
    // console.log(nurse_users)
    var data;
    if(event.is_need_report){
        data = {
                report_permission: true,
                type: 1  
            }
    }else{
        data = {
                type: 1  
            }        
    }
    const nurse_users = await db.collection('uni-id-users').where(data).get();
    
    var min_order_nurse;
    var min_order = 1000;
    for (var i=0;i<nurse_users.data.length;i++)
    { 
        var user_id = nurse_users.data[i]._id
        console.log(i + "   " + user_id)
        
        //const nurse_orders = await db.collection('nurse-order').where('and(nurse_id == ' +'"'  + user_id + '"' + ', status >= 3)').field('nurse_id').count(); 
        const nurse_orders = await db.collection('nurse-order').where(      
        {
            nurse_id: user_id,
            status: dbCmd.gt(2)
        }
        
        ).count(); 
        
        console.log(nurse_orders)
              
        if(nurse_orders.total<min_order){
           min_order =  nurse_orders.total;
           min_order_nurse = nurse_users.data[i];
        }
    }

    //console.log(min_order_nurse)
    //console.log(min_order_nurse.mobile)
    //console.log(min_order_nurse._id)

    // const { _id} = event;  	
    
    try {  
        const  collection = db.collection("nurse-order")
        // 使用where条件来定位要更新的记录，并使用update方法更新Flag字段  
        
        
        //console.log("event.id = " + event._id)
        
        const res = await collection.where({  
            _id: event._id  
        }).update({
            status:3,
            nurse_nickname: min_order_nurse.nickname,
            nurse_phone: min_order_nurse.mobile,
            nurse_id:min_order_nurse._id
        }); 
		
		return {
		    code: 0,  
		    message: '派单成功',  
		    updated: res.updated, // 更新的记录数  
		    data: min_order_nurse._id  
		};  
 
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
	    message: '派单失败',  
	    updated: 0, // 更新的记录数  
	    data: null  
	}; 
};
