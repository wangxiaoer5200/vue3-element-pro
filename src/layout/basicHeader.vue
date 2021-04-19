<template>
  <header>
    <div class="left">
      <i class="el-icon-s-fold icon mouse" @click="SET_MENUCOLLAPSE" />
    </div>
    <div class="right">
      <el-popover placement="bottom" :width="200" trigger="click">
        <template #reference>
          <el-avatar
            class="mouse"
            size="small"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
        </template>
        <ul id="info">
          <li v-for="item in infoList" :key="item">{{ item }}</li>
        </ul>
      </el-popover>
    </div>
  </header>
</template>

<script>
import { defineComponent, shallowRef } from 'vue'
import { mapMutations } from 'vuex'
import { ElAvatar, ElPopover } from 'element-plus'

export default defineComponent({
  name: 'BasicHeader',
  setup() {
    // info list
    const infoList = shallowRef(['登出账号'])
    return {
      ...mapMutations('layout', ['SET_MENUCOLLAPSE']),
      infoList
    }
  },
  components: {
    ElAvatar,
    ElPopover
  }
})
</script>

<style lang='less' scoped>
header {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .icon {
    font-size: 20px;
  }
  .mouse {
    cursor: pointer;
  }
}
#info {
  li {
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>