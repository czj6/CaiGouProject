import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

import { Message , Button, Input, TableColumn, Table, Switch, Menu, RadioButton, Card, Radio,RadioGroup,MenuItem,Form,Checkbox,CheckboxGroup,Dialog,Tabs } from 'element-ui'

Vue.config.productionTip = false
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Table.name, Table)
Vue.component(Switch.name, Switch)
Vue.component(Menu.name, Menu)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Card.name, Card)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name,RadioGroup)
Vue.component(MenuItem.name,MenuItem)
Vue.component(Form.name,Form)
Vue.component(Checkbox.name,Checkbox)
Vue.component(CheckboxGroup.name,CheckboxGroup)
Vue.component(Dialog.name,Dialog)
Vue.component(Tabs.name, Tabs)

Vue.use(VueAxios, axios)
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
