## 基于官方的改良版带凸起自定义tabbar菜单unistar快速开发项目框架
可自定义tabbar菜单，修改数据在components/tabbar/tabbar.vue页面进行修改

菜单数据模型
return {
				tabbarIndex: 0,
				tablist: [{
						text: "首页",
						isbulge: false,
						iconPath: "../../static/tabbar/home.png",
						selectedIconPath: "../../static/tabbar/homefill.png",
						pagePath: "/pages/home/home"
					},
					{
						text: "列表",
						isbulge: false,
						iconPath: "../../static/tabbar/we.png",
						selectedIconPath: "../../static/tabbar/wefill.png",
						pagePath: "/pages/list/list"
					},
					{
						text: "加入",
						isbulge: true,//是滞显示为凸起来的样式
						iconPath: "../../static/tabbar/add.png",
						selectedIconPath: "../../static/tabbar/add.png",
						pagePath: "/pages/join/join"
					},
					{
						text: "消息",
						isbulge: false,
						iconPath: "../../static/tabbar/message.png",
						selectedIconPath: "../../static/tabbar/messagefill.png",
						pagePath: "/pages/messge/messge"
					},
					{
						text: "我的",
						isbulge: false,
						iconPath: "../../static/tabbar/my.png",
						selectedIconPath: "../../static/tabbar/myfill.png",
						pagePath: "/pages/ucenter/ucenter"
					},
				],
			};
			
页面引入
<tabbar index="0"></tabbar>
index的值为当前页面为第一个菜单，从0开始算。

<h2>
文档已移至 <a href="https://uniapp.dcloud.io/uniCloud/uni-starter.html" target="_blank">关于uni-starter的项目使用请参考官方文档。</a>
</h2>