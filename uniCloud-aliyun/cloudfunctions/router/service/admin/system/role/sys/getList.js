module.exports = {
	/**
	 * 查询角色列表
	 * @url admin/system/role/sys/getList 前端调用的url参数地址
	 * data 请求参数 说明
	 * @param {Number}         pageIndex 当前页码
	 * @param {Number}         pageSize  每页显示数量
	 * @param {Array<Object>}  sortRule  排序规则
	 * @param {object}         formData  查询条件数据源
	 * @param {Array<Object>}  columns   查询条件规则
	 * res 返回参数说明
	 * @param {Number}         code      错误码，0表示成功
	 * @param {String}         msg       详细信息
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk, db, _ } = util;
		let { uid } = data;
		let res = { code: 0, msg: '' };
		// 业务逻辑开始-----------------------------------------------------------
		let dbName = "uni-id-roles";
		res = await vk.baseDao.getTableData({
			dbName,
			data,
			// 副表列表
			foreignDB: [
				{
					dbName: "uni-id-permissions",
					localKey: "permission",
					localKeyType: "array",
					foreignKey: "permission_id",
					as: "permissionList",
					limit: 500,
					fieldJson: {
						permission_id: true,
						permission_name: true,
						comment: true,
						enable: true,
						url: true
					}
				},
				{
					dbName: "opendb-admin-menus",
					localKey: "menu",
					localKeyType: "array",
					foreignKey: "menu_id",
					as: "menuList",
					limit: 500,
					fieldJson: {
						menu_id: true,
						name: true,
						comment: true,
						enable: true,
						url: true
					}
				}
			]
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}