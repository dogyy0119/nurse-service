<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="YmContent" >
			<view class="voucher_center__1">
				<text decode="true" class="voucher_center__47">支付金额</text>
				<view class="voucher_center__48">
					<text decode="true" class="voucher_center__49">￥</text>
					    <input :value="money/100" disabled class="money" />
				</view>
				<radio-group @change="payType_change" class="payType">
					<image v-on:click="voucher_center__55_55_click()"  src="/static/voucher_center_/images/voucher_center__55_55.jpg" mode="scaleToFill" border="0"    class="voucher_center__55"></image>
					<text decode="true" class="voucher_center__56">微信</text>
					<!-- <radio value="wx"  class="voucher_center__57"> -->
					</radio>
<!-- 					<image v-on:click="voucher_center__58_58_click()"  src="/static/voucher_center_/images/voucher_center__58_58.jpg" mode="scaleToFill" border="0"    class="voucher_center__58"></image>
					<text decode="true" class="voucher_center__59">支付宝</text>
					<radio value="zfb"  class="voucher_center__60">
					</radio> -->
				</radio-group>
				<button v-on:click="btSubmit_21_click()" class="btSubmit">确认支付
				</button>
				<!-- <text decode="true" class="voucher_center__22">充值须知</text>
				<text decode="true" class="voucher_center__23">1.目前支持支付宝和微信支付充值,后续增加其他方法会及时公告通知大家。
		2.充值无最低额度限制,请根据发布任务的单价和数量确定充值金额,账号余额可提现,但会收取一定手续费,详情请参考发布规则】和用户协议】
		3.充值提现手续费说明:非会员收取5%,会员收取%</text> -->
			</view>enter/login-page
		

		<view class="loading">{{loadingText}}</view>
		<view class="ymBbottom"></view>
		
		<view>
			<!-- <button @click="open">唤起收银台支付</button> -->
			<uni-pay ref="pay"></uni-pay>
		</view>
	</view>
</template>

<script>
import voucher_center_ from "./voucher_center_.js";
export default voucher_center_;


</script>

<style lang="scss" scoped>
   @import url("/animate.min.css");
   @import './voucher_center_.scss'
</style>