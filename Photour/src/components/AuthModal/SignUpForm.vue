<template>
  <div class="info-wrapper">

    <p>注册</p>

    <el-form :model="signUpForm" :rules="rules2" ref="signUpForm" labelPosition="top">

      <el-form-item label="手机／邮箱账号" prop="username">
        <el-input v-model="signUpForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="signUpForm.password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="signUpForm.confirmPassword" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="go-sign-in">
          <span>已有账号？</span>
          <el-button
            type="text"
            @click="goSignIn"
          >
            去登录
          </el-button>
        </div>
        <div class="sign-in-button-wrapper">
          <el-button type="text" @click="submitForm('signInForm')">注册</el-button>
        </div>
        <!--<el-button @click="resetForm('signInForm')">重置</el-button>-->
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import {Button, Input, Form, FormItem} from 'element-ui'
  import { mapMutations } from 'vuex'

  export default {
    name: 'sign-up-form',
    components: {
      elButton: Button,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
    },
    data() {
      let checkUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机／邮箱账号'))
        } else {
          callback()
        }
      };
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };
      let validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.signUpForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        activeName: 'first',
        signUpForm: {
          password: '',
          username: '',
          confirmPassword: '',
        },
        rules2: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations([
        'goSignIn',
      ])

    }
  }
</script>

<style scoped src="./SignUpForm.css"></style>
