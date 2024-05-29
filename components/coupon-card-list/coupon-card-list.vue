<template>
	<view class="popup-coupon-content" :class="useInPage ? 'page' : ''">
		<view class="input">
			<input class="popup-content-input" v-model="code" placeholder="请输入优惠码" />
			<view class="text" @click="handleConvert" :class="code ? 'hasValue' : ''">
				兑换
			</view>
		</view>
		<view class="tab">
			<view class="tab-item" @click="handleClickSelectType('available')"
				:class="selecType == 'available' ? 'active' : ''">
				<view class="tab-text">
					可用({{useNum.available}})
				</view>
			</view>
			<view class="tab-item" @click="handleClickSelectType('notavailable')"
				:class="selecType == 'notavailable' ? 'active' : ''">
				<view class="tab-text">
					不可用({{useNum.notavailable}})
				</view>
			</view>
		</view>
		<view class="coupon-list">
			<view class="coupon-card" @click="handClickCoupon(item)" v-for="item in couponList" :key="item.id"
				v-if="item.type == selecType">
				<view class="card-content">
					<view class="amount-content" :class="selecType == 'available' ? 'available' : '' ">
						<view class="amount">
							<view class="price">{{item.discountPrice}}</view>
							{{item.unit}}
						</view>
						<view class="amount-text">
							{{item.couponAmountText}}
						</view>
					</view>
					<view class="coupon-info">
						<view class="info-name">
							{{item.couponName}}
						</view>
						<view class="info-time">
							{{item.couponTime}}
						</view>
					</view>
				</view>

				<view class="coupon-desc">
					{{item.couponDesc}}
				</view>
			</view>
			<PinappEmpty v-if="showEmpty"></PinappEmpty>
		</view>
		<view v-if="showClose" class="button-cancel" @click="handleClose">
			不使用
		</view>
	</view>
</template>

<script>
	import PinappEmpty from './pinapp-empty.vue'
	export default {
		data() {
			return {
				selecType: 'available', //available notavailable
				showEmpty: false,
				code: '',
				useNum: {
					available: 0,
					notavailable: 0,
				}
			}
		},
		props: {
			// 是否展示【不使用】按钮，浮层时候使用
			showClose: {
				type: Boolean,
				default: true
			},
			// 页面中使用传true，浮层使用传false
			useInPage: {
				type: Boolean,
				default: false
			},
			// 优惠券列表
			defaultSelectType: {
				type: String,
				default: ''
			},
			// 优惠券列表
			couponList: {
				type: Array,
				default: []
			},
		},
		created() {
			if (this.defaultSelectType) this.selecType = this.defaultSelectType;
			this.updateUseNum()
		},
		components: {
			PinappEmpty
		},
		methods: {
			updateUseNum() {
				let available = 0,
					notavailable = 0;
				this.couponList.forEach(item => {
					if (item.type == 'available') available++
					else if (item.type == 'notavailable') notavailable++
				})
				this.useNum = {
					available,
					notavailable
				}
				this.showEmpty = this.useNum[this.selecType] ? false : true
			},
			/**
			 * 点击兑换
			 */
			handleConvert() {
				if (this.code) {
					this.$emit('handleConvert', this.code)
				}
			},
			/**
			 * 切换优惠券类别
			 */
			handleClickSelectType(type) {
				if (this.selecType !== type) {
					this.selecType = type
					this.showEmpty = this.useNum[this.selecType] ? false : true
					this.$emit('handleSelectType', type)
				}
			},
			handClickCoupon(item) {
				this.$emit('handClickCoupon', item)
			},
			/**
			 * 关闭优惠券：浮层时候使用
			 */
			handleClose() {
				this.$emit('handleClose')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-coupon-content {
		font-size: 24rpx;

		&.page {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
		}

		.input {
			margin-top: 20rpx;
			padding: 0 20rpx;
			display: flex;
			align-items: center;

			.popup-content-input {
				border-radius: 70rpx;
				background: #f7f8fa;
				padding: 0 20rpx;
				flex: 1;
				height: 70rpx;
				margin-right: 20rpx;
			}

			.text {
				color: #1989fa;
				font-size: 28rpx;
				opacity: 0.8;

				&.hasValue {
					opacity: 1;
				}
			}
		}

		.tab {
			display: flex;
			align-items: center;
			background: #fff;
			box-shadow: 0 12rpx 24rpx -24rpx #969799;

			.tab-item {
				flex: 1;
				text-align: center;
				font-size: 28rpx;
				font-weight: 500;
				color: #646566;

				.tab-text {
					display: inline-block;
					padding: 20rpx 0;
				}
			}

			.active {
				color: #323233;

				.tab-text {
					border-bottom: 2px solid #1989fa;
				}
			}
		}

		.coupon-list {
			margin-top: 4rpx;
			background: #f6F7F9;
			min-height: 340rpx;
			flex: 1;
			padding: 20rpx 0;
			overflow-y: scroll;

			.coupon-card {
				margin: 0rpx 20rpx 20rpx;
				background: #fff;
				border-radius: 20rpx;
				padding: 10rpx 20rpx 0 20rpx;

				.card-content {
					display: flex;
					margin: 30rpx 0;

					.amount-content {
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 0 10rpx;
						width: 260rpx;

						&.available {
							color: #1989fa;
						}

						.amount {
							display: flex;
							align-items: center;

							.price {
								font-weight: 500;
								font-size: 54rpx;
								margin-right: 4rpx;
							}
						}

						.amount-text {
							margin-top: 4rpx;
						}
					}

					.coupon-info {
						flex: 1;
						color: #323233;
						margin-left: 20rpx;

						.info-name {
							font-size: 30rpx;
							font-weight: 500;
						}

						.info-time {
							margin-top: 20rpx;
						}
					}
				}

				.coupon-desc {
					border-top: 2rpx dashed #ebedf0;
					padding: 20rpx;
				}
			}

			.coupon-card:last-of-type {
				margin-bottom: 0;
			}

		}

		.button-cancel {
			margin: 20rpx;
			height: 80rpx;
			background: #1989fa;
			border-radius: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
		}
	}
</style>
