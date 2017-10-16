<template>
  <modal
    name="sign-in"
    :height="550"
    :width="800"
    :clickToClose="false">
    <div class="sign-in-box-wrapper">
      <div class="left-wrapper">
        <el-button
          type="primary"
          icon="close"
          @click="closeBox"></el-button>
        <div class="info-wrapper">

          <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
          <!--<el-tab-pane label="登 录" name="first">登  录</el-tab-pane>-->
          <!--<el-tab-pane label="注 册" name="second">注  册</el-tab-pane>-->
          <!--</el-tabs>-->

          <p>登录</p>

          <!--<div class="form-wrapper">-->
          <!--<span>手机／邮箱账号</span>-->
          <!--<el-input v-model="input"></el-input>-->

          <!--<br>-->
          <!--<br>-->
          <!--<span>密码</span>-->
          <!--<el-input v-model="input"></el-input>-->
          <!--</div>-->


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
                <el-button type="text">去注册</el-button>
              </div>
              <!--<el-button type="primary" @click="submitForm('signInForm')">登录</el-button>-->
              <!--<el-button @click="resetForm('signInForm')">重置</el-button>-->
            </el-form-item>

          </el-form>

        </div>
      </div>
      <div class="img-wrapper">
        <!--<img src="../../assets/p2.png">-->


        <el-carousel
          height="550px"
          arrow="never"
          :interval="8000">
          <el-carousel-item v-for="item in photos" :key="item">
            <img :src="item" width="100%">
          </el-carousel-item>
        </el-carousel>

      </div>
    </div>
  </modal>
</template>


<script>
  import {Button, Tabs, TabPane, Input, Carousel, CarouselItem, Form, FormItem} from 'element-ui'

  export default {
    name: 'sign-in',
    components: {
      elButton: Button,
      elTabs: Tabs,
      elTabPane: TabPane,
      elInput: Input,
      elCarousel: Carousel,
      elCarouselItem: CarouselItem,
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
      }
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'first',
        photos: [
          require('../../assets/p1.png'),
          require('../../assets/p2.png'),
          require('../../assets/p4.png'),
          require('../../assets/p3.png'),
          require('../../assets/p5.png')
        ],
        signInForm: {
          password: '',
          username: ''
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
      handleClick(tab, event) {
        console.log(tab, event);
      },
      closeBox() {
        this.$modal.hide('sign-in');
      },
    }
  }
</script>

<style scoped src="./SignIn.css"></style>

