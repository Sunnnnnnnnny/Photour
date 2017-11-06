<template>
  <div class="info-wrapper">

    <p>登录</p>


    <el-form :model="signInForm" :rules="rules2" ref="signInForm" labelPosition="top">

      <el-form-item label="手机／邮箱账号" prop="username">
        <el-input v-model="signInForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="signInForm.password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <div class="go-sign-up">
          <span>没有账号？</span>
          <el-button
            type="text"
            @click="goSignUp"
          >
            去注册
          </el-button>
        </div>
        <div class="sign-in-button-wrapper">
          <el-button type="text" @click="submitForm('signInForm')">登录</el-button>
        </div>
        <!--<el-button @click="resetForm('signInForm')">重置</el-button>-->
      </el-form-item>

    </el-form>

  </div>
</template>


<script>
  import {Button, Input, Form, FormItem} from 'element-ui'
  import {mapMutations, mapActions} from 'vuex'
  import {store} from '../../main'

  export default {
    name: 'sign-in-form',
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
      }
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };

      return {
        activeName: 'first',
        signInForm: {
          password: '',
          username: '',
        },
        rules2: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          username: [
            {validator: checkUsername, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations([
        'goSignUp',
      ]),
      ...mapActions({
        submitForm: 'signIn',
      }),
      submitForm(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            console.log(this.signInForm);
            store.dispatch('signIn', {
              username: this.signInForm.username,
              password: this.signInForm.password
            })
//            console.log(this.$refs[data])
//            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped src="./SignInForm.css"></style>
