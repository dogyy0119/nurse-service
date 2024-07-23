### 简单的说一下能解决 什么问题呢？
- ~~首先，uniapp目前还没有同步更新微信小程序新隐私政策的button属性和api接口。~~
- 然后，经过查阅文档和社区，再加上不断踩坑，总结出来的uniapp一个解决方案。

 **注：目前uniapp官方更新了button组件和简单介绍了下微信小程序的新隐私政策，但隐私接口api依然是使用的微信小程序api。所以，还得是用原生的接口实现此需求。**


### 首先你的确保你了解过微信小程序的新隐私政策

[微信小程序新版隐私政策引导](https://developers.weixin.qq.com/miniprogram/dev/framework/user-privacy/PrivacyAuthorize.html)
#### 注意：
1. **配置真实有效的微信小程序appid**
2. **在小程序隐私政策中添加相关隐私接口信息，通过审核并且等待其真实生效后，才能调用。这个生效时间大概在审核通过后，15分钟以上。**

按照下面做法，把组件挂到页面上什么都不用做即可达到目的。

manifest.json的"mp-weixin"中新增下面一块，这个在2023年9月15号后微信小程序不论是否有配置 __usePrivacyCheck__，隐私相关功能都会启用
```javascript
	"__usePrivacyCheck__": true
```

你的隐私接口调用的页面
```javascript
<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title" @tap="goClipboardData">{{title}}</text>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<jade-mp-privacy initiative></jade-mp-privacy>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '点击触发复制功能'
			}
		},
		onLoad() {

		},
		methods: {
			goClipboardData() {
			    uni.setClipboardData({
			    	data: this.title,
			    	success: () =>
			    		uni.showToast({
			    			title: '复制成功'
			    		})
			    })
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
```

#### 组件中有这么一段大家注意下，这个是模拟用户点击隐私接口方便开发者调试，注释后不影响使用，在用户点击隐私接口时仍然可以触发
```javascript
	// 模拟用户授权,上线前必须注释,仅用于调试
	wx.requirePrivacyAuthorize({
		success: () => {
			// wx.getPrivacySetting返回fals     
			console.log("用户授权过,继续小程序逻辑")
		},
		fail: () => {
			// wx.getPrivacySetting返回true,触发wx.onNeedPrivacyAuthorization
			console.log("触发wx.onNeedPrivacyAuthorization监听")
		}
	})
```
**注意：isCover属性需要在pages.json配置tabBar后方可设置为true，否则会报下面的错误**
```javascript
{"errMsg":"hideTabBar:fail not TabBar page"}
```
## 属性介绍
| 名称                        | 类型              | 默认值                    | 描述 |
| ----------------------------|---------------   | ---------                 |------- |
| title                       | String           | 用户隐私保护提示           |标题|
| initiative                  | Boolean          | false                     |是否主动弹出授权窗口|
| isCover                     | Boolean          | false                     |控制是否覆盖tabBar，必须配置tabBar后使用，请按需设置|
