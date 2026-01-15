<template>
  <div class="race-results">
    <h2>Race Results</h2>
    <div v-if="raceResults.length === 0" class="no-results">
      No results yet. Start the race to see results.
    </div>
    <div v-else class="results-container">
      <div
        v-for="result in raceResults"
        :key="result.round"
        class="result-card"
      >
        <div class="result-header">
          <h3>Round {{ result.round }}</h3>
          <span class="distance">{{ result.distance }}m</span>
        </div>
        <div class="winner">
          <span class="winner-label">Winner:</span>
          <span
            class="winner-name"
            :style="{ color: result.winner.color }"
          >
            {{ result.winner.name }}
          </span>
        </div>
        <div class="results-table">
          <div class="table-header">
            <div>Position</div>
            <div>Horse</div>
          </div>
          <div
            v-for="(horseResult, index) in result.results"
            :key="horseResult.horse.id"
            class="table-row"
            :class="{ winner: index === 0 }"
          >
            <div class="position">{{ horseResult.position }}</div>
            <div class="horse-name">
              <span
                class="horse-color-dot"
                :style="{ backgroundColor: horseResult.horse.color }"
              ></span>
              {{ horseResult.horse.name }}
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
const raceResults = computed(() => store.getters['race/raceResults'])
</script>

<style scoped>
.race-results {
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.race-results h2 {
  flex-shrink: 0;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  font-size: 0.85rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #ecf0f1;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.results-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  color: #95a5a6;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px dashed #bdc3c7;
}

.result-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.875rem;
  transition: all 0.2s;
}

.result-card:hover {
  border-color: #bdc3c7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.result-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 0.85rem;
  font-weight: 600;
}

.distance {
  color: #7f8c8d;
  font-weight: 500;
  font-size: 0.8rem;
}

.winner {
  margin-bottom: 0.75rem;
  padding: 0.625rem;
  background: #fff9e6;
  border-radius: 4px;
  border-left: 3px solid #f39c12;
}

.winner-label {
  font-weight: 600;
  margin-right: 0.4rem;
  color: #2c3e50;
  font-size: 0.8rem;
}

.winner-name {
  font-weight: 600;
  font-size: 0.85rem;
}

.results-table {
  margin-top: 0.75rem;
}

.table-header {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 1rem;
  padding: 0.5rem 0.4rem;
  background: white;
  border-radius: 4px;
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 0.4rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-row {
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 1rem;
  padding: 0.5rem 0.4rem;
  border-bottom: 1px solid #ecf0f1;
  align-items: center;
  background: white;
  border-radius: 4px;
  margin-bottom: 0.2rem;
  transition: all 0.2s;
}

.table-row:hover {
  background: #f8f9fa;
}

.table-row.winner {
  background: #e8f8f5;
  border: 1px solid #27ae60;
  font-weight: 600;
}

.table-row:last-child {
  margin-bottom: 0;
}

.position {
  text-align: center;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.8rem;
}

.horse-name {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #2c3e50;
}

.horse-color-dot {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: inline-block;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}


/* Mobile Responsive */
@media (max-width: 1024px) {
  .results-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
}

@media (max-width: 768px) {
  .race-results h2 {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.4rem;
  }

  .result-card {
    padding: 0.625rem;
    margin-bottom: 0.5rem;
  }

  .result-header {
    margin-bottom: 0.5rem;
    padding-bottom: 0.35rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .result-header h3 {
    font-size: 0.75rem;
    flex: 1 1 auto;
  }

  .distance {
    font-size: 0.7rem;
    flex: 1 1 100%;
  }

  .winner {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }

  .winner-label,
  .winner-name {
    font-size: 0.7rem;
  }

  .results-table {
    margin-top: 0.5rem;
  }

  .table-header,
  .table-row {
    gap: 0.5rem;
    padding: 0.35rem 0.3rem;
    margin-bottom: 0.15rem;
  }

  .table-header {
    font-size: 0.65rem;
  }

  .position {
    font-size: 0.7rem;
    grid-column: auto;
  }

  .horse-name {
    font-size: 0.7rem;
  }

  .horse-color-dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .results-container {
    grid-template-columns: 1fr;
  }
  .race-results h2 {
    font-size: 0.75rem;
  }

  .result-card {
    padding: 0.5rem;
  }

  .result-header h3 {
    font-size: 0.7rem;
  }

  .distance {
    font-size: 0.65rem;
  }

  .winner-label,
  .winner-name {
    font-size: 0.65rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 40px 1fr;
    gap: 0.35rem;
    padding: 0.25rem 0.25rem;
  }

  .table-header {
    font-size: 0.6rem;
  }

  .position {
    font-size: 0.65rem;
  }

  .horse-name {
    font-size: 0.65rem;
    gap: 0.25rem;
  }

  .horse-color-dot {
    width: 8px;
    height: 8px;
  }
}
</style>
