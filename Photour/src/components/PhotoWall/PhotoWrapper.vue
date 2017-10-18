<template>
  <div class="div-wrapper">

    <div class="photo-wrapper">
      <div class="photo" :style="{ 'background-image': 'url(' + photoUrl + ')' }">

      </div>
    </div>

    <div class="info-wrapper">
      <img src="../../assets/img/user.png" width="17"/>
      <span class="author-name">
        tiann97
      </span>

      <div class="right-wrapper">
        <img src="../../assets/img/comment.png" width="14"/>
        <span>12</span>
        &nbsp;
        <div class="like-section">
          <img src="../../assets/img/like.png" width="14"/>
          <span>249</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'photo',
    components: {},
    data() {
      return {
//        photoUrl: 'https://cdn.dribbble.com/users/226242/screenshots/3871814/1976_chevrolet_blazer.png',
        photoUrl: [require('../../assets/img/photo.png')]
      }
    },
    methods: {}
  }
</script>

<style scoped src="./PhotoWrapper.css"></style>
