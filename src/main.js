
import Vue from 'vue'
import App from './App';
import router from './router/router'
import store from './store'
import ElementUI from 'element-ui'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import "babel-polyfill";
import axios from './router/axios'
import './permission' // 权限
import './errorLog' // 错误日志
import AVUE from 'avue-cli/lib/avue.js'
import {
  loadStyle
} from './util/util'
import * as urls from '@/config/env'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'
import VCharts from 'v-charts'
import * as filters from './filters' // 全局filter
import './styles/common.scss'

import Viewer from 'v-viewer' //https://github.com/fengyuanchen/viewerjs
import 'viewerjs/dist/viewer.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueMoment)
Vue.use(VueAxios, axios)
Vue.use(VCharts)
Vue.use(Viewer)


Viewer.setDefaults({
  Options: {
    "inline": true,//启用 inline 模式
    "button": true,//显示右上角关闭按钮
    "navbar": true,//显示缩略图导航
    "title": true,//显示当前图片的标题
    "toolbar": true,//显示工具栏
    "tooltip": true,//显示缩放百分比
    "movable": true,//图片是否可移动
    "zoomable": true,//图片是否可缩放
    "rotatable": true,//图片是否可旋转
    "scalable": true,//图片是否可翻转
    "transition": true,//使用 CSS3 过度
    "fullscreen": true,//	播放时是否全屏
    "keyboard": true,//	是否支持键盘
    "url": "data-source" //设置大图片的 url
  }
})

Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})


export function createApp() {
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {
    app,
    router,
    store
  }
}
