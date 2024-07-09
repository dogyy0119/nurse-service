//本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm
import app from "../../../App.vue"


	// 定义全局参数,控制数据加载
	var _self, page = 1,timer = null;

	export default {
		data() {
			return {
				total_fee: 1, // 支付金额，单位分 100 = 1元
				order_no: "", // 业务系统订单号（即你自己业务系统的订单表的订单号）
				out_trade_no: "", // 插件支付单号
				description: "测试订单", // 支付描述
				type: "goodssss", // 支付回调类型 如 recharge 代表余额充值 goods 代表商品订单（可自定义，任意英文单词都可以，只要你在 uni-pay-co/notify/目录下创建对应的 xxx.js文件进行编写对应的回调逻辑即可）
				custom:{
					a: "a",
					b: 1
				},
				
				loadingText: '',
				animation: '',
				animationData: {},
				money:'0.00',//充值金额
				payType:'',//单选框选中值
				nurse_order_id: '',
				serviceName: ',',
 
				page:0,//当前分页页码
				apiUrl:'https://www.ymznkf.com/wx_server',//后端接口地址
				id:'',//传值使用,方便存在本地的locakStorage  
				del_id:''//方便存在本地的locakStorage  
			}
		},
		components:{

		},
		onLoad(options) {
			_self = this;
			
			let data={};
			if (options.params) {
			    let params = JSON.parse(decodeURIComponent(options.params)); // 将URL解码后解析为对象
			    console.log(params);
				this.money = params.totalFee;
				// this.data.totalFee = params.totalFee;
				// this.data.userName = params.userName;
				this.nurse_order_id = params.orderId;
				this.serviceName = params.serviceName;
			}
			
			// this.money = this.data.totalFee;
			//检查是否登录参考代码,需要用的时候，可以把注释取掉
			//if(this.checkLogin()==false){
			//	return;
			//}
			
			//this.getLaction();//得到gps

			this.page=0;

			//检测有没有传入id参数
			if (options.id != null && options.id !=""){
				this.id=options.id;
			}  
			
			// 初始化一个动画
			// var animation = uni.createAnimation({
			// 	transformOrigin: "50% 0 50%",
			// 	duration: 1000, //动画持续1秒
			// 	timingFunction: 'linear', //linear 全程匀速运动
			// 	delay: 200 //延迟两秒执行动画
			// })
			// this.animation = animation;
			// this.scaleAndScale();

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");

		},
		onShow() {
			console.log("on show");
			//if(this.checkLogin()==false){
			//	return;
			//}

			//执行初始化,需要用的时候，可以把注释取掉
			//this.Refresh("init");
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.Refresh();
		},
		methods: {
			open() {
				// this.order_no = `test`+Date.now(); // 模拟生成订单号
				this.out_trade_no = `${this.order_no}-1`; // 模拟生成插件支付单号
				// 打开支付收银台
				this.$refs.pay.open({
					total_fee: this.money, // 支付金额，单位分 100 = 1元（注意：因为是前端传的，此参数可能会被伪造，回调时需要再校验下是否和自己业务订单金额一致）
					order_no: this.order_no, // 业务系统订单号（即你自己业务系统的订单表的订单号）
					out_trade_no: this.out_trade_no, // 插件支付单号
					description: this.description, // 支付描述
					type: this.type, // 支付回调类型
					// custom: this.custom, // 自定义数据（此参数不推荐使用，因为是前端传的，此参数可能会被伪造，建议通过order_no查询自己业务订单表来获取自定义业务数据）
				});
			},
			
			// 定义动画内容
			scaleAndScale() {
				// 定义动画内容
				this.animation.opacity(0, 1).step() //先放大1,2倍
				this.animation.opacity(1, 0).step() //缩小至原来的大小
				// 导出动画数据传递给data层
				this.animationData = this.animation.export(); //每次执行导出动画时 会覆盖之前的动画
			},
			noscaleAndScale() {
				this.animation.scale(1, 1).step()
				this.animationData = this.animation.export()
			},
			/**
			* btSubmit_21处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			btSubmit_21_click:function(event){
				if(this.money==''){
					uni.showToast({title: '充值金额不能为空！',icon: 'none',duration: 2000});				  
					return; 
				}
				if(this.payType==''){
					uni.showToast({title: '充值方式不能为空！',icon: 'none',duration: 2000});
					return; 
				}
			  
				if(this.money <= 0) {
					uni.showToast({title: '充值不能小于零！',icon: 'none',duration: 2000});
					return; 
				}
				uni.showToast({title: '充值成功！',icon: 'none',duration: 2000});
				
				
				this.money = 1;
				this.order_no = this.nurse_order_id;
				
				
				this.open();
				
				
				return;
				// uniCloud.callFunction({
				//     name: "nurse-order-update",
				//     data: {
				// 		id: this.nurse_order_id,
				// 		status: 2
				//     },
				//     success: (res) => {
				// 		console.error("更新成功 ---" );
				// 		console.log(res);
						
				// 		this.dispatchOrder();
						
				//     },
				//     fail: (err) => {
				//         console.error("更新失败: " + err);
				//     },
				//     complete: (res) => {
				//         console.log("更新完成");
				//     }
				// });
								
				// uni.switchTab({
				//   url: '/pages/index/index',
				//   success: (res) => {
				//     // Handle success if needed
				//   },
				//   fail: (err) => {
				//     // Handle failure if needed
				//   }
				// });
				
				return;
			
			},
			
			/**
			 * 自动派单 
			 */
			dispatchOrder(){
				uniCloud.callFunction({
				    name: "nurse-dispatch-order",
				    data: {
						id: this.nurse_order_id
				    },
				    success: (res) => {
						console.error("派单成功 ---" );
						
						console.log(res.result.data);
						this.getPushClientId(res.result.data)	
				    },
				    fail: (err) => {
				        console.error("派单失败: " + err);
				    },
				    complete: (res) => {
				        console.log("派单完成");
				    }
				});
				
			},
			
			/**
			 * 获取push_clientid
			 */
			getPushClientId(uid) {
				uniCloud.callFunction({
				    name: "mydevice",
				    data: {
						uid: uid
				    },
				    success: (res) => {
						console.error("成功 ---" );			
						console.log(res);
						
						uni.switchTab({
						  url: '/pages/index/index',
						  success: (res) => {
						    // Handle success if needed
						  },
						  fail: (err) => {
						    // Handle failure if needed
						  }
						});		
				    },
				    fail: (err) => {
				        console.error("失败: " + err);
				    },
				    complete: (res) => {
				        console.log("完成");
				    }
				});
			},
			
			sendMessage(pushId) {
				uniCloud.callFunction({
				    name: "testUniPush",
				    data: {
						pushId: pushId,
						title: "您被选中自动派单",
						content: this.serviceName,
						text: "价格：" + this.money,
				    },
				    success: (res) => {
						console.log(res)
				    },
				    fail: (err) => {
				        console.error("请求失败: " + err);
				    },
				    complete: (res) => {
				         console.log("请求完成");
				    }
				});
				
			},
			
			/**
			* input处理函数
			*/
			money_input:function(event){
			    this.money=event.target.value;
			    // console.log(event.target.value);
			},
			
			/**
			* radio处理函数
			*/
			payType_change:function(event){
			    console.log(event.target.value);
			    this.payType=event.target.value;
			},
			
			/**
			* voucher_center__55_55处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			voucher_center__55_55_click:function(event){
			
			},
			
			/**
			* voucher_center__58_58处理函数
			* 数据绑定  data-index="{{index}}" 
			* 数据取值  var index = e.currentTarget.dataset.index; var cata = this.list_cata_list[index];
			*/
			voucher_center__58_58_click:function(event){
			
			},
			
			//刷新数据
			Refresh:function(_action) {
			
				uni.showLoading();
				
				//提交到服务器
				var that = this
				var url=that.apiUrl+'{server_code_file_path}';
				console.log(url);
				uni.request({
				url: url,//后端接口地址，需要改成自己的接口地址
				data: {
					action: _action,//上传动作，如按钮点击会产生click动作，分页也会产生，在后端根据具体的动作来判断事件
					uid: that.getUid(),//上传用户id,在登录中获得
					//上传页面中的变量
					//定义变量---start
					money: that.money,
					payType: that.payType,

					//定义变量---end
					id: that.id,//上传id值，后端可以根据此值来操作当前id
					del_id: that.del_id,//在列表中删除按钮选中时，上传到有后端，进行删除操作
					page:that.page
				},
				method: 'GET',
				success: function (res) {//后端返回数据

					// 隐藏导航栏加载框  
					uni.hideNavigationBarLoading();
					// 停止下拉动作  
					uni.stopPullDownRefresh();  

					// 隐藏加载框  
					uni.hideLoading();  

					var tmp = res.data;

					//初始化，对页面上的控件进行赋值操作
					if(_action=="init"){
						that.payType_array= tmp.payType_array;

					}

					that.money=tmp.money;
					
					//如果后端有返回消息，则弹出消息提示
					if (tmp.message != null && tmp.message != "") {
						uni.showToast({
						title: tmp.message,
						icon: 'none',
						duration: 2000
						})
					}

					//如果后端有返回页码，则更改当前页码
					if(tmp.page!=null && tmp.page!=""){
						page=tmp.page;
					}					

				},
				fail: function (res) {
					uni.showToast({
						title: "服务器访问失败",
						icon: 'none',
						duration: 2000
					})
					console.log(res.data);
					console.log('is failed')
				}
				})
			},
		}
	}
