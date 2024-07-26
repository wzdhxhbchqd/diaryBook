import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Button } from 'vant'
import { Form, Field, CellGroup, Icon, Uploader, ActionSheet } from 'vant';

import 'vant/lib/index.css';
import '@/assets/style/reset.css'//初始化样式
import 'lib-flexible/flexible.js'//修改根字体大小

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Button)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Icon)
app.use(Uploader);
app.use(ActionSheet);

app.use(createPinia())
app.use(router)

app.mount('#app')
