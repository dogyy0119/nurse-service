import App from './App'
import store from './store'
import i18n from './lang/i18n'


// #ifndef VUE3
import Vue from 'vue'

import uView from "uview-ui";
import './uni.promisify.adaptor'

Vue.use(uView);

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
// #endif


// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(i18n)
	app.use(store)
	return {app}
}
// #endif
