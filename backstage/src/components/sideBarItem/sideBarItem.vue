<template>
  <div class="sideBarItem" v-on:click="$emit('changeStyle');gotoTarget()">
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
export default {
  name: 'sideBarItem',
  props: {
    text: {
      type: String
    },
    url: {
      type: String,
    }
  },
  data () {
    return {
      isSelect: false
    }
  },
  methods: {
    gotoTarget() {
      let curUrl = this.$router.history.current.path;
      if (!(curUrl == this.url)) {
        this.$router.push({path: this.url})
      }
    }
  }
}
</script>

<style>
.sideBarItem {
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-top: 1px solid hsla(0,0%,100%,.05);
  border-bottom: 1px solid rgba(0,0,0,.2);
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
