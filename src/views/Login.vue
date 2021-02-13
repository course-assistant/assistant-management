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

      <el-button class="btn-login" @click="handleLogin" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import TextUtil from '@/util/TextUtil';

import axios from 'axios';
import qs from 'qs';
export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        type: 1
      }
    }
  },
  methods: {
    // 点击登录
    handleLogin() {
      if (TextUtil.isEmpty(this.formData.username) || TextUtil.isEmpty(this.formData.password)) {
        this.$message.warning('账号和密码不能为空！');
        return;
      }

      // 验证用户名和密码
      // this.$router.push('/')

      console.log('formData');
      console.log(this.formData);

      axios.post('http://127.0.0.1:8686/login', qs.stringify({
        username: this.formData.username,
        password: this.formData.password,
        type: 1
      })).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
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