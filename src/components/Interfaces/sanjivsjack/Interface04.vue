<template>
    <div class="panel">
        <b-card-body >
            <div class="score">
                <transition name="flip" mode="out-in">
                    <b-card-img class="playerImg" :src='require("../../../assets/img/Sanji.png")' fluid v-if="childPlayerHp >= 30"></b-card-img>
                    <SanjiRaged v-if="childPlayerHp < 30 && childPlayerHp > 0"></SanjiRaged>
                    <b-card-img class="playerImg lose" v-if="childPlayerHp == 0" :src='require("../../../assets/img/tobecontinued.png")' fluid></b-card-img>
                </transition>
                <div class="playerName" v-if="childPlayerHp > 0" >Sanji</div>
            </div>
            <b-progress :max="100" height="2rem" v-if="childPlayerHp > 0">
                <b-progress-bar :value="childPlayerHp" :label-html="`${childPlayerHp}%`" variant="success" v-if="childPlayerHp >75"></b-progress-bar>
                <b-progress-bar :value="childPlayerHp" :label-html="`${childPlayerHp}%`" variant="warning" v-else-if="childPlayerHp > 30"></b-progress-bar>
                <b-progress-bar :value="childPlayerHp" :label-html="`${childPlayerHp}%`" variant="danger" v-else-if="childPlayerHp > 0"></b-progress-bar>
            </b-progress>
        </b-card-body>
        <b-card-body >
            <div class="score">
                <transition name="flip" mode="out-in">
                    <b-card-img class="monsterImg" v-if="childMonsterHp >= 30" :src='require("../../../assets/img/Jack.png")' fluid></b-card-img>
                    <JackRaged v-else-if="childMonsterHp < 30 && childMonsterHp > 0"></JackRaged>
                    <b-card-img class="monsterImg lose" v-if="childMonsterHp == 0" :src='require("../../../assets/img/tobecontinued.png")' fluid></b-card-img>
                </transition>
                <div class="monsterName" v-if="childMonsterHp > 0">Jack</div>
            </div>
            <b-progress :max="100" height="2rem" v-if="childMonsterHp > 0">
                <b-progress-bar :value="childMonsterHp" :label-html="`${childMonsterHp}%`" variant="success" v-if="childMonsterHp >75"></b-progress-bar>
                <b-progress-bar :value="childMonsterHp" :label-html="`${childMonsterHp}%`" variant="warning" v-else-if="childMonsterHp > 30"></b-progress-bar>
                <b-progress-bar :value="childMonsterHp" :label-html="`${childMonsterHp}%`" variant="danger" v-else-if="childMonsterHp > 0"></b-progress-bar>
            </b-progress>
        </b-card-body>
    </div>
</template>

<script>
import SanjiRaged from './SanjiRaged.vue'
import JackRaged from './JackRaged.vue'
import barramento from '@/barramento'

export default {
    data(){
        return{
            childPlayerHp: this.playerHp,
            childMonsterHp: this.monsterHp
        }
    },
    props:{
        playerHp: Number,
        monsterHp: Number
    },
    components:{
        SanjiRaged,
        JackRaged,
    },
    created(){
        barramento.$on('playerAtack', monsterHp => {
            this.childMonsterHp = monsterHp
        }),
        barramento.$on('monsterAtack', playerHp => {
            this.childPlayerHp = playerHp
        }),
        barramento.$on('playerHeal', playerHp => {
            this.childPlayerHp = playerHp
        }),
        barramento.$on('startGame', (running, playerHp, monsterHp, logs,  concentration) =>{
            this.running = running
            this.childPlayerHp = playerHp
            this.childMonsterHp = monsterHp
            this.logs = logs
            this.concentration = concentration
        })
    }
}
</script>

<style>
</style>