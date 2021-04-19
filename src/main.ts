import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import './config/css.config.css'
import store from './store'
// import Directive from './utils/directive'

locale.use(lang) // 设置语言
const app = createApp(App)
// Directive(app)

app.use(router).use(store).mount('#app')
