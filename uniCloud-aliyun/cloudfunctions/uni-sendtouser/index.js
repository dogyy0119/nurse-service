'use strict'; 
 
const uniPush = uniCloud.getPushManager({appId:"__UNI__EF91A34"}); //注意这里需要传入你的应用appId  
//"_UNI_5088F3E”__UNI__D96DA3E__UNI__D96DA3E__UNI__D96DA3E
exports.main = async (event, context) => {  
	//const { push_clientid } = event;
   return await uniPush.sendMessage({
        "push_clientid": event.push_clientid,     //填写上一步在uni-app客户端获取到的客户端推送标识push_clientid  
        "force_notification":true,  //填写true，客户端就会对在线消息自动创建“通知栏消息”。  
        "title": event.title,      
        "content": event.content,  
        "payload": {  
            "text":event.text  
        },
        "options":{  
            "HW": {  
                 // 1 表示华为测试消息，华为每个应用每日可发送该测试消息500条，此target_user_type 参数请勿发布至线上。  
                  "/message/android/target_user_type":1  
              }  
        }  
    });
	

};
