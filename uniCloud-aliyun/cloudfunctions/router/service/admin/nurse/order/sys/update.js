module.exports = {
	/**
	 * 修改数据
	 * @url admin/nurse/order/sys/update 前端调用的url参数地址
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
			title,
			type,
			service_id,
			pay_type,
			total_fee,
			user_id,
			servants_name,
			servants_address,
			servants_phone,
			reservation_time,
			nurse_id,
			nurse_phone,
			status,
			transaction_id,
			update_time,
			paid_time,
			platform,
			is_refund,
			refund_amount,
			refund_count,
			create_time,
			refund_time,
			refund_desc,
			info
		} = data;
		// 参数验证开始
		if (vk.pubfn.isNull(_id)) return { code: -1, msg: 'id不能为空' };
		
		
		// 参数验证结束
		let dbName = "nurse-order"; // 表名
		// 执行 数据库 updateById 命令
		await vk.baseDao.updateById({
			dbName,
			id:_id,
			dataJson:{
				title,
				type,
				service_id,
				pay_type,
				total_fee,
				user_id,
				servants_name,
				servants_address,
				servants_phone,
				reservation_time,
				nurse_id,
				nurse_phone,
				status,
				transaction_id,
				update_time,
				paid_time,
				platform,
				is_refund,
				refund_amount,
				refund_count,
				create_time,
				refund_time,
				refund_desc,
				info
			}
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}

}
