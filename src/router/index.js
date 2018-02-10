import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Game from '@/views/Game'
import Result from '@/views/Result'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/game',
        name: 'Game',
        component: Game
    }, {
        path: '/result',
        name: 'Result',
        component: Result
    }]
})
