<template>
    <div class="wall-message">
        <p class="title">{{ wallType[id].name }}</p>
        <p class="slogan">{{ wallType[id].slogan }}</p>
        <div class="label">
            <p class="label-list" :class="{ lbselected: nlabel == -1 }" @click="seletcNode(-1)">全部</p>
            <p class="label-list" :class="{ lbselected: nlabel == index }" v-for="(e, index) in label[id]" :key="index"
                @click="seletcNode(index)">{{ e }}</p>
        </div>
        <div class="card" :style="{ width: nWidth + 'px' }" v-show="id == 0">
            <node-card-vue v-for="(e, index) in cards" :key="index" :note="e" class="card-inner" :width="'288px'"
                :class="{ cardselected: index == cardSelected }" @toDetail="seletedCard(index)"></node-card-vue>
        </div>
        <div class="photo" v-show="id == 1">
            <photo-card-vue :photo="e" class="photo-card" v-for="(e, index) in  cards" :key="index"
                @toDetail="seletedCard(index)"></photo-card-vue>
        </div>

        <!-- 卡片状态 -->
        <div class="none-msg" v-if="isok == 0">
            <img :src="none[id].url" />
            <p>{{ none[id].msg }}</p>
        </div>

        <div class="loading" v-show="isok == -1">
            <div id="lottile"></div>
            <p>加载中...</p>
        </div>

        <p class="bottom-tip" v-show="isok == 1">......</p>

        <div class="add" :style="{ bottom: addBottom + 'px' }" @click="addCard" v-show="!modal">
            <span class="iconfont icon-tianjia"></span>
        </div>
        <yk-modal-vue :title="title" @cloose="closeModal" :isModal="modal">
            <new-card-vue :id="id" @addClose="closeModal" v-if="cardSelected == -1" @clickbt="newCard"></new-card-vue>
            <card-detail-vue v-if="cardSelected != -1" :card="cards[cardSelected]"></card-detail-vue>
        </yk-modal-vue>
        <yk-viewer-vue :isView="view" :photos="photoArr" :nowNumber="cardSelected"
            @viewSwitch="viewSwitch()"></yk-viewer-vue>
    </div>
</template>
  
<script>
import { wallType, label, none } from '@/utils/data'
import NodeCardVue from '@/components/NoteCard.vue';
import YkModalVue from '@/components/YkModal.vue';
import NewCardVue from '@/components/NewCard.vue';
import CardDetailVue from '@/components/CardDetail.vue';
import PhotoCardVue from '@/components/PhotoCard.vue';
import YkViewerVue from '@/components/YkViewer.vue';
import lottie from 'lottie-web';
import loading from '@/assets/images/loading.json';
// import { photo } from "../../mock/index"
import { findWallPageApi } from '@/api/index'
export default {
    data() {
        return {
            wallType,
            label,
            none,
            nlabel: -1,//当前对应的标签
            cards: [],
            photoArr: [],  // 图片列表哦
            nWidth: 0, // 卡片模块宽度
            addBottom: 30, // add按钮距离底部高度
            title: '写留言', // 新建标题
            modal: false, // 是否调用弹窗
            view: false,  // 预览大图
            cardSelected: -1, // 当前选择卡片
            isok: -1, //是否加载中 -1为加载中 0为没有拿到数据
            page: 1,
            pagesize: 8,
        }
    },
    components: {
        NodeCardVue,
        YkModalVue,
        NewCardVue,
        CardDetailVue,
        PhotoCardVue,
        YkViewerVue,
    },
    computed: {
        //留言墙与照片墙的id切换
        id() {
            return this.$route.query.id;
        },
        user() {
            return this.$store.state.user;
        }
    },
    watch: {
        id() {
            this.modal = false;
            this.view = false;
            this.nlabel = -1;
            this.cardSelected = -1;
        }
    },
    methods: {
        //切换label
        seletcNode(e) {
            this.nlabel = e;
            // 清空当前数据
            this.cards = [];
            this.page = 1;
            this.getWallCard(this.id);
        },
        // note的宽度
        noteWidth() {
            // 页面宽度
            let wWidth = document.body.clientWidth;
            this.nWidth = Math.floor((wWidth - 120) / 300) * 300;
        },
        // 监听页面滚动
        scrollBottom() {
            // 距离顶部高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 屏幕高度
            let clientHeight = document.documentElement.clientHeight;
            // 内容高度
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + clientHeight + 230 >= scrollHeight) {
                this.addBottom = scrollTop + clientHeight + 230 - scrollHeight;
            } else {
                this.addBottom = 30;
            }

            // 加载更多
            if (scrollTop + clientHeight == scrollHeight) {
                this.getWallCard(this.id);
            }
        },

        // 新建card
        addCard() {
            this.title = "写留言";
            this.modal = true;
        },

        // 切换弹窗打开与关闭
        closeModal() {
            this.modal = false;
            if (this.id == 1) {
                this.view = false;
            }
        },

        // 选择卡片
        seletedCard(e) {
            this.title = "";
            if (e != this.cardSelected) {
                this.cardSelected = e;
                this.modal = true;
                if (this.id == 1) {
                    this.view = true;
                }
            } else {
                this.cardSelected = -1;
                this.modal = false;
                if (this.id == 1) {
                    this.view = false;
                }
            }
        },
        // 切换图片
        viewSwitch(e) {
            if (e == 0) {
                this.cardSelected--;
            } else {
                this.cardSelected++;
            }
        },
        // 前端插入卡片
        newCard(e) {
            // console.log(e);
            this.cards.unshift(e);
            this.closeModal();
        },
        // 加载动画
        loading() {
            if (this.isok == -1) {
                this.$nextTick(async () => {
                    var params1 = {
                        container: document.getElementById("lottile"),
                        renderer: "svg",
                        loop: true,
                        autoplay: true,
                        animationData: loading,
                    };
                    lottie.loadAnimation(params1);
                })
            }
        },
        // 获取卡片
        getWallCard(id) {
            // 只有 page > 0 才执行

            if (this.page > 0) {
                this.isok = -1;
                let data = {
                    type: id,
                    page: this.page,
                    pagesize: this.pagesize,
                    userId: this.user.id,
                    label: this.nlabel,
                }
                // console.log(data);
                findWallPageApi(data).then((res) => {
                    this.cards = this.cards.concat(res.message);
                    // 设置下一次的page
                    // console.log(res.message);
                    if (res.message.length) {
                        this.page++;
                    } else { this.page = 0; }
                    if (this.cards.length > 0) {
                        this.isok = 1;
                        if (this.page == 0) {
                            this.isok = 2;
                        }
                    } else {
                        this.isok = 0;
                    }

                    // 如果为图片将图片单独拿出来
                    if (this.id == 1) {
                        for (let i = 0; i < this.cards.length; i++) {
                            this.photoArr.push(this.cards[i].imgurl)
                        }
                    }
                });
            }
        },
        getUser() {
            let timer = setInterval(() => {
                if (this.user) {
                    clearInterval(timer)
                    this.getWallCard(this.id)
                }
            }, 10)
        }

    },
    mounted() {
        this.noteWidth();
        this.loading();
        this.getUser();

        // 监听屏幕宽度变化
        window.addEventListener('resize', this.noteWidth);
        // 监听滚动高度变化
        window.addEventListener('scroll', this.scrollBottom);
    },
    unmounted() {
        // 监听屏幕宽度变化
        window.addEventListener('resize', this.noteWidth);
        // 监听滚动高度变化
        window.addEventListener('scroll', this.scrollBottom);
    }
}
</script>
  
<style lang="less" scoped>
@import url(../styles/commons.less);

.wall-message {
    min-height: 700px;
    padding-top: 52px;

    .title {
        padding-top: 48px;
        padding-bottom: 16px;
        font-size: 56px;
        color: @gray-1;
        text-align: center;
        font-weight: 600;
    }

    .slogan {
        color: @gray-2;
        text-align: center;
    }

    .label {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: 30px;

        .label-list {
            padding: 0 14px;
            align-items: center;
            height: 26px;
            margin: @padding-4;
            color: @gray-2;
            box-sizing: border-box;
            cursor: pointer;
        }

        .lbselected {
            color: @gray-1;
            font-size: 600;
            border: 1px solid @gray-1;
            border-radius: 16px;

        }
    }

    .card {
        display: flex;
        flex-wrap: wrap;
        margin: auto;

        .card-inner {
            margin: 6px;
        }

        .cardselected {
            border: 1px solid @primary-color;
        }
    }

    .photo {
        width: 88%;
        margin: 0 auto;
        columns: 6;
        column-gap: @padding-4;
    }

    .photo-card {
        margin-bottom: @padding-4;
        break-inside: avoid;
    }

    .add {
        width: 56px;
        height: 56px;
        background: @gray-1;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 28px;
        position: fixed;
        right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: @tr;

        .icon-tianjia {
            color: @gray-10;
            font-size: 24px;
        }
    }

    .none-msg {
        width: 100%;
        text-align: center;
        padding-top: 80px;
        position: absolute;
        top: 280px;

        img {
            display: inline;
        }

        p {
            font-family: serif;
            font-weight: 700;
            font-size: 24px;
            color: @gray-3;
        }
    }

    .loading {
        text-align: center;
        width: 100%;

        p {
            margin-top: -36px;
            font-family: serif;
            font-size: 24px;
            color: @gray-3;
        }
    }

    #lottile {
        margin-top: 20px;
        height: 200px;
    }

    .bottom-tip {
        text-align: center;
        color: @gray-3;
        padding: 20px;
    }
}
</style>