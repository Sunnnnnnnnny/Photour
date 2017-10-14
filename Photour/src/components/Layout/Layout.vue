<template>

  <div>
    <navigator>
      <!--{{ msg }}-->
    </navigator>

    <div class="body-wrapper">

    </div>

    <my-footer>

    </my-footer>
  </div>

</template>

<script>
  import Navigator from './Navigator'
  import Footer from './Footer'

  export default {
    name: '',
    components: {
      Navigator,
      myFooter: Footer
    },
    data() {
      return {
        msg: 'test test test',
      }
    },
    computed: {}
  }

</script>
