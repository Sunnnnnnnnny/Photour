<template>
  <div class="account-info-wrapper">

    <div class="avatar-wrapper">

      <el-tooltip class="item" effect="light" content="点击更改头像" placement="top">
        <div class="avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
      </el-tooltip>

      <p>{{this.user.username}}</p>

      <div class="homepage-wrapper">
        <div @click="goToHomepage">
          <img src="../../assets/img/homepage.png" width="20">
          <span>我的主页</span>
        </div>

      </div>
    </div>

    <div-header header="个人信息"></div-header>

    <div class="form-wrapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="ruleForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="confirm-button-wrapper">
            <el-button type="text" @click="handleEditUserInfo">确认修改</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div-header header="修改密码"></div-header>

    <div class="form-wrapper">
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" class="demo-ruleForm">
        <el-form-item label="原密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPw">
          <el-input type="password" v-model="ruleForm2.newPw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPw">
          <el-input type="password" v-model="ruleForm2.confirmPw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="confirm-button-wrapper">
            <el-button type="text" @click="handleEditPw('ruleForm2')">确认修改</el-button>
          </div>
        </el-form-item>
      </el-form>

    </div>

    <div-header header="我的标签"></div-header>
    <my-tags :canBeEdited=true :dynamicTags="this.user.tags.length === 0 ? [] : this.user.tags.split(' ')"></my-tags>

  </div>

</template>

<script>
  import DivHeader from '../../components/Util/DivHeader'
  import MyTags from '../../components/Util/MyTags'
  import {Tooltip, Input, Form, FormItem, RadioGroup, Radio, Button, Message} from 'element-ui'
  import {router} from '../../main'
  import {mapActions} from 'vuex'

  export default {
    name: 'account-info',
    components: {
      DivHeader,
      MyTags,
      Message,
      elTooltip: Tooltip,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elRadioGroup: RadioGroup,
      elRadio: Radio,
      elButton: Button
    },
    data() {
      let validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      };
      let validateNewPw = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'))
        } else {
          callback()
        }
      };
      let validateConfirmPw = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.newPw) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        avatarUrl: "https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg",
        ruleForm: {
          username: this.user.username,
          gender: '男',
          phone: this.user.phone === null ? '' : this.user.phone,
          email: this.user.email,
        },
        ruleForm2: {
          password: '',
          newPw: '',
          confirmPw: ''
        },
        rules: {
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          newPw: [
            {validator: validateNewPw, trigger: 'blur'}
          ],
          confirmPw: [
            {validator: validateConfirmPw, trigger: 'blur'}
          ]
        }
      }
    },
    props: ['user'],
    methods: {
      ...mapActions('auth', [
        'editUserInfo',
        'editUserPw'
      ]),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleEditUserInfo() {
        this.editUserInfo({
          userInfo: this.ruleForm,
          onSuccess: () => {
            Message({
              message: '修改成功！',
              type: 'success'
            });
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      },
      handleEditPw(data) {
        this.$refs[data].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm2)
            this.editUserPw({
              pwInfo: this.ruleForm2,
              onSuccess: () => {
                Message({
                  message: '修改成功！',
                  type: 'success'
                });
              },
              onError: (error) => {
                Message.error(error)
              }
            })
          } else {
            Message.error("请正确填写信息！")
          }
        })

      },
      goToHomepage() {
        router.push({name: 'UserHomePage'})
      }
    }
  }

</script>

<style scoped src="./AccountInfo.css"></style>
