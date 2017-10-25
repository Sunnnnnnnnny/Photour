<template>
  <div class="account-info-wrapper">

    <div class="avatar-wrapper">

      <el-tooltip class="item" effect="light" content="点击更改头像" placement="top">
        <div class="avatar" :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"></div>
      </el-tooltip>

      <p>Tiann</p>

      <div class="likes-album">
        <div>
          <img src="../../assets/img/like.png" width="15">
          <span>我喜欢的： 239</span>
        </div>

        <div>
          <img src="../../assets/img/album.png" width="18">
          <span>我的相册： 3</span>
        </div>

      </div>
    </div>

    <div-header header="个人信息"></div-header>

    <div class="form-wrapper">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="ruleForm.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="confirm-button-wrapper">
            <el-button type="text" @click="">确认修改</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <div-header header="修改密码"></div-header>

    <div class="form-wrapper">
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" class="demo-ruleForm">
        <el-form-item label="原密码">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.newPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.confirmPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="confirm-button-wrapper">
            <el-button type="text" @click="">确认修改</el-button>
          </div>
        </el-form-item>
      </el-form>

    </div>

    <div-header header="我的标签"></div-header>
    <my-tags></my-tags>

  </div>

</template>

<script>
  import DivHeader from '../../components/Util/DivHeader'
  import MyTags from '../../components/Util/MyTags'
  import {Tooltip, Input, Form, FormItem, RadioGroup, Radio, Button} from 'element-ui'

  export default {
    name: 'account-info',
    components: {
      DivHeader,
      MyTags,
      elTooltip: Tooltip,
      elInput: Input,
      elForm: Form,
      elFormItem: FormItem,
      elRadioGroup: RadioGroup,
      elRadio: Radio,
      elButton: Button
    },
    data() {

      return {
        avatarUrl: "https://cdn.dribbble.com/users/548267/screenshots/2657798/wagon_v1_dribbble.jpg",
        ruleForm: {
          username: 'Tiann',
          gender: '男',
          email: '',
        },
        ruleForm2: {
          password: '',
          newPass: '',
          confirmPass: ''
        },
        rules: {}
      }
    },
    methods: {
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
      }
    }
  }

</script>

<style scoped src="./AccountInfo.css"></style>
