<template>
  <div class="header">
    <div class="item" v-for="item in content.option" :key="item.id">
      <el-button size="small" class="t" :type="content.active === item.value ? 'primary' : ''" @click="content.active = item.value">{{ item.title }}</el-button>
    </div>
  </div>

  <div class="content" v-show="content.active === 'shot'">
    <div class="option">
      <div class="title">截图快捷键</div>
      <div class="content">
        <div class="touch">⌘ ⇧ A</div>
      </div>
    </div>
  </div>

  <div class="content" v-show="content.active === 'window'">
    <div class="option">
      <div class="title">左对齐1/2</div>
      <div class="content">
        <div class="touch">⌃ ⌥ ←</div>
      </div>
    </div>
    <div class="option">
      <div class="title">右对齐1/2</div>
      <div class="content">
        <div class="touch">⌃ ⌥ →</div>
      </div>
    </div>
  </div>

  <div class="content" v-show="content.active === 'network'">
    <div class="option">
      <div class="title">右对齐1/2</div>
      <div class="content">
        <el-input type="text" v-model="proxyNetwork.input" placeholder="输入代理地址" style="width: 120px" />
        <el-button :type="proxyNetwork.active ? 'primary' : ''">{{ proxyNetwork.active ? '关闭代理' : '开启代理' }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

type TabVal = 'shot' | 'window' | 'network'

const content = ref<{ active: TabVal; option: { title: string; value: TabVal }[] }>({
  active: 'shot',
  option: [
    { title: '截图', value: 'shot' },
    { title: '窗口', value: 'window' },
    { title: '网络', value: 'network' }
  ]
})

const proxyNetwork = ref<{ input: string; active: boolean }>({
  input: 'http://localhost:7890',
  active: false
})
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  background-color: #eee;

  > .header {
    height: 40px;
    display: flex;
    background-color: #fff;
    border-bottom: solid 1px #ddd;
    align-items: center;

    > .item {
      flex: 1;
      text-align: center;
      height: 40px;
      padding: 8px 4px;
      box-sizing: border-box;

      > .t {
        width: 100%;
      }
    }
  }

  > .content {
    > .option {
      display: flex;
      font-size: 14px;
      margin: 0 10px;
      padding: 10px 0;
      border-bottom: solid 1px #ddd;

      > .title {
        width: 100px;
        line-height: 32px;
      }

      > .content {
        display: flex;

        > *:not(:last-child) {
          margin-right: 10px;
        }
      }

      .touch {
        height: 32px;
        line-height: 32px;
        padding: 0 10px;
        background-color: #fff;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
