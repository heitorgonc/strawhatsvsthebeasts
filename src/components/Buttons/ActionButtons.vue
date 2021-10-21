<template>
    <div class="action-buttons">
        <b-button fluid variant="danger" size="lg" class="btn" @click="atack(false)">Atack</b-button>
        <transition name="flip" mode="out-in">
            <BtnSpecial :atack="atack"
                v-if="childConcentration">
            </BtnSpecial>
            <b-button fluid variant="warning" size="lg" class="btn" @click="playerConcentration" v-else>Concentration</b-button>
        </transition>
        <b-button fluid variant="success" size="lg" class="btn" @click="healAndHurt">Healing</b-button>    
        <b-button fluid variant="secondary" size="lg" class="btn" @click="surrender('player')">Surrender</b-button>
    </div>
</template>

<script>
import BtnSpecial from './BtnSpecial.vue'
import barramento from '@/barramento'

export default {
    data(){
        return{
            childLogs: this.logs,
            childPlayerHp: this.playerHp,
            childMonsterHp: this.monsterHp,
            childConcentration: this.concentration,
            childRunning: this.running
        }
    },
    props:{
        playerHp: Number,
        monsterHp: Number,
        logs: Array,
        running: Boolean,
        concentration: Boolean
    },
    components:{
        BtnSpecial
    },
    methods:{
        atack(especial){
            this.childConcentration = false
            if(this.childMonsterHp > 0){
                this.hurt('childPlayerHp', 5, 12, false, 'Player', 'monster')
                barramento.$emit('monsterAtack', this.childPlayerHp)
            }
            this.hurt('childMonsterHp', 5, 9, especial, 'Monster', 'player')
            barramento.$emit('playerAtack', this.childMonsterHp)
            this.childLogs = []
        },
        hurt(el, min, max, especial, target, cls){
            const plus = especial ? 4 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            this[el] = Math.max(this[el] - hurt, 0)
            this.registerLog(`The ${target} suffered damage ${hurt} HP`, cls)
        },
        heal(min, max){
            const heal = this.getRandom(min, max)
            this.childPlayerHp = Math.min(this.childPlayerHp + heal, 100)
            this.registerLog(`The Player recovered ${heal} HP.`, 'player')
        },
        healAndHurt(){
            this.hurt('childPlayerHp', 7, 9, false, 'Player', 'monster')
            this.heal(7, 12)
            barramento.$emit('playerHeal', this.childPlayerHp)
            this.childLogs = []
        },
        playerConcentration(){
            this.childConcentration = true
            this.hurt('childPlayerHp', 1, 5, false, 'Player', 'monster')
            this.registerLog(`The Player is concentrating`, 'player')
            barramento.$emit('monsterAtack', this.childPlayerHp)
            this.childLogs = []
        },
        surrender(){
            this.childRunning = false
            this.childLogs = []
            barramento.$emit('surrender', this.childRunning, this.childLogs)
        },
        getRandom(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls){
            this.childLogs.push({text, cls})
            barramento.$emit('changeLog', this.childLogs)
        }
    },
    created(){
        barramento.$on('startGame', (running, playerHp, monsterHp, logs, concentration) => {
            this.childRunning = running
            this.childPlayerHp = playerHp
            this.childMonsterHp = monsterHp
            this.childLogs = logs
            this.concentration = concentration
        })
    }
}
</script>

<style>
</style>