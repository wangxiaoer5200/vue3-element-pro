<template>
  <el-container>
    <el-aside class="aside" id="aside" width="201px">
      <BasicMenu :routes="routeList" @addTabs="addTabs" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <BasicHeader />
      </el-header>
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
        @tab-click="(ev) => $router.push(ev.paneName)"
      >
        <el-tab-pane
          v-for="item in editableTabs"
          :key="item.key"
          :label="item.title"
          :name="item.key"
        />
      </el-tabs>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import {
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElTabs,
  ElTabPane,
} from "element-plus";
import { filterRoutr, getTabTitle, Tab, FIRST_ROUTE } from "./utils";
import BasicMenu from "./basicMenu.vue";
import BasicHeader from "./basicHeader.vue";

// change Tabs
function Tabs(routeList: Ref<any[]>) {
  const editableTabsValue = ref(FIRST_ROUTE.key);
  const editableTabs = ref<Tab[]>([FIRST_ROUTE]);

  // removeTab
  const removeTab = (key: string) => {
    const index = editableTabs.value.findIndex((v) => v.key === key);
    index > -1 && editableTabs.value.splice(index, 1);
  };

  // addTab
  const addTabs = (key: string, path: string[]) => {
    const label = getTabTitle(key, path, routeList);
    const obj = { title: label, key };
    // editableTabs not have obj
    if (!JSON.stringify(editableTabs.value).includes(JSON.stringify(obj))) {
      editableTabs.value.push(obj);
    }
    editableTabsValue.value = key;
  };

  return {
    editableTabsValue,
    editableTabs,
    removeTab,
    addTabs,
  };
}

export default {
  name: "Basic",
  setup() {
    const { routes } = useRouter().options;
    const routeList = ref(filterRoutr(routes));
    return {
      routeList,
      ...Tabs(routeList),
    };
  },
  components: {
    ElContainer,
    ElAside,
    ElMain,
    ElHeader,
    BasicMenu,
    BasicHeader,
    ElTabs,
    ElTabPane,
  },
};
</script>

<style scoped lang='less'>
.aside {
  height: 100vh;
  box-shadow: 0 8px 8px 2px #ccc;
}
.header {
  height: 64px !important;
  box-shadow: 10px 0 4px 4px rgba(0, 0, 0, 0.06);
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
</style>