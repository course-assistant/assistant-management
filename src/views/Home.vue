<template>
  <el-container class="container">
    <!-- header -->
    <el-header class="header">
      <el-row>
        <el-col id="logo" :span="4">
          <p @click="toHomePage">LOGO</p>
        </el-col>
        <el-col class="title-div" :span="16">
          <h2>课程助手管理员</h2>
        </el-col>
        <el-col class="logout-div" :span="4">
          <a class="logout" title="退出登录" @click="handleLogout">
            <!-- root 退出 -->
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon-color="#66b1ff"
              title="确认退出此用户？"
              @confirm="confirmLogout"
            >
              <el-button slot="reference" type="text" style="color:#000">
                {{ current_admin_id }} 退出
              </el-button>
            </el-popconfirm>
          </a>
        </el-col>
      </el-row>
    </el-header>
    <!-- container -->
    <el-container>
      <!-- Menu -->
      <el-aside class="aside" width="230px">
        <el-menu
          default-active="1"
          :router="true"
          class="el-menu-vertical-demo"
        >
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>教师管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">管理教师用户</template>
              <el-menu-item index="teacher-list">
                <span>教师列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>学生管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">管理学生用户</template>
              <el-menu-item index="student-list">学生列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>其他</span>
            </template>
            <el-menu-item-group>
              <template slot="title">管理其他</template>
              <el-menu-item index="other">其他</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- Main -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data: () => {
    return {
      current_admin_id: localStorage.getItem('hncj_management_admin_id')
    }
  },
  components: {
  },
  methods: {
    // 进入首页
    toHomePage() {
      if ('/' !== this.$route.path) {
        this.$router.push('/');
      }
    },
    // 点击退出
    handleLogout() { },
    confirmLogout() {
      localStorage.setItem("hncj_management_admin_token", '');
      localStorage.setItem("hncj_management_admin_id", '');
      this.$router.push('/login');
      this.$message.info('已退出');
    },
  },


  // 在创建组件前，验证登录信息
  async beforeCreate() {
    // 获取token
    let token = localStorage.getItem("hncj_management_admin_token");
    // console.log('token：' + token);
    if (token === null || token.trim() === '') {
      this.$message.warning('请先登录');
      this.$router.push('/login');
      return;
    }

    // 验证token
    let [data, err] = await this.$awaitWrap(this.$post('authentication', {
      token: token,
      type: 1
    }));
    if (err) {
      this.$message.error(err);
      this.$router.push('/login');
      return;
    }
    // 验证成功
    console.log('身份验证成功');

    this.$notify({
      title: '欢迎回来',
      message: '浏览器会记住您的登录信息，以方便您下次打开此网页后跳过登录验证。',
      offset: 62
    });

    setTimeout(() => {
      this.$notify({
        message: '如果这个不是您的电脑，请在关闭浏览器前在右上角安全退出！。',
        offset: 62
      });
    })
  },
}
</script>

<style lang="less">
// 最外层容器
.container {
  height: 100%;
  .header {
    line-height: 60px;
    background: #b3c0d1;
    box-shadow: 0 2px 4px -1px #dddddd;

    #logo {
      cursor: pointer;
    }

    .title-div {
      text-align: center;
    }
    .logout-div {
      text-align: right;
      padding-right: 12px;
      a {
        cursor: pointer;
      }
    }
  }
  .aside {
    background-color: #d3dce6;
  }
  .main {
    background-color: #e9eef3;
  }
}
</style>