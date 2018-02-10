/**
 * Created by cuss on 2018/2/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'

import App, { Types as AppTypes } from './App';
import Game, { Types as GameTypes } from './Game';
import Result, { Types as ResultTypes } from './Result';
//调用vuex
Vue.use(Vuex);

export const Types = {
    ...GameTypes,
    ...ResultTypes,
    ...AppTypes,
};
export default new Vuex.Store({
    modules: {
        App: App,
        Game: Game,
        Result: Result
    },
    strict: true
})
