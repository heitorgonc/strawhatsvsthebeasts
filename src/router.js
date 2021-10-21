import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HomePage = () => import('./components/HomePage')
const GamePage01 = () => import('./components/GamePages/GamePage01')
const GamePage02 = () => import('./components/GamePages/GamePage02')
const GamePage03 = () => import('./components/GamePages/GamePage03')
const GamePage04 = () => import('./components/GamePages/GamePage04')

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if(savedPosition) {
            return savedPosition
        } else if(to.hash) {
            return { selector: to.hash }
        } else{
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/',
            component: HomePage,
        },    
        {
            path:'/luffyvskaido', 
            component: GamePage01,
        },
        {
            path:'/zorovsking',
            component: GamePage02,
        },
        {
            path:'/jinbevsqueen',
            component: GamePage03,
        },
        {
            path:'/sanjivsjack',
            component: GamePage04,
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

export default router