<template>
  <template v-for="item in routes" :key="item.label">
    <!-- submenu -->
    <el-submenu
      :index="item.label"
      v-if="item.children && item.children.length > 0"
    >
      <template #title>
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <!-- recursion components -->
      <layout-menu
        v-if="item.children && item.children.length > 0"
        :routes="item.children"
      />
    </el-submenu>
    <!-- menuItem -->
    <el-menu-item :index="item.key" v-else>
      <i :class="item.icon"></i>
      <template #title>{{ item.label }}</template>
    </el-menu-item>
  </template>
</template>

<script lang='ts'>
import { defineComponent, PropType } from "vue";
import { ElSubmenu, ElMenuItem } from "element-plus";
import { Routes } from "@/layout/utils";

export default defineComponent({
  name: "layoutMenu",
  props: {
    routes: {
      type: Array as PropType<Routes[]>,
      require: true,
    },
  },
  components: {
    ElSubmenu,
    ElMenuItem,
  },
});
</script>

<style scoped lang='less'>
.menu {
  .is-active {
    background: var(--theme-color) !important;
  }
}
</style>