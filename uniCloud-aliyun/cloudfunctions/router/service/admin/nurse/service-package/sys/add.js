module.exports = {
	/**
	 * 添加单条数据
	 * @url admin/nurse/service-package/sys/add 前端调用的url参数地址
	 * data 请求参数 说明
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: 'ok' };
		// 业务逻辑开始-----------------------------------------------------------
		// 获取前端传过来的参数
		let {
			service_id,
			name,
			price,
			add_date = {"$env":"now"},
			last_modify_date = {"$env":"now"}
		} = data;
		// 参数验证开始
		
		
		// 参数验证结束
		let dbName = "nurse-service-package"; // 表名
		// 执行 数据库add 命令
		res.id = await vk.baseDao.add({
			dbName,
			dataJson: {
				service_id,
				name,
				price,
				add_date,
				last_modify_date
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
