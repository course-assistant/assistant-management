<template>
  <div class="login">
    <el-form class="login-form" label-position="left" label-width="80px">
      <h2 class="title">管理员登录</h2>
      <el-form-item label="账号：" label-width="70px">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" label-width="70px">
        <el-input v-model="password" type="password"></el-input>
      </el-form-item>

      <el-button class="btn-login" @click="handleLogin" type="primary">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
import TextUtil from '@/util/TextUtil';
import MD5Util from '@/util/MD5Util';
export default {
  data() {
    return {
      username: '',
      password: ''

    }
  },
  methods: {
    // 点击登录
    async handleLogin() {
      if (TextUtil.isEmpty(this.username) || TextUtil.isEmpty(this.password)) {
        this.$message.warning('账号和密码不能为空！');
        return;
      }
      // 验证用户名和密码
      let [data, err] = await this.$awaitWrap(this.$post('login', {
        username: this.username,
        password: MD5Util(this.password),
        type: 1
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      // 登录成功，将token存入本地存储
      localStorage.setItem('hncj_management_admin_token', data.data.token);
      localStorage.setItem('hncj_management_admin_id', data.data.id);
      this.$router.push('/');
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #27825d;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    background: #fff;
    padding: 25px 35px;
    border-radius: 12px;

    .title {
      margin-bottom: 22px;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>