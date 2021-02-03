<template>
  <div class="login">
    <el-form
      class="login-form"
      label-position="left"
      label-width="80px"
      :model="formData"
    >
      <h2 class="title">管理员登录</h2>
      <el-form-item label="账号：" label-width="70px">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" label-width="70px">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>

      <el-button class="btn-login" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {

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