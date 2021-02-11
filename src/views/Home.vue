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
          <a class="logout" title="退出登录" @click="handleLogout">root 退出</a>
        </el-col>
      </el-row>
    </el-header>
    <!-- container -->
    <el-container>
      <!-- Menu -->
      <el-aside class="aside" width="230px">
        <el-menu
          default-active="2"
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
              <template slot="title">管理你的商品</template>
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
  components: {
  },
  methods: {
    // 进入首页
    toHomePage() {
      if ('/' !== this.$route.path) {
        this.$router.push('/');
      }
    },
    handleLogout() {
      this.$message.info('退出');
    }
  },
}
</script>

<style lang="less">
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