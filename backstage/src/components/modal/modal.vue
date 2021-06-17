<template>
  <div class="mask" v-show="isShow" >
    <div class="modal-box" v-bind:class="{'small-size': smallSize }">
      <div class="modal-head">{{title}}</div>
      <slot name="modalBody"></slot>
      <slot name="modalFooter"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    title: {
      type: String
    },
    isShow: {
      type: Boolean,
      default: false
    },
    bigSize: {
      type: Boolean,
      default: true, // 1大 2小
    },
    smallSize: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .45);
  z-index: 99;
}
.modal-box {
  width: 650px;
  height: 400px;
  background-color: #eee;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% ,-50%);
}
.small-size {
  width: 500px;
  height: 200px;
}
.modal-head {
  height: 50px;
  background-color: #2379EB;
  color: #fff;
  line-height: 50px;
  text-align: center;
}
</style>
