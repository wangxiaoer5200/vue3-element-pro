<template>
  <Table
    :tableData="tableData"
    :tableColumn="tableColumn"
    :tableExtra="tableExtra"
    @removeRow="removeRow"
  />
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import Table from "@/components/layout/table.vue";
import { filterTableSelectList } from "@/components/layout/layout";

// table
function getTable() {
  const table = reactive({
    // key => unique value
    tableData: [
      {
        key: "1",
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        desc: "一段描述",
      },
      {
        key: "2",
        date: "2011-01-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
        desc: "另一段描述",
      },
      {
        key: "3",
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区",
        desc: "一段描述",
      },
    ],
    tableColumn: [
      {
        prop: "selection",
        label: "选择框",
        type: "selection",
        width: 55,
        read: true,
      },
      {
        prop: "date",
        label: "日期",
        width: 180,
        type: "select",
        read: true,
      },
      { prop: "name", label: "姓名", read: true },
      { prop: "address", label: "地址", read: false },
      {
        prop: "desc",
        label: "描述",
        type: "select",
        selectList: [],
        read: false,
      },
      { prop: "handle", label: "操作", width: 180, fixed: "right", read: true },
    ],
    // table extra info
    tableExtra: {
      border: false,
    },
  });

  // get data
  onMounted(() => {
    filterTableSelectList(table.tableData, table.tableColumn);
  });

  // remove row
  const removeRow = (index: number) => {
    table.tableData.splice(index, 1);
  };

  return {
    ...toRefs(table),
    removeRow,
  };
}

export default defineComponent({
  name: "Home",
  setup() {
    return {
      ...getTable(),
    };
  },
  components: {
    Table,
  },
});
</script>

<style>
</style>