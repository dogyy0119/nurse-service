<script>
	import initApp from '@/common/appInit.js';
	import openApp from '@/common/openApp.js';
	import checkIsAgree from '@/pages/uni-agree/utils/uni-agree.js';
	export default {
		globalData: {
			searchText: '',
			appVersion: {},
			config: {},
			$i18n: {},
			$t: {}
		},
		onLaunch: function() {
			console.log('App Launch')
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str)

			uni.onPushMessage((res) => {
				console.log("收到推送消息：",res) //监听推送消息
			})
			
			
			// #ifdef APP-PLUS
					let timer = false;
					plus.push.addEventListener("click",(msg)=>{
						clearTimeout(timer);
						timer = setTimeout(()=>{
							console.log(1111,msg);
						},1500)
					},false)
					plus.push.addEventListener("receive",(msg)=>{
						if("LocalMSG" == msg.payload){
						}else{
							if(msg.type=='receive'){
								var options = {cover:false,title:msg.title};
								plus.push.createMessage(msg.content, msg.payload, options ); 
							 }  
						}
					},false)
				// #endif
			
			// #ifdef APP-PLUS 
			const notificationAuthorized = uni.getAppAuthorizeSetting().notificationAuthorized
			if(notificationAuthorized=='denied'){
				uni.showModal({
					title: '提示',
					content: '是否前往打开通知权限',
					success: res => {
						if (res.confirm) {
							this.openTongZhi()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
			// that.getQuanxian()
			// #endif                  
			
			// // uni-app客户端获取push客户端标记
			// uni.getPushClientId({
			// 	success: (res) => {
			// 		let push_clientid = res.cid
			// 		console.log('客户端推送标识:',push_clientid)
			// 	},
			// 	fail(err) {
			// 		console.log(err)
			// 	}
			// }
			
			
			
			initApp();
			
			// #ifdef H5
				openApp() //创建在h5端全局悬浮引导用户下载app的功能
			// #endif
			// #ifdef APP-PLUS
			//checkIsAgree(); APP端暂时先用原生默认生成的。目前，自定义方式启动vue界面时，原生层已经请求了部分权限这并不符合国家的法规
			// #endif

			// #ifdef H5
			// checkIsAgree(); // 默认不开启。目前全球，仅欧盟国家有网页端同意隐私权限的需要。如果需要可以自己去掉注视后生效
			// #endif

			// #ifdef APP-PLUS
			//idfa有需要的用户在应用首次启动时自己获取存储到storage中
			//https://ask.dcloud.net.cn/article/36107
			/*if(~plus.storage.getItem('idfa')){
				plus.device.getInfo({//需要勾选IDFA
					success:function(e){  
						console.log('idfa =  '+JSON.stringify(e.idfa));  
					},
					fail:function(e){
						console.log('getDeviceInfo failed: '+JSON.stringify(e));  
					}  
				});
			}*/
			// #endif
		},
		onShow: function() {
			console.log('App Show')
			
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	// 默认样式
	@import "static/css/reset.css";
</style>
