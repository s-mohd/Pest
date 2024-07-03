<template>
	<div id="app">
		<v-layout style="min-height: 100vh" v-if="$auth.isLoggedIn">
			<sidebar/>
			
			<v-main class="pt-0 pt-sm-2 bg-gradient ps-20" id="body-main">
				<a-layout-content >
					<router-view />
				</a-layout-content>
			</v-main>
		</v-layout>
	</div>
</template>


<script>
import '@/assets/css/feather.css';
import '@/assets/css/custom.css';
import '@/assets/css/prime.css';
import { VLayout } from 'vuetify/components/VLayout'
import { VMain } from 'vuetify/components/VMain'

export default {
	inject: ['$auth'],
	components:{
		VLayout,
		VMain,
	},
	name: "App",
};
</script>

<style scoped>
#body-main{
	background-color: papayawhip;
	padding-left: 70px;
	overflow-x: hidden;
}
@media (min-width: 576px) {
	#body-main{
		padding-left: 70px;
	}
}
</style>
