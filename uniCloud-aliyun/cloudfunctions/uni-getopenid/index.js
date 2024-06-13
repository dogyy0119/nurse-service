'use strict';

exports.main = async (event, context) => {
	let appid = "wx6aaa77f8d65f25ef"; //你的AppID
	let secret = "86b155191c5b9db664a7d23db311a90a"; //你的AppSecret
	let url =
		"https://api.weixin.qq.com/sns/jscode2session?appid=" +
		appid +
		"&secret=" +
		secret +
		"&js_code=" +
		event.code +
		"&grant_type=authorization_code";
	let res = await uniCloud.httpclient.request(
		url, // 请求路径,
		{
			dataType: "json"
		}
	);
	let openid = res.data.openid
	return openid
};

