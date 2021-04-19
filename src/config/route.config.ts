import { RouteRecordRaw } from 'vue-router'
import { BasicLayout, BlackLayout } from '@/layout'
import Home from '@/views/home/index.vue'

// lazy load : () => import(/* webpackChunkName: "about" */ '../views/About.vue')
export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        meta: { title: '首页' },
        component: BasicLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: Home,
                meta: { title: '首页', keepAlive: false, permission: ['home'] }
            },
            {
                path: '/first',
                name: 'first',
                component: BlackLayout,
                redirect: '/first/one',
                meta: { title: 'First', keepAlive: true, permission: ['first'], icon: 'el-icon-location' },
                children: [
                    {
                        path: '/first/one',
                        name: 'FirstOne',
                        component: () => import('../views/first/one.vue'),
                        meta: { title: 'FirstOne', keepAlive: true, permission: ['first'] },
                        children: [
                            {
                                path: '/first/one',
                                name: 'FirstOne',
                                component: () => import('../views/first/one.vue'),
                                meta: { title: 'FirstOne', keepAlive: true, permission: ['first'] }
                            }
                        ]
                    },
                    {
                        path: '/first/two',
                        name: 'FirstTwo',
                        component: () => import('@/views/first/two.vue'),
                        meta: { title: 'FirstTwo', keepAlive: false, permission: ['first'] }
                    }
                ]
            },
            {
                path: '/second',
                name: 'second',
                component: BlackLayout,
                redirect: '/second/one',
                meta: { title: 'Second', keepAlive: true, permission: ['second'] },
                children: [
                    {
                        path: '/second/one',
                        name: 'SecondOne',
                        component: () => import('@/views/second/one.vue'),
                        meta: { title: 'SecondOne', keepAlive: true, permission: ['second'] }
                    },
                    {
                        path: '/second/two',
                        name: 'SecondTwo',
                        component: () => import('@/views/second/two.vue'),
                        meta: { title: 'SecondTwo', keepAlive: true, permission: ['second'] }
                    }
                ]
            }
        ]
    }
]