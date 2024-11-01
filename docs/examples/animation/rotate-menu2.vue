<template>
  <div class="content">
    <nav class="menu">
      <ul>
        <li class="menu-item">
          <img
            @click="handleClick(1)"
            src="../../public/img/menu/ali.png"
            alt=""
          />
        </li>
        <li class="menu-item">
          <img
            @click="handleClick(2)"
            src="../../public/img/menu/wx.png"
            alt=""
          />
        </li>
        <li class="menu-item">
          <img
            @click="handleClick(3)"
            src="../../public/img/menu/qq.png"
            alt=""
          />
        </li>
        <li class="menu-item">
          <img
            @click="handleClick(4)"
            src="../../public/img/menu/tx.png"
            alt=""
          />
        </li>
        <li class="menu-item">
          <img
            @click="handleClick(5)"
            src="../../public/img/menu/dd.png"
            alt=""
          />
        </li>
        <li class="menu-item">
          <img
            @click="handleClick(6)"
            src="../../public/img/menu/wb.png"
            alt=""
          />
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup>
const handleClick = (index) => {
  console.log(index)
}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 200px;
  position: relative;
  ul,
  li {
    list-style: none;
  }
}

.menu {
  .menu-item {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    transition: all 0.5s;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      padding: 10px;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      &:hover {
        background: rgba(0, 0, 0, 0.09);
      }
    }
 
    &:nth-child(1) {
      border: 1px solid #f00;
      transform: rotate(0deg) translateX(-60px);
      img {
        transform: rotate(0deg);
      }
    }
    &:nth-child(2) {
      transform: rotate(60deg) translateX(-60px);
      img {
        transform: rotate(0deg);
      }
    }
    &:nth-child(3) {
      transform: rotate(120deg) translateX(-60px);
      img {
        transform: rotate(0deg);
      }
    }
    &:nth-child(4) {
      transform: rotate(180deg) translateX(-60px);
      img {
        transform: rotate(0deg);
      }
    }
    &:nth-child(5) {
      transform: rotate(240deg) translateX(-60px);
      img {
        transform: rotate(0deg);
      }
    }
    &:nth-child(6) {
      transform: rotate(300deg) translateX(-60px);
      img {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
