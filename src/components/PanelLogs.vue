<template>
    <div>
            <div class="panel logs" v-if="childLogs.length">
                <ul>
                    <transition-group name="flipgroup" tag="div" mode="out-in">
                        <li class="log" v-for="childLog in childLogs" :key="childLog.text"
                        :class="childLog.cls">
                            {{childLog.text}}
                        </li>
                    </transition-group>
                </ul>
            </div>
    </div>
</template>
<script>
import barramento from '@/barramento'

export default {
    data(){
        return{
            childLogs: this.logs
        }
    },
    props:{
        logs: Array
    },
    created(){
        barramento.$on('changeLog', logs => {
            this.childLogs = logs
        }),
        barramento.$on('startGame', (running, playerHp, monsterHp, logs, concentration) => {
            this.running = running
            this.playerHp = playerHp
            this.monsterHp = monsterHp
            this.childLogs = logs
            this.concentration = concentration
        }),
        barramento.$on('hasResult', (running, logs) => {
            this.childRunning = running
            this.childLogs = logs
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