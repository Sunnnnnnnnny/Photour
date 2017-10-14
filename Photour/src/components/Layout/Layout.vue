<template>

  <navigator>
    {{ msg }}
  </navigator>

</template>

<script>
  import Navigator from './Navigator'

  export default {
    name: '',
    components: {
      Navigator
    },
    data () {
      return {
        msg: 'test test test',
      }
    },
    computed: {

    }
  }

</script>
