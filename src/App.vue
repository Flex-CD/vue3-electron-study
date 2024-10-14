<template>
  <div class="header">
    <div class="item" v-for="item in content.option" :key="item.value">
      <el-button size="small" class="t" :type="content.active === item.value ? 'primary' : ''" @click="content.active = item.value">{{ item.title }}</el-button>
    </div>
  </div>

  <div class="content" v-show="content.active === 'shot'">
    <div class="option">
      <div class="title">截图快捷键</div>
      <div class="content">
        <div class="touch" v-if="$config.shot.set">
          <span v-if="$config.shot.input.length">{{ $config.shot.input.map((i: any) => i.t).join(' ') }}</span>
          <span v-else>请按键</span>
        </div>
        <div class="touch" v-else @click="$config.changeKey('shot')">{{ $config.shotT }}</div>
      </div>
    </div>
  </div>

  <div class="content" v-show="content.active === 'window'">
    <div class="option">
      <div class="title">窗口左半边</div>
      <div class="content">
        <div class="touch" v-if="$config.left.set">
          <span v-if="$config.left.input.length">{{ $config.left.input.map((i: any) => i.t).join(' ') }}</span>
          <span v-else>请按键</span>
        </div>
        <div class="touch" v-else @click="$config.changeKey('left')">{{ $config.leftT }}</div>
      </div>
    </div>
    <div class="option">
      <div class="title">窗口右半边</div>
      <div class="content">
        <div class="touch" v-if="$config.right.set">
          <span v-if="$config.right.input.length">{{ $config.right.input.map((i: any) => i.t).join(' ') }}</span>
          <span v-else>请按键</span>
        </div>
        <div class="touch" v-else @click="$config.changeKey('right')">{{ $config.rightT }}</div>
      </div>
    </div>
  </div>

  <div class="content" v-show="content.active === 'network'">
    <div class="option">
      <div class="title">网络代理</div>
      <div class="content">
        <el-input type="text" v-model="$config.network.value" placeholder="输入代理地址" style="width: 120px" />
        <el-button :type="$config.network.active ? 'primary' : ''" @click="$config.toggleNetworkStatus()">{{ $config.network.active ? '关闭代理' : '开启代理' }}</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import useConfigStore from '@/stores/config'

type TabVal = 'shot' | 'window' | 'network'

const $config = useConfigStore()

const content = ref<{ active: TabVal; option: { title: string; value: TabVal }[] }>({
  active: 'shot',
  option: [
    { title: '截图', value: 'shot' },
    { title: '窗口', value: 'window' },
    { title: '网络', value: 'network' }
  ]
})

onMounted(() => {
  $config.initKey()
  $config.getNetworkStatus()
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
  position: relative;
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
