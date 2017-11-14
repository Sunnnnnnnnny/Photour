<template>
  <div class="info-wrapper">

    <p>注册</p>

    <el-form :model="signUpForm" :rules="rules2" ref="signUpForm" labelPosition="top">

      <el-form-item label="用户名" prop="username">
        <el-input v-model="signUpForm.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱账号" prop="email">
        <el-input v-model="signUpForm.email"></el-input>
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
          <el-button type="text" @click="submitForm('signUpForm')">注册</el-button>
        </div>
        <!--<el-button @click="resetForm('signInForm')">重置</el-button>-->
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  import {Button, Input, Form, FormItem, Message} from 'element-ui'
  import {mapMutations, mapActions} from 'vuex'

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
          return callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      };
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入邮箱账号'))
        } else if (!/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test(value)) {
          return callback(new Error('请输入正确的邮箱格式'))
        } else {
          callback()
        }
      };
      let validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };
      let validateConfirmPassword = (rule, value, callback) => {
        if (!value) {
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
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        rules2: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          confirmPassword: [
            {validator: validateConfirmPassword, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations('auth', [
        'goSignIn'
      ]),
      ...mapActions('auth', [
        'signUp'
      ]),
      submitForm(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            console.log("sign up!!!")
            this.signUp({
              body: {
                username: this.signUpForm.username,
                email: this.signUpForm.email,
                password: this.signUpForm.password
              },
              onSuccess: (success) => {
                Message({
                  message: success,
                  type: 'success'
                });
                this.$modal.hide('sign-in');
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error("请正确填写信息！")
          }
        })
      }

    }
  }
</script>

<style scoped src="./SignUpForm.css"></style>
