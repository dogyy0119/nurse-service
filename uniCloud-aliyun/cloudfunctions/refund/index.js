'use strict';
const unipay = require('uni-pay')

exports.main = async function (event) {
  let res = await unipay.refund({
    outTradeNo: '商户订单号',
    outRefundNo: '商户退款单号', // 支付宝可不填此项
    totalFee: 1, // 订单总金额，支付宝可不填此项
    refundFee: 1, // 退款总金额
  })
  return res
}


