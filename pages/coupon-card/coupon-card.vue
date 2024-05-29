<template>
    <view>
        <coupon-card-list :showClose="showClose" :useInPage="useInPage" :couponList="couponList"
            :defaultSelectType="defaultSelectType" @handleConvert="handleConvert" @handleSelectType="handleSelectType"
            @handClickCoupon="handClickCoupon" @handleClose="handleClose"></coupon-card-list>
    </view>
</template>

<script>
    import CouponCardList from '@/components/coupon-card-list/coupon-card-list.vue'
    export default {
        data() {
            return {
                showClose: true,
                useInPage: true,
                defaultSelectType: 'available',
                couponList: [{
                    id: 1,
                    couponName: '优惠券名称',
                    couponAmountText: '无门槛 最多优惠12元',
                    couponTime: '2017.03.10 - 2017.12.30',
                    couponDesc: '描述信息',
                    discountPrice: '1.5',
                    unit: '元',
                    type: 'available',
                }, {
                    id: 2,
                    couponName: '不可用优惠券',
                    couponAmountText: '无门槛 最多优惠12元',
                    couponTime: '2017.03.10 - 2017.12.30',
                    couponDesc: '描述信息',
                    discountPrice: '1.5',
                    unit: '元',
                    type: 'notavailable'
                }, {
                    id: 3,
                    couponName: '可用优惠券',
                    couponAmountText: '无门槛 最多优惠12元',
                    couponTime: '2017.03.10 - 2017.12.30',
                    couponDesc: '描述信息',
                    discountPrice: '1.5',
                    unit: '元',
                    type: 'available'
                }, {
                    id: 4,
                    couponName: '可用优惠券',
                    couponAmountText: '无门槛 最多优惠12元',
                    couponTime: '2017.03.10 - 2017.12.30',
                    couponDesc: '描述信息',
                    discountPrice: '1.5',
                    unit: '元',
                    type: 'available'
                }, {
                    id: 5,
                    couponName: '不可用优惠券',
                    couponAmountText: '无门槛 最多优惠12元',
                    couponTime: '2017.03.10 - 2017.12.30',
                    couponDesc: '描述信息',
                    discountPrice: '1.5',
                    unit: '元',
                    type: 'notavailable'
                }, {
                    id: 6,
                    couponName: '可用优惠券',
                    couponAmountText: '无门槛 最多优惠12元',
                    couponTime: '2017.03.10 - 2017.12.30',
                    couponDesc: '描述信息',
                    discountPrice: '1.5',
                    unit: '元',
                    type: 'available'
                }],
            }
        },

        components: {
            CouponCardList
        },
        methods: {
            handClickCoupon(item) {
                console.log('选中优惠券名称：' + item.couponName);
                console.log('选中优惠券优惠金额：' + item.discountPrice);
            },
            /**
             * 点击兑换
             */
            handleConvert(type) {
                console.log('-点击兑换-');
                console.log('兑换码：' + type);
            },
            /**
             * 切换优惠券类别
             */
            handleSelectType(type) {
                console.log('切换优惠券类别：' + type);
            },
            /**
             * 关闭优惠券：浮层时候使用
             */
            handleClose() {
                console.log('点击不使用优惠券');
            }
        }
    }
</script>