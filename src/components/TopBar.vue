<template>
    <div class="top-bar">
        <div class="logo">
            <img src="@/assets/images/yksg.svg" class="logo-img" />
            <p class="logo-name">一刻时光</p>
        </div>
        <div class="menu">
            <yk-button-vue :nom="id == 0 ? 'cprimary' : 'csecondary'" class="menu-message"
                @click="changeWall(0)">留言墙</yk-button-vue>
            <yk-button-vue :nom="id == 1 ? 'cprimary' : 'csecondary'" class="mebu-photo"
                @click="changeWall(1)">照片墙</yk-button-vue>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>
  
<script>
import YkButtonVue from './YkButton.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        YkButtonVue,
    },
    computed: {
        id() {
            return this.$route.query.id;
        }
    },
    methods: {
        // 切换
        changeWall(e) {
            if (this.id !== e) {
                this.$router.push({
                    query: { id: e },
                });
            }
        },
    },
    watch: {
        // 监听路由变化
        $route(to) {
            // 在这里添加重新加载数据的逻辑
            if (to.query.id === '1' || to.query.id === '0') {
                window.location.reload();
            }
        },
    },
}


</script>
  
<style lang="less" scoped>
@import url(../styles/commons.less);

.top-bar {
    width: 100%;
    height: 52px;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;

    .logo {
        display: flex;
        align-items: center;
        width: 200px;

        .logo-name {
            font-size: 20px;
            color: @gray-1;
            font-weight: 600;
            padding-left: 10px;
        }
    }

    .menu {
        .menu-message {
            margin-right: 24px;
        }
    }

    .user {
        width: 200px;

        .user-head {
            float: right;
            border-radius: 50%;
            height: 36px;
            width: 36px;
            background-image: linear-gradient(180deg, rgba(81, 169, 255, 0.50) 0%, #51A9FF 100%);
        }
    }
}</style>