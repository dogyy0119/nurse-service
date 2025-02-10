//简单的使用示例
'use strict';
// const uniPush = uniCloud.getPushManager({appId:"__UNI__5000F3E"}) //注意这里需要传入你的应用appId，用于指定接收消息的客户端

const uniPush = uniCloud.getPushManager({appId:"_UNI__D96DA3E"}) //注意这里需要传入你的应用appId，用于指定接收消息的客户端 ‘e家医护商户版’

exports.main = async (event, context) => {
	let res = await uniPush.sendMessage({
		"push_clientid": event.pushId, 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
		"force_notification":true,  //填写true，客户端就会对在线消息自动创建“通知栏消息”。  

		"title": event.title,	
		"content": event.content,
		"payload": {
			"text": event.text
		},
		"options":{  
            "HW": {  
                 // 1 表示华为测试消息，华为每个应用每日可发送该测试消息500条，此target_user_type 参数请勿发布至线上。  
                  "/message/android/target_user_type":1  
              }  
        } 
	})
	
	console.log( res )
	
	// return  {
	//     code: 200, // 成功状态码
	//     msg: '请求成功',
	//     data: res.data // 返回的数据
	// }
	
};
