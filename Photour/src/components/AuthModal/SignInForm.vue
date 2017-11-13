<template>
  <div class="info-wrapper">

    <p>登录</p>


    <el-form :model="signInForm" :rules="rules2" ref="signInForm" labelPosition="top">

      <el-form-item label="邮箱账号" prop="username">
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
  import {Button, Input, Form, FormItem, Message} from 'element-ui'
  import {mapMutations, mapActions, mapState} from 'vuex'
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
          return callback(new Error('请输入邮箱账号'))
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
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    methods: {
      ...mapMutations('auth', [
        'goSignUp',
      ]),
      ...mapActions('auth', [
        'signIn'
      ]),
      submitForm(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
//            console.log(this.signInForm);
            this.signIn({
              body: {
                email: this.signInForm.username,
                password: this.signInForm.password
              },
              onSuccess: (username) => {
                this.confirmSignIn(username);
              },
              onError: (error) => {
                Message.error(error)
              }
            })
//            console.log(this.$refs[data])
//            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      confirmSignIn(username) {
        console.log(this.user);
        console.log("confirm!");
        if (this.user !== null) {
          this.$modal.hide('sign-in');
          console.log("login success!!")
          Message({
            message: 'Hi, ' + username + '!',
            type: 'success'
          });
        }
      }
    }
  }
</script>

<style scoped src="./SignInForm.css"></style>
