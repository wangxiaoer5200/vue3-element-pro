<template>
  <div class="assist">
    <i class="el-icon-s-help edit" @click="changeTableColumn = true" />
  </div>
  <el-table
    class="table"
    :data="tableData"
    ref="table"
    :border="tableExtra.border"
    @selection-change="changeSelection"
  >
    <el-table-column
      v-for="item in renderTableColumnData"
      :key="item.prop || null"
      :prop="item.prop || null"
      :label="item.label || null"
      :width="item.width || null"
      :fixed="item.fixed || null"
      :filters="item.type === 'select' ? item.selectList : null"
      :filter-placement="item.type === 'select' ? 'bottom-end' : null"
      :filter-method="item.type === 'select' ? filterTableColumn : null"
      :type="item.type === 'selection' ? 'selection' : null"
    >
      <template #default="scoped" v-if="item.prop === 'handle'">
        <span class="download">下载</span>
        <span class="download" @click="removeRow(scoped)">删除</span>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="changeTableColumn" direction="rtl" size="540px">
    <el-transfer
      class="transfer"
      v-model="selectTableColumn"
      :titles="['未显示列表', '已显示列表']"
      :props="{
        key: 'prop',
        label: 'label',
      }"
      :data="tableColumnFreeze.filter((v) => v.label && v.prop)"
      @change="changeTableColumnFun"
    />
  </el-drawer>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, shallowRef, computed } from "vue";
import { ElTable, ElTableColumn, ElDrawer, ElTransfer } from "element-plus";
import { TableColumn, TableExtra, filterSomeValues } from "./layout";

export default defineComponent({
  name: "Table",
  props: {
    tableData: {
      type: Array,
      require: true,
    },
    tableColumn: {
      type: Array as PropType<TableColumn[]>,
      require: true,
    },
    tableExtra: {
      type: Object as PropType<TableExtra>,
      require: true,
    },
  },
  emits: ["removeRow"],
  setup(props, { emit }) {
    // ref to table
    const table = ref();

    // selectionList
    const selectionList = ref<any[]>([]);

    // filter table column
    const filterTableColumn = (
      val: string,
      row: { [props: string]: string },
      column: { property: string }
    ) => {
      const key = column.property;
      return row[key] === val;
    };

    // remove row
    const removeRow = (scoped: { $index: number; row: any }) => {
      const { key } = scoped.row;
      const index = props.tableData!.findIndex((v: any) => v["key"] === key);
      emit("removeRow", index);
      // remove finish && clear filter
      table.value.clearFilter();
    };

    // change selection
    const changeSelection = (obj: unknown) => {
      console.log(obj, "selection alreay selected");
      selectionList.value.push(obj);
    };

    // show or hidden changeTableColumn btn
    const changeTableColumn = shallowRef(false);

    // computed to freeze table column
    const tableColumnFreeze = computed(() => props.tableColumn);

    // table column transfer
    const selectTableColumn = ref<string[]>([]);

    // render tableColumn data
    const renderTableColumnData = ref(
      filterSomeValues(tableColumnFreeze.value, "read", true, selectTableColumn)
    );

    // change table column function
    const changeTableColumnFun = (initList: string[]) => {
      let a = -1;
      const list = tableColumnFreeze.value!,
        { length } = list,
        result: any[] = [];
      while (++a < length) {
        initList.forEach((v) => {
          if (list[a]["prop"] && list[a]["prop"] === v) {
            result.push(list[a]);
          }
        });
      }
      renderTableColumnData.value = result;
    };

    return {
      filterTableColumn,
      removeRow,
      changeSelection,
      changeTableColumn,
      selectTableColumn,
      changeTableColumnFun,
      renderTableColumnData,
      tableColumnFreeze,
      table,
    };
  },
  components: {
    ElTable,
    ElTableColumn,
    ElDrawer,
    ElTransfer,
  },
});
</script>

<style lang='less' scoped>
.assist {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  .edit {
    cursor: pointer;
    font-size: 20px;
  }
}

.table {
  width: 100%;
  .download {
    color: var(--theme-color);
    cursor: pointer;
    font-size: var(--theme-font-size);
    margin-right: 10px;
  }
  :deep(.cell) {
    font-size: var(--theme-font-size);
  }
}

.transfer {
  margin-left: 20px;
}
</style>