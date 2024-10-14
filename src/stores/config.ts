import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import localStorage from '@/utils/local-storage'

interface BaseItem {
  t: string
  v: string
}

interface KeyItem {
  value: BaseItem[]
  set: boolean
  input: BaseItem[]
}

interface State {
  shot: KeyItem
  left: KeyItem
  right: KeyItem
  network: { active: boolean; value: string }
}

const STATE_STORE = 'STATE_STORE'

const KEY_MAP: { [x: string]: BaseItem } = {
  Meta: { t: '⌘', v: 'Command' },
  Alt: { t: '⌥', v: 'Alt' },
  Control: { t: '⌃', v: 'Control' },
  Shift: { t: '⇧', v: 'Shift' },
  ArrowLeft: { t: '←', v: 'Left' },
  ArrowRight: { t: '→', v: 'Right' },
  ArrowUp: { t: '↑', v: 'Up' },
  ArrowDown: { t: '↓', v: 'Down' }
}

export default defineStore('config', {
  state: (): State => {
    return (
      localStorage.get<State>(STATE_STORE) || {
        shot: { value: [], set: false, input: [] },
        left: { value: [], set: false, input: [] },
        right: { value: [], set: false, input: [] },
        network: { active: false, value: 'http://localhost:7890' }
      }
    )
  },

  getters: {
    shotT: (state) => state.shot.value.map((i) => i.t).join(' ') || '点击设置',
    leftT: (state) => state.left.value.map((i) => i.t).join(' ') || '点击设置',
    rightT: (state) => state.right.value.map((i) => i.t).join(' ') || '点击设置'
  },

  actions: {
    /**
     * 网络相关
     */
    getNetworkStatus() {
      // todo 调用 api 获取 vpn 连接状态
    },
    toggleNetworkStatus() {
      if (!this.network.value) {
        return
      }

      // todo 调用 api 设置 vpn

      this.network.active = !this.network.active
    },

    /**
     * 修改快捷键
     */
    initKey() {
      window.electron.setkey(JSON.stringify({ type: 'shot', old: [], new: this.shot.value }))
      window.electron.setkey(JSON.stringify({ type: 'left', old: [], new: this.left.value }))
      window.electron.setkey(JSON.stringify({ type: 'right', old: [], new: this.right.value }))
    },
    changeKey(type: 'shot' | 'left' | 'right') {
      const cur = this[type]

      cur.input = []
      cur.set = true

      const onkeydown = (event: KeyboardEvent) => {
        cur.input.push(KEY_MAP[event.key] || { t: event.key, v: event.key })
      }

      window.addEventListener('keydown', onkeydown)

      window.addEventListener(
        'keyup',
        async () => {
          window.removeEventListener('keydown', onkeydown)

          const ok = await window.electron.setkey(JSON.stringify({ type, old: cur.value, new: cur.input }))

          if (!ok) {
            cur.set = false
            cur.input = []
            ElMessage.error('该按键已经应用注册，请重新设置')
            return
          }

          // 赋值并保存
          cur.value = cur.input
          cur.set = false
          cur.input = []
          localStorage.set(STATE_STORE, {
            shot: this.shot,
            left: this.left,
            right: this.right,
            network: this.network
          })
        },
        { once: true }
      )
    }
  }
})
