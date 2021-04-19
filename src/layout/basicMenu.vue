<template>
  <h1>Logo</h1>
  <el-menu
    :default-active="$route.path"
    :class="['menu', menuLight && 'menuLight']"
    :background-color="menuStyle.background"
    :text-color="menuStyle.text"
    :active-text-color="menuStyle.activeText"
    :collapse="menuCollapse"
    router
    @select="menuSelect"
  >
    <LayoutMenu :routes="routes" />
  </el-menu>
  <!-- 切换皮肤 -->
  <div class="changeSkin" @click="changeSkin">
    <i class="el-icon-setting" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, shallowRef, ref } from "vue";
import { ElMenu } from "element-plus";
import { Routes } from "./utils";
import { menuLightStyle, menuBlackStyle } from "@/config/menu";
import { mapState } from "vuex";
import LayoutMenu from "@/components/layout/menu.vue";

export default defineComponent({
  name: "BasicMenu",
  props: {
    routes: {
      type: Array as PropType<Routes[]>,
      require: true,
    },
  },
  computed: mapState("layout", ["menuCollapse"]),
  emits: ["addTabs"],
  setup(props, { emit }) {
    /**
     * menu
     */
    const menuStyle = ref(menuBlackStyle);
    const menuLight = shallowRef(false);
    // menu select
    const menuSelect = (index: string, path: string[]) => {
      emit("addTabs", index, path);
    };

    // changeSkin
    const changeSkin = () => {
      if (!menuLight.value) {
        menuStyle.value = menuLightStyle;
        document.getElementById("app")!.className = "light-theme";
      } else {
        menuStyle.value = menuBlackStyle;
        document.getElementById("app")!.className = "";
      }
      menuLight.value = !menuLight.value;
    };

    return {
      changeSkin,
      menuStyle,
      menuLight,
      menuSelect,
    };
  },
  components: {
    ElMenu,
    LayoutMenu,
  },
});
</script>

<style lang='less' scoped>
@logo_height: 60px;
h1 {
  line-height: @logo_height;
  padding-left: 20px;
  font-size: 20px;
  background: var(--menu-theme);
  width: calc(100% - 21px);
  color: var(--menu-logo);
}
.menu {
  height: calc(100% - @logo_height);
}
.el-menu--collapse {
  width: auto !important;
}
.menuLight {
  :deep(.el-menu-item:hover),
  :deep(.el-submenu__title:hover) {
    background: var(--theme-color) !important;
    color: var(--menu-color) !important;
  }
}
.changeSkin {
  position: fixed;
  right: 0;
  top: 30%;
  width: 40px;
  line-height: 40px;
  background: var(--theme-color);
  text-align: center;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  z-index: 10;
  i {
    color: #fff;
  }
}
</style>