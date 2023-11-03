<template>
    <div class="card-detail">
        <div class="top-bt">
            <p class="revoke">联系墙主撕掉该便签</p>
            <p class="report">举报</p>
        </div>
        <note-card-vue :note="card"></note-card-vue>
        <div class="form">
            <textarea class="message" placeholder="请输入..." v-model="discuss"></textarea>
            <div class="bt">
                <input type="text" class="name" placeholder="签名" v-model="name" />
                <yk-button-vue :class="{ notallowed: !isDis }" @click="submit">评论</yk-button-vue>
            </div>
        </div>
        <p class="title">评论{{ cards.comcount[0].count }}</p>
        <div class="commont">
            <div class="commont-li" v-for="(e, index) in comments" :key="index">
                <div class="user-head" :style="{ backgroundImage: portrait[e.imgurl] }"></div>
                <div class="comm-m">
                    <div class="m-top">
                        <p class="name">{{ e.name }}</p>
                        <p class="time">{{ dateOne(e.moment) }}</p>
                    </div>
                    <div class="mm">{{ e.comment }}</div>
                </div>
            </div>
            <p class="more" @click="getComment" v-show="nowpage > 0">加载更多</p>
        </div>
    </div>
</template>
  
<script>
import NoteCardVue from './NoteCard.vue';
import YkButtonVue from './YkButton.vue';
import { portrait } from '@/utils/data';
import { dateOne } from '@/utils/yksg';
import { insertCommentApi, findCommentPageApi } from '@/api/index';
export default {
    data() {
        return {
            comments: [],
            portrait,
            dateOne,
            discuss: '',  // 输入内容
            name: '匿名', // 用户名
            user: this.$store.state.user,
            nowpage: 1,  // 当前页
            pagesize: 2, // 一页多少条
        }
    },
    props: {
        card: {
            default: {},
        }
    },
    computed: {
        isDis() {
            if (this.discuss && this.name) {
                return true;
            } else {
                return false;
            }
        },
        cards() {
            return this.card;
        }
    },
    components: {
        NoteCardVue,
        YkButtonVue,
    },
    methods: {
        // 提交评论
        submit() {
            if (this.isDis) {
                // 如果有用户就用头像，没有就用随机头像
                let img = Math.floor(Math.random() * 14);
                let data = {
                    wallId: this.cards.id,
                    userId: this.user.id,
                    imgurl: img,
                    moment: new Date(),
                    name: this.name,
                    comment: this.discuss,
                };
                // console.log(data);
                insertCommentApi(data).then(() => {
                    this.comments.unshift(data);
                    this.cards.comcount[0].count++;
                    // 清空评论框
                    this.discuss = '';
                })
                // this.comment.unshift(data);
                // this.$message({ type: "success", message: "发送成功" });
            }
        },
        // 获取评论
        getComment() {
            if (this.nowpage > 0) {
                let data = {
                    id: this.card.id,
                    page: this.nowpage,
                    pagesize: this.pagesize,
                }
                findCommentPageApi(data).then((res) => {
                    this.comments = this.comments.concat(res.message);
                    // 设置下一次的page
                    if (res.message.length == this.pagesize) {
                        this.nowpage++;
                    } else { this.nowpage = 0; }
                    // console.log(this.comment)
                })
            }
        },
    },
    mounted() {
        this.getComment();
    },
    watch: {
        card() {
            // 卡片发生变化
            this.nowpage = 1;
            this.comments = [];
            this.getComment();
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

.card-detail {
    position: relative;
    padding: 0 @padding-20;

    .top-bt {
        position: fixed;
        top: 0;
        left: 0;
        padding: @padding-20;
        display: flex;

        .revoke {
            color: @primary-color;
            cursor: pointer;
            padding-right: 30px;
            font-size: @size-16;
        }

        .report {
            font-size: @size-16;
            color: @warning-color;
            cursor: pointer;
        }
    }

    .form {
        .message {
            background: none;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            padding: @padding-8;
            box-sizing: border-box;
            width: 100%;
            margin-top: @padding-12;

        }

        .bt {
            display: flex;
            padding-top: 6px;
            justify-content: space-between;
        }

        .name {
            width: 200px;
            box-sizing: border-box;
            padding: 7px;
            background: none;
            border: 1px solid rgba(148, 148, 148, 1);
            line-height: 20px;
        }
    }

    .title {
        font-weight: 600;
        padding-top: 30px;
        padding-bottom: 20px;
    }

    .more {
        color: @gray-2;
        text-align: center;
        padding: 20px;
        cursor: pointer;
    }

    .commont-li {
        display: flex;
        padding-bottom: 30px;

        .user-head {
            flex: none;
            width: 28px;
            height: 28px;
            border-radius: 20px;
            overflow: hidden;
            // background-image: linear-gradient(180deg, rgba(245,65,65,0.50) 0%, #F43F3F 100%);
        }

        .comm-m {
            padding-left: @padding-8;
        }

        .m-top {
            display: flex;
            align-items: center;

            .name {
                font-weight: 600;
            }

            .time {
                font-size: @size-12;
                padding-left: @padding-4;
                color: @gray-3;
            }
        }

        .mm {
            padding-top: @padding-4;
            font-size: 14px;
        }
    }
}
</style>
  