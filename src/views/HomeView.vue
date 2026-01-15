<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Horse Racing Game</h1>
    </header>

    <div class="controls-bar">
      <div class="controls">
        <button
          @click="handleGenerateHorses"
          :disabled="isRacing"
          class="btn btn-primary"
        >
          Generate
        </button>
        <button
          @click="handleGenerateSchedule"
          :disabled="horses.length === 0 || isRacing"
          class="btn btn-secondary"
        >
          Generate Race Schedule
        </button>
        <button
          @click="handleStartRace"
          :disabled="!hasSchedule || isRacing"
          class="btn btn-success"
        >
          {{ isRacing ? 'Racing...' : 'Start' }}
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="panel panel-list">
        <div v-if="horses.length > 0" class="horses-section">
          <HorseList />
        </div>
        <div v-else class="empty-message">
          <p>Click "Generate" to create horses</p>
        </div>
      </div>

      <div class="panel panel-race">
        <div v-if="horses.length > 0">
          <RaceTrack v-if="currentRound" />
          <div v-else class="empty-message">
            <p>Generate schedule and start race</p>
          </div>
        </div>
        <div v-else class="empty-message">
          <p>Generate horses first</p>
        </div>
      </div>

      <div class="panel panel-schedule">
        <RaceSchedule />
      </div>

      <div class="panel panel-results">
        <RaceResults />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import HorseList from '@/components/feature/HorseList.vue'
import RaceTrack from '@/components/feature/RaceTrack.vue'
import RaceResults from '@/components/common/RaceResults.vue'
import RaceSchedule from '@/components/common/RaceSchedule.vue'

const store = useStore()

const horses = computed(() => store.getters['race/horses'])
const hasSchedule = computed(() => store.getters['race/hasSchedule'])
const isRacing = computed(() => store.getters['race/isRacing'])
const currentRound = computed(() => store.getters['race/currentRound'])

const handleGenerateHorses = () => {
  store.dispatch('race/generateHorses')
}

const handleGenerateSchedule = () => {
  try {
    store.dispatch('race/generateRaceSchedule')
  } catch (error) {
    alert(error.message)
  }
}

const handleStartRace = async () => {
  try {
    await store.dispatch('race/startRace')
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style scoped>
.app-container {
  max-width: 100%;
  margin: 0 auto;
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  background: #2c3e50;
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  z-index: 100;
}

.app-header h1 {
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin: 0;
}

.controls-bar {
  background: #ecf0f1;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
  overflow-x: auto;
  overflow-y: hidden;
}

.controls-bar .controls {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-width: fit-content;
}

.controls-bar .btn {
  width: auto;
  padding: 0.625rem 1.5rem;
  white-space: nowrap;
}

.main-content {
  display: grid;
  grid-template-columns: 280px 1fr 220px 260px;
  gap: 0;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.panel {
  padding: 1rem;
  border-right: 1px solid #e0e0e0;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  position: relative;
}

.panel-list {
  background: #fafafa;
}

.panel-race {
  background: white;
}

.panel-schedule {
  background: #fafafa;
}

.panel-results {
  background: white;
  border-right: none;
}

.empty-message {
  text-align: center;
  padding: 2rem 1rem;
  color: #95a5a6;
  font-size: 0.85rem;
}

.horses-section h2 {
  font-size: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn {
  padding: 0.625rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  flex-shrink: 0;
  height: 2.375rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #ccc !important;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #7f8c8d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-success {
  background: #27ae60;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #229954;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .panel {
    padding: 0.75rem;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    height: auto;
  }

  .panel:last-child {
    border-bottom: none;
  }

  .panel-schedule {
    display: flex;
  }

  .panel-results {
    display: flex;
  }

  .app-header h1 {
    font-size: 1.25rem;
  }
}

/* ============================================
   TABLET DEVICES (768px - 1023px)
   ============================================ */
@media (max-width: 1023px) {
  .main-content {
    grid-template-columns: 1fr;
    gap: 0;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .panel {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    padding: 0.75rem;
    height: auto;
    overflow: visible;
    flex-shrink: 0;
  }

  .panel-race {
    min-height: 350px;
    max-height: 650px;
    flex-shrink: 0;
  }

  .panel-list {
    min-height: auto;
  }

  .panel-schedule {
    display: flex;
    min-height: auto;
  }

  .panel-results {
    display: flex;
    min-height: auto;
  }

  .panel:last-child {
    border-bottom: none;
  }

  .app-header h1 {
    font-size: 1.5rem;
  }

  .app-header {
    padding: 1.25rem 1.5rem;
  }

  .controls-bar .controls {
    gap: 0.5rem;
  }

  .controls-bar .btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {

  .app-header h1 {
    font-size: 1.25rem;
  }

  .controls-bar {
    padding: 0.75rem 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .controls-bar .controls {
    gap: 0.5rem;
    flex-wrap: nowrap;
    min-width: fit-content;
  }

  .controls-bar .btn {
    padding: 0.5rem 0.875rem;
    font-size: 0.75rem;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .main-content {
    grid-template-columns: 1fr;
    overflow: auto;
  }

  .panel {
    padding: 1rem;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
    max-height: none;
    overflow: auto;
  }

  .panel:last-child {
    border-bottom: none;
  }

  .empty-message {
    padding: 1.5rem 1rem;
    font-size: 0.8rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
}


@media (max-width: 480px) {
  .app-header {
    padding: 0.75rem 1rem;
  }

  .app-header h1 {
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .controls-bar {
    padding: 0.5rem 0.75rem;
  }

  .controls-bar .controls {
    gap: 0.375rem;
  }

  .controls-bar .btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.7rem;
    flex: 1;
    min-width: 0;
  }

  .main-content {
    grid-template-columns: 1fr;
  }

  .panel {
    padding: 0.75rem;
  }

  .empty-message {
    padding: 1rem 0.75rem;
    font-size: 0.75rem;
  }

  .horses-section h2 {
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
  }

  .btn {
    padding: 0.4rem 0.75rem;
    font-size: 0.7rem;
  }
}

/* ============================================
   LANDSCAPE MOBILE (480px - 1023px height)
   ============================================ */
@media (max-height: 600px) and (orientation: landscape) {
  .main-content {
    max-height: calc(100vh - 130px);
  }

  .panel {
    max-height: calc(100vh - 130px);
  }

  .app-header h1 {
    font-size: 1.1rem;
  }

  .app-header {
    padding: 0.5rem 1rem;
  }

  .controls-bar {
    padding: 0.5rem 1rem;
  }
}

@media (min-width: 1921px) {
  .app-container {
    max-width: 1920px;
    margin: 0 auto;
  }

  .app-header h1 {
    font-size: 2rem;
  }
}
</style>
