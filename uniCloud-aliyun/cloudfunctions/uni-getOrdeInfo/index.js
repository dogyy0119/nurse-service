const db = uniCloud.database();  
  
exports.main = async (event, context) => {  
	console.log('event : ', event)
	const { _id } = event;
  try {  
    // 查询 user-id-nurse 表获取 packageID  
    const userIdNurseResult = await db.collection('nurse-order').where({  
	    _id: _id 
	  }).get({  
      // 这里可以根据需要添加查询条件  
    });  
  
    // 准备一个数组来存储最终结果  
    let finalResults = [];  
    
    // 遍历 user-id-nurse 查询结果  
    for (let item of userIdNurseResult.data) {  
      const packageID = item.package_id;  
	  
	  let id = ' ';
	   id = String(packageID[0]);
	  console.log("packageID:",id);
  
      // 根据 packageID 查询 package 表  
      const packageResult = await db.collection('nurse-service-package').where({  
	    _id: item.package_id[0] 
	  }).get();  
  
      id = String(item.consumable_id[0]);
	  console.log("consumableID:",id);
	  
	  // 根据 packageID 查询 package 表
	  const consumableResult = await db.collection('nurse-service-consumable').where({  
	    _id: item.consumable_id[0] 
	  }).get();  
      
	 // this.getPageket(this.orderData.package_id[0]);
	  //this.projectName = this.servicename;
	  // this.amount = this.orderData.total_fee;
	  // //this.getConsumable(this.orderData.consumable_id[0]);
	  // this.time = this.timestampToTime(this.orderData.reservation_time);
	  // this.location = this.orderData.servants_address;
	  // this.name = this.orderData.servants_name;
	  // this.phonenum = this.orderData.servants_phone;
	  // this.remarks = this.orderData.info;
	  // this.Flag = this.orderData.status;	
	  // this.userid = this.orderData.user_id;
  
      // 合并结果  
      finalResults.push({  
        userIdNurseID: item._id, // 假设 user-id-nurse 表的记录有一个 _id 字段  
        packageName: packageResult.data.name,
		amount: item.total_fee,
		time:item.reservation_time,
		location:item.servants_address,
		name:item.servants_name,
		phonenum:item.servants_phone,
		remarks:item.info,
		Flag:item.status,
		userid:item.user_id,
		consunableName:consumableResult.data.name
      });  
    }  
  
    // 返回最终结果  
    return finalResults;  
  } catch (error) {  
    console.error(error);  
    return { error: 'An error occurred during the query.' };  
  }  
};
