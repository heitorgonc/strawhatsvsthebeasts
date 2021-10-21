<template>
    <div>
        <div v-if="hasResult" class="panel result">
            <div class="draw" v-if="childPlayerHp == 0 && childMonsterHp == 0">The battle has no winner</div>
            <div class="win" v-else-if="childMonsterHp == 0">The Winner is the straw hat pirates</div>
            <div class="lose" v-else>The Winner is the beasts pirates</div>
        </div>
    </div>
</template>

<script>
import barramento from '../barramento'

export default {
    data(){
        return{
            childPlayerHp: this.playerHp,
            childMonsterHp: this.monsterHp,
            childRunning: this.running,
            childLogs: this.logs
        }
    },
    props:{
        monsterHp: Number,
        playerHp: Number,
        running: Boolean,
        logs: Array
    },
    computed: {
        hasResult(){
            return this.childMonsterHp == 0 || this.childPlayerHp == 0 
        },
    },
    watch: {
        hasResult(value) {
            if (value) this.childRunning = false 
            this.childLogs = []
            barramento.$emit('hasResult', this.childRunning, this.childLogs)
        }
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
        barramento.$on('startGame', (running, playerHp, monsterHp, logs, concentration) =>{
            this.childRunning = running
            this.childPlayerHp = playerHp
            this.childMonsterHp = monsterHp
            this.childLogs = logs
            this.concentration = concentration
        }),
        barramento.$on('surrender', (running, logs) => {
            this.childRunning = running
            this.childLogs = logs
        })
    }
}
</script>

<style>
</style>