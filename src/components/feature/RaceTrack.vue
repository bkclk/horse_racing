<template>
  <div class="race-track">
    <h2 v-if="currentRound">
      Round {{ currentRound.round }} - {{ currentRound.distance }}m
    </h2>
    <div class="track-container" :class="{ 'racing': raceInProgress }">
      <div
        v-for="(horse, index) in currentRound?.horses || []"
        :key="horse.id"
        class="track-lane"
      >
        <div class="lane-number">{{ index + 1 }}</div>
        <div class="lane-track" :style="{ background: `linear-gradient(to right, ${horse.color}20 0%, ${horse.color}40 100%)` }">
          <Horse
            :horse="horse"
            :position="getHorsePosition(horse.id)"
            :is-racing="raceInProgress"
          />
          <div class="finish-line"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import { ANIMATION_TIMING, RACE_CONFIG } from '@/constants'
import Horse from './Horse.vue'

const store = useStore()
const currentRound = computed(() => store.getters['race/currentRound'])
const raceInProgress = computed(() => store.getters['race/raceInProgress'])
const raceResults = computed(() => store.getters['race/raceResults'])

const animationProgress = ref(0)
let animationFrame = null
let startTime = null
const RACE_DURATION = ANIMATION_TIMING.RACE_DURATION

const startAnimation = () => {
  startTime = Date.now()
  
  const animate = () => {
    if (!startTime) return
    
    const elapsed = Date.now() - startTime
    animationProgress.value = Math.min(elapsed / RACE_DURATION, 1)
    
    if (animationProgress.value < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }
  
  animationFrame = requestAnimationFrame(animate)
}

const stopAnimation = () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
  startTime = null
  animationProgress.value = 0
}

const getHorsePosition = (horseId) => {
  if (!currentRound.value) {
    return 0
  }

  const horse = currentRound.value.horses.find((h) => h.id === horseId)
  if (!horse) {
    return 0
  }

  const allConditions = currentRound.value.horses.map((h) => h.condition)
  const maxCondition = Math.max(...allConditions)
  const minCondition = Math.min(...allConditions)
  const conditionRange = maxCondition - minCondition || 1

  const results = raceResults.value.find(r => r.round === currentRound.value.round)?.results || []
  const horseResult = results.find(r => r.horse.id === horseId)
  
  let finishTimeFactor = 1.0
  if (results.length > 0 && horseResult) {
    const minTime = results[0].time
    const maxTime = results[results.length - 1].time
    const timeRange = maxTime - minTime || 1
    
    finishTimeFactor = 0.6 + ((horseResult.time - minTime) / timeRange) * 0.4
  } else {
    const speedScale = (horse.condition - minCondition) / conditionRange
    finishTimeFactor = 1.0 - (speedScale * 0.4)
  }

  const horseProgress = Math.min(animationProgress.value / finishTimeFactor, 1)

  const easeProgress = horseProgress < 0.5
    ? 2 * horseProgress * horseProgress
    : 1 - Math.pow(-2 * horseProgress + 2, 2) / 2

  return easeProgress * RACE_CONFIG.FINAL_POSITION_MAX
}

watch(
  () => currentRound.value?.round,
  () => {
    stopAnimation()
  }
)

watch(
  () => raceInProgress.value,
  (isRacing) => {
    if (isRacing) {
      startAnimation()
    } else {
      stopAnimation()
    }
  }
)
</script>

<style scoped>
.race-track {
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;
}

.race-track h2 {
  margin-bottom: 1.25rem;
  color: #2c3e50;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #ecf0f1;
  word-break: break-word;
}

.track-container {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.track-container.racing {
  display: flex;
  flex-direction: column;
  overflow: visible;
}

.track-lane {
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
  position: relative;
  gap: 0.5rem;
  min-height: 56px;
}

.track-lane:last-child {
  margin-bottom: 0;
}

.lane-number {
  width: 28px;
  min-width: 28px;
  text-align: center;
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.85rem;
  flex-shrink: 0;
}

.lane-track {
  flex: 1;
  position: relative;
  height: 56px;
  background: linear-gradient(to right, #ecf0f1 0%, #d5dbdb 100%);
  border-radius: 4px;
  border: 1px solid #bdc3c7;
  overflow: hidden;
  min-width: 0;
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: repeating-linear-gradient(
    to bottom,
    #fff 0px,
    #fff 8px,
    #2c3e50 8px,
    #2c3e50 16px
  );
  z-index: 10;
}



/* Tablet Stack (1024px and below) */
@media (max-width: 1024px) {
  .race-track {
    height: auto;
  }

  .race-track h2 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }

  .track-container {
    overflow: visible;
    max-height: none;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .track-lane {
    flex-direction: row;
    gap: 0.3rem;
    margin-bottom: 0;
    min-height: 48px;
    height: 48px;
  }

  .lane-number {
    width: 25px;
    min-width: 25px;
    text-align: center;
    font-size: 0.7rem;
    padding: 0;
  }

  .lane-track {
    height: 48px;
    flex: 1;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .race-track h2 {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
  }

  .track-container {
    padding: 0.5rem;
  }

  .track-lane {
    margin-bottom: 0.35rem;
    min-height: 44px;
    height: 44px;
    gap: 0.35rem;
  }

  .lane-number {
    font-size: 0.75rem;
    width: 22px;
  }

  .lane-track {
    height: 44px;
  }

  .finish-line {
    width: 2px;
  }
}

@media (max-width: 480px) {
  .race-track h2 {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.35rem;
  }

  .track-container {
    padding: 0.35rem;
  }

  .track-lane {
    margin-bottom: 0.25rem;
    min-height: 40px;
    gap: 0.25rem;
  }

  .lane-number {
    font-size: 0.7rem;
    width: 20px;
  }

  .lane-track {
    height: 40px;
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .track-lane {
    min-height: 40px;
    margin-bottom: 0.25rem;
  }

  .lane-track {
    height: 40px;
  }

  .race-track h2 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
}
</style>
