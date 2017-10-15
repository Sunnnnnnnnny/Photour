<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <welcome></welcome>
        <photo-wall></photo-wall>
      </div>
    </layout>
  </div>
</template>

<script>
  import Layout from '../components/Layout/Layout'
  import Welcome from '../components/Welcome/Welcome'
  import PhotoWall from '../components/PhotoWall/PhotoWall'

  export default {
    name: 'HelloWorld',
    components: {
      Layout,
      Welcome,
      PhotoWall
    },
    data() {
      return {
        msg: '你的图片旅行'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
