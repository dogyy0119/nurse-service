module.exports = {
	/**
	 * 修改数据
	 * @url admin/nurse/service/sys/update 前端调用的url参数地址
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
			_id,
			name,
			category_id,
			hospital_id,
			package_list,
			consumable_list,
			service_time,
			price,
			service_desc,
			service_thumb,
			service_banner_imgs,
			month_sell_count,
			total_sell_count,
			comment_count,
			is_on_sale,
			add_date,
			seller_note
		} = data;
		// 参数验证开始
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: 'id不能为空' };
		
		
		// 参数验证结束
		let dbName = "nurse-service"; // 表名
		// 执行 数据库 updateById 命令
		await vk.baseDao.updateById({
			dbName,
			id:_id,
			dataJson:{
				name,
				category_id,
				hospital_id,
				package_list,
				consumable_list,
				service_time,
				price,
				service_desc,
				service_thumb,
				service_banner_imgs,
				month_sell_count,
				total_sell_count,
				comment_count,
				is_on_sale,
				add_date,
				seller_note
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
