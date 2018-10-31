import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '@/components/list/list.vue'
import ItemInfo from '@/components/item-info/item-info.vue'
import ItemCreate from '@/components/item-create/item-create.vue'

Vue.use(VueRouter);


const routes = [
    {
        path: '',
        redirect: '/list',

    },
    {
        path: '/list',
        component: List,
        name: 'list'
    },
    {
        path: '/list/:key',
        component: ItemInfo,
        name: 'item-info'
    },
    {
        path:'/create',
        component: ItemCreate,
        name: 'item-create'
    }
];


const router = new VueRouter({
    routes // сокращённая запись для `routes: routes`
});

export default router;