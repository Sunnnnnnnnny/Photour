<template>
  <modal
    name="modify-avatar-modal"
    :clickToClose="true"
    :height="600">

  </modal>

</template>

<script>
  import {Input, Message} from 'element-ui'
  import {mapState} from 'vuex'
  import {router} from '../../main'

  export default {
    name: 'modify-avatar-modal',
    components: {
      elInput: Input
    },
    data() {
      return {
        textarea: ''
      }
    },
    computed: {
      
    },
    methods: {
    }
  }

</script>

<style scoped src="./ForwardModal.css"></style>
