<template>
  <div class="sideBarItem" v-on:click="$emit('changeStyle')">
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'sideBarItem',
  props: {
    text: {
      type: String
    }
  },
  data () {
    return {
      isSelect: false
    }
  },
  methods: {

  }
}
</script>

<style>
.sideBarItem {
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-bottom: 1px solid #333;
  position: relative;
}
.text {
  font-size: 16px;
}
.select {
  background-color: #2379EB;
}
.selectText {
  color: #fff;
  font-size: 16px;
}
.iptForFocus {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  outline: none;
  border: none;
}
</style>
