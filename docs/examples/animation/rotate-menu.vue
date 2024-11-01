<template>
  <div class="content">
    <nav class="menu">
      <input type="checkbox" class="menu-toggler" id="menu-toggler" checked />
      <label class="menu-btn" for="menu-toggler"></label>
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
  .menu-toggler {
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    z-index: 2;
    opacity: 0;
    cursor: pointer;
  }
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
    opacity: 0;
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

    &:nth-child(1) img {
      transform: rotate(0deg);
    }
    &:nth-child(2) img {
      transform: rotate(60deg);
    }
    &:nth-child(3) img {
      transform: rotate(120deg);
    }
    &:nth-child(4) img {
      transform: rotate(180deg);
    }
    &:nth-child(5) img {
      transform: rotate(240deg);
    }
    &:nth-child(6) img {
      transform: rotate(30deg);
    }
  }

  .menu-toggler + label {
    width: 30px;
    height: 4px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: #13227a;
    transition: transform 0.5s, top 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .menu-toggler + label::before,
  .menu-toggler + label::after {
    content: '';
    width: 30px;
    height: 4px;
    display: block;
    z-index: 1;
    border-radius: 2.5px;
    background: #13227a;
    transition: transform 0.5s, top 0.5s;
    position: absolute;
    left: 0;
  }

  .menu-toggler + label::before {
    top: 10px;
  }
  .menu-toggler + label::after {
    top: -10px;
  }

  .menu-toggler:checked + label {
    background: transparent;
    &::before,
    &::after {
      top: 0;
      transform-origin: 50% 50%;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }

  .menu-toggler:checked ~ ul .menu-item {
    opacity: 1;
    &:nth-child(1) {
      transform: rotate(0deg) translateX(-60px);
    }
    &:nth-child(2) {
      transform: rotate(60deg) translateX(-60px);
    }
    &:nth-child(3) {
      transform: rotate(120deg) translateX(-60px);
    }
    &:nth-child(4) {
      transform: rotate(180deg) translateX(-60px);
    }
    &:nth-child(5) {
      transform: rotate(240deg) translateX(-60px);
    }
    &:nth-child(6) {
      transform: rotate(300deg) translateX(-60px);
    }
    img {
      pointer-events: auto;
    }
  }
}
</style>
