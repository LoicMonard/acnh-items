<template>
  <div class="footer">
    <div class="socials">
      <a
        href="https://github.com/LoicMonard"
        target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png">
      </a>
      <a 
        href="https://codepen.io/LoicMonard"
        target="_blank">
        <img src="https://cdn2.iconfinder.com/data/icons/social-network-10/50/56-512.png" alt="">
      </a>
    </div>
    <span>Copyright © 2020 - 2021 Loïc Monard</span>
  </div>
</template>

<style lang="scss" scoped>
.footer {
  position: fixed;
  z-index: 9;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: rgb(248, 248, 248);
  display: flex;
  justify-content: center;
  align-items: center;
  .socials {
    img {
      height: 32px;
      width: 32px;
      margin: 0 4px;
    }
  }
}
</style>