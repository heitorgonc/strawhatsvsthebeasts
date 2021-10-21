<template >
    <div>
        <div class="panel buttons">
            <div class="buttons_area">
                <transition name="flip" mode="out-in">
                    <ActionButtons :playerHp="childPlayerHp"
                        :monsterHp="childMonsterHp"
                        :logs="childLogs"
                        :running="childRunning"
                        :concentration="concentration"
                        v-if="childRunning">
                    </ActionButtons>
                    <div v-else>
                        <b-button variant="primary" size="lg" @click="startGame" fluid>Start</b-button>
                        <b-button variant="secondary" size="lg" @click="goHome" fluid>Home</b-button>
                    </div>
                    
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import barramento from '@/barramento'
import ActionButtons from './ActionButtons.vue'

export default {
    data(){
        return{
            concentration: false,
            childLogs: this.logs,
            childPlayerHp: this.playerHp,
            childMonsterHp: this.monsterHp,
            childRunning: this.running
        }
    },
    props:{
        playerHp: Number,
        monsterHp: Number,
        logs: Array,
        running: Boolean
    },
    components:{
        ActionButtons
    },
    methods:{
        startGame(){
            this.childRunning = true
            this.childPlayerHp = 100
            this.childMonsterHp = 100
            this.concentration = false
            this.childLogs = []
            barramento.$emit('startGame', this.childRunning, this.childPlayerHp, this.childMonsterHp, this.childLogs, this.concentration)
        },
        goHome(){
            this.$router.push('/')
        }
    },
    created(){
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