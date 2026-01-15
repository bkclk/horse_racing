<template>
  <div class="race-schedule">
    <h2>Race Schedule</h2>
    <div class="schedule-content">
      <div v-if="raceSchedule.length === 0" class="no-schedule">
        No schedule generated yet. Click "Generate Race Schedule" to create one.
      </div>
      <div v-else class="schedule-container">
      <div
        v-for="round in raceSchedule"
        :key="round.round"
        class="schedule-card"
      >
        <div class="schedule-header">
          <h3>Round {{ round.round }}</h3>
          <span class="distance">{{ round.distance }}m</span>
        </div>
        <div class="horses-list">
          <div
            v-for="horse in round.horses"
            :key="horse.id"
            class="schedule-horse"
          >
            <span
              class="horse-color-dot"
              :style="{ backgroundColor: horse.color }"
            ></span>
            <span class="horse-name">{{ horse.name }}</span>
            <span class="horse-condition">({{ horse.condition }})</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const raceSchedule = computed(() => store.getters['race/raceSchedule'])
</script>

<style scoped>
.race-schedule {
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  min-height: 0;
}

.race-schedule h2 {
  flex-shrink: 0;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
  position: sticky;
  top: 0;
  background: #fafafa;
  z-index: 10;
  padding-top: 0;
}

.schedule-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.schedule-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.no-schedule {
  text-align: center;
  padding: 2rem 1rem;
  color: #95a5a6;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px dashed #bdc3c7;
  font-size: 0.85rem;
}

.schedule-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.625rem;
}

.schedule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #e0e0e0;
}

.schedule-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 0.8rem;
  font-weight: 600;
}

.distance {
  color: #7f8c8d;
  font-weight: 500;
  font-size: 0.75rem;
}

.horses-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.schedule-horse {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #2c3e50;
}

.horse-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.horse-name {
  font-weight: 500;
  font-size: 0.75rem;
}

.horse-condition {
  color: #7f8c8d;
  font-size: 0.7rem;
}

/* Mobile Responsive */
@media (max-width: 1024px) {
  .schedule-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .race-schedule h2 {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.4rem;
  }

  .schedule-content {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .schedule-container {
    gap: 0.5rem;
  }

  .schedule-card {
    padding: 0.5rem;
  }

  .schedule-header {
    margin-bottom: 0.35rem;
    padding-bottom: 0.3rem;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .schedule-header h3 {
    font-size: 0.7rem;
    flex: 1 1 auto;
  }

  .distance {
    font-size: 0.65rem;
    flex: 1 1 100%;
  }

  .horses-list {
    gap: 0.3rem;
  }

  .schedule-horse {
    gap: 0.25rem;
    font-size: 0.65rem;
  }

  .horse-name {
    font-size: 0.65rem;
  }

  .horse-condition {
    font-size: 0.6rem;
  }

  .horse-color-dot {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 480px) {
  .schedule-container {
    grid-template-columns: 1fr;
  }
  .race-schedule h2 {
    font-size: 0.7rem;
  }

  .schedule-card {
    padding: 0.35rem;
  }

  .schedule-header h3 {
    font-size: 0.65rem;
  }

  .distance {
    font-size: 0.6rem;
  }

  .schedule-horse {
    gap: 0.2rem;
    font-size: 0.6rem;
  }

  .horse-name {
    font-size: 0.6rem;
  }

  .horse-condition {
    font-size: 0.55rem;
  }

  .horse-color-dot {
    width: 7px;
    height: 7px;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .schedule-content {
    max-height: calc(100vh - 130px);
    overflow-y: auto;
  }

  .race-schedule h2 {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .schedule-card {
    padding: 0.4rem;
  }
}
</style>
