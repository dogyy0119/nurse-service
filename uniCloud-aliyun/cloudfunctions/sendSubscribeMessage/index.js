'use strict';
const openapi = require('mp-cloud-openapi')
const uniID = require('uni-id')
exports.main = async (event, context) => {
	const openapiWeixin = openapi.initWeixin({
	  appId: 'xxxx',
	  secret: 'xxxx',
	})
	const {accessToken} = await openapiWeixin.auth.getAccessToken();
	const {openid} = await uniID.code2SessionWeixin({
		code: event.code
	})
	
	return await openapiWeixin.subscribeMessage.send({
		accessToken,
		"touser": openid,
		"template_id": event.template_id,
		"data": event.subscribeData
	})
};