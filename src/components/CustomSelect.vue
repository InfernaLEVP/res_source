<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected.Name }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.Name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: Object,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}
@media (max-width: 1400px) {
  .custom-select {
    height: 39px;
    line-height: 39px;
  }
}
@media (max-width: 1300px) {
  .custom-select {
    height: 32px;
    line-height: 32px;
  }
}
@media (max-width: 1200px) {
  .custom-select {
    height: 28px;
    line-height: 28px;
  }
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 6px;
  border: 2px solid #273a65;
  color: #273a65;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  border-color: inherit;
}

.custom-select .selected.open {
  border: 1px solid #ad8225;
  border-radius: 6px 6px 0px 0px;
}
.custom-select .selected.open:after {
  transform: rotate(180deg);
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 0px solid transparent;
  border-color: #273a65 transparent transparent transparent;
  background-image: url(../assets/arrow-down.svg);
  width: 20px;
  height: 11px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: transform .3s;
}
@media (max-width: 1400px) {
  .custom-select .selected:after{
    top: 17px;
  }
}
@media (max-width: 1300px) {
  .custom-select .selected:after{
    top: 13.5px;
  }
}
@media (max-width: 1200px) {
  .custom-select .selected:after{
    top: 10.5px;
  }
}

.custom-select .items {
  color: #273a65;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: rgba(255,255,255, .95);
  left: 0;
  right: 0;
  z-index: 155;
}

.custom-select .items div {
  color: #273a65;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
  transition: all .3s;
}

.custom-select .items div:hover {
  background-color: #273a65;
  color: white;
}

.selectHide {
  display: none;
}
</style>
