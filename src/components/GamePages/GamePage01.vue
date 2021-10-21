<template lang="">
    <div id="panels">
        <Interface01 :playerHp="playerHp"
            :monsterHp="monsterHp">
        </Interface01>
        <PanelResult :playerHp="playerHp"
            :monsterHp="monsterHp"
            :running="running"
            :logs="logs">
        </PanelResult>
        <PanelButtons :playerHp="playerHp"
            :monsterHp="monsterHp"
            :logs="logs"
            :running="running">
        </PanelButtons>
        <PanelLogs :logs="logs"></PanelLogs>
    </div>
</template>

<script>
import barramento from '@/barramento'
import Interface01 from '../Interfaces/luffyvskaido/Interface01.vue'
import PanelResult from '../PanelResult.vue'
import PanelButtons from '../Buttons/PanelButtons.vue'
import PanelLogs from '../PanelLogs.vue'

export default {
    components:{
        Interface01,
        PanelResult,
        PanelButtons,
        PanelLogs,
    },
    data(){
        return{
            logs: [],
            playerHp: 100,
            monsterHp: 100,
            running: false
        }
    },
    created(){
        barramento.$on('startGame', (running, playerHp, monsterHp, logs, concentration) => {
            this.running = running
            this.playerHp = playerHp
            this.monsterHp = monsterHp
            this.logs = logs
            this.concentration = concentration
        }),
        barramento.$on('hasResult', running => {
            this.running = running
        }),
        barramento.$on('surrender', (running, logs) => {
            this.running = running
            this.logs = logs
        })
    },
    beforeRouteLeave(to, from, next) {
        if(this.running) {
            if(confirm('do you want to abandon the battle? are you sure?')) {
                next()
            } else {
                next(false)
            }
        } else{
            next()
        }
    }
}
</script>

<style>
</style>