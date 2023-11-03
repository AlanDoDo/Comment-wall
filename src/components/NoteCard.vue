<template>
    <div class="yk-node-card" :style="{ width: width, background: cardColor[card.color] }">
        <div class="top">
            <p class="time">{{ dateOne(card.moment) }}</p>
            <p class="label">{{ label[card.type][card.label] }}</p>
        </div>
        <p class="message" @click="toDetail">{{ card.message }}</p>
        <div class="foot">
            <div class="foot-left">
                <div class="icon" @click="clickLike">
                    <span class="iconfont icon-aixin1" :class="{ islike: card.islike[0].count > 0 }"></span>
                    <span class="value">{{ card.like[0].count }}</span>
                </div>
                <div class="icon" v-show="card.comcount[0].count > 0">
                    <span class="iconfont icon-liuyan"></span>
                    <span class="value">{{ card.comcount[0].count }}</span>
                </div>
            </div>
            <div class="name">{{ card.name }}</div>
        </div>
    </div>
</template>
    
<script>
import { label, cardColor } from '@/utils/data';
import { dateOne } from '@/utils/yksg';
import { insertFeedbackApi } from '@/api/index'
export default {
    data() {
        return {
            label,
            cardColor,
            dateOne,
            user: this.$store.state.user,
        }
    },
    props: {
        width: {
            default: '100%',
        },
        note: {
            default: {},
        },
    },
    computed: {
        card() {
            return this.note;
        }
    },
    created() {
        // console.log(this.card);
    },
    methods: {
        // 显示详情
        toDetail() {
            this.$emit('toDetail');
        },
        // 点击喜欢
        clickLike() {
            if (this.card.islike[0].count == 0) {
                let data = {
                    wallId: this.card.id,
                    userId: this.user.id,
                    type: 0,
                    moment: new Date(),
                }
                insertFeedbackApi(data).then(() => {
                    // 反馈完成
                    this.card.like[0].count++;
                    this.card.islike[0].count++;
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import url(../styles/commons.less);

@font-face {
    font-family: fa;
    src: url("@/assets/fonts/zysxt.ttf");
}

.yk-node-card {
    height: 240px;
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;

    .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;

        p {
            font-size: @size-12;
            color: @gray-3;
        }
    }

    .message {
        height: 140px;
        font-family: fa;
        font-size: 18px; // 字体大小
        color: #484545;
        cursor: pointer;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left: 0;
        padding: 0 @padding-20;
        box-sizing: border-box;
        width: 100%;

        .foot-left {
            display: flex;

            .value {
                font-size: @size-12;
                color: @gray-3;
                line-height: 16px;
                padding-left: @padding-4;
            }

            .iconfont {
                font-size: 16px;
                color: @gray-3;
            }

            .icon {
                padding-right: @padding-8;
                display: flex;
                align-items: center;
            }

            .icon-aixin1 {
                cursor: pointer;
                transition: @tr;

                &:hover {
                    color: @like;
                }
            }

            .islike {
                color: @like;
            }
        }
    }

    .name {
        font-family: fa;
        font-size: 16px;
        color: @gray-1;
        font-weight: 500;
    }
}</style>