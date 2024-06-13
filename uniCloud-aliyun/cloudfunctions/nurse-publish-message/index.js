'use strict';

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
    
    // 引入uni-subscribemsg公共模块
    const UniSubscribemsg = require('uni-subscribemsg');
    // 初始化实例
    let uniSubscribemsg = new UniSubscribemsg({
    	dcloudAppid: "__UNI__DEBA119",
    	provider: "weixin-h5", // 注意，这里是weixin-h5
    });
    // 发送模板消息
    let res = await uniSubscribemsg.sendTemplateMessage({
    	touser: "o6qmf6x6BPzDS88PL6tTmig9BWPc",
    	template_id: "nir_1fUrWv5_S5zDDPDAMGFcAwEkoJb3xzgybRFqmpM",
    	url: "https://uniapp.dcloud.net.cn", // 用户点击消息后跳转的链接地址
    	data: {
    		first: {
    			value: "您购买的套餐已到期!",
    			color: "#666666"
    		},
    		keyword1: {
    			value: "test@qq.com",
    			color: "#666666"
    		},
    		keyword2: {
    			value: "阿里云空间",
    			color: "#666666"
    		},
    		keyword3: {
    			value: "2023-12-21 15:30:20",
    			color: "#666666"
    		},
    		remark: {
    			value: "请及时续费",
    			color: "#666666"
    		}
    	}
    });

	
	//返回数据给客户端
	return event
};
