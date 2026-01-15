import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import raceModule from '@/store/modules/race'
import { generateHorses, generateRaceSchedule } from '@/utils/raceLogic'

describe('Race Store Integration Tests', () => {
  let store

  beforeEach(() => {
    store = createStore({
      modules: {
        race: raceModule,
      },
    })
    // Reset state to initial values
    store.commit('race/SET_HORSES', [])
    store.commit('race/SET_RACE_SCHEDULE', [])
    store.commit('race/SET_CURRENT_ROUND', null)
    store.commit('race/CLEAR_RACE_RESULTS')
    store.commit('race/SET_IS_RACING', false)
    store.commit('race/SET_RACE_IN_PROGRESS', false)
  })

  describe('Horse Generation Flow', () => {
    it('should generate horses and store them in state', async () => {
      await store.dispatch('race/generateHorses')
      const horses = store.getters['race/horses']

      expect(horses).toHaveLength(20)
      expect(horses[0]).toHaveProperty('id')
      expect(horses[0]).toHaveProperty('name')
      expect(horses[0]).toHaveProperty('color')
      expect(horses[0]).toHaveProperty('colorName')
      expect(horses[0]).toHaveProperty('condition')
    })

    it('should have colorName property for all horses', async () => {
      await store.dispatch('race/generateHorses')
      const horses = store.getters['race/horses']

      horses.forEach((horse) => {
        expect(horse.colorName).toBeDefined()
        expect(horse.colorName).not.toBeNull()
        expect(typeof horse.colorName).toBe('string')
      })
    })
  })

  describe('Race Schedule Generation Flow', () => {
    it('should throw error if horses not generated', async () => {
      try {
        await store.dispatch('race/generateRaceSchedule')
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error.message).toBe('Horses must be generated first')
      }
    })

    it('should generate schedule after horses are created', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      const schedule = store.getters['race/raceSchedule']

      expect(schedule).toHaveLength(6)
      expect(schedule[0]).toHaveProperty('round')
      expect(schedule[0]).toHaveProperty('distance')
      expect(schedule[0]).toHaveProperty('horses')
    })

    it('should clear previous results when generating new schedule', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      const raceResults = store.getters['race/raceResults']
      expect(raceResults).toHaveLength(0)
    })
  })

  describe('Race Execution Flow', () => {
    it('should not allow race to start without schedule', async () => {
      try {
        await store.dispatch('race/startRace')
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error.message).toBe('Race schedule must be generated first')
      }
    })

    it('should execute complete race flow', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      const isRacingBefore = store.getters['race/isRacing']
      expect(isRacingBefore).toBe(false)

      const racePromise = store.dispatch('race/startRace')
      await new Promise((resolve) => setTimeout(resolve, 100))

      const isRacingDuring = store.getters['race/isRacing']
      expect(isRacingDuring).toBe(true)

      await racePromise

      const isRacingAfter = store.getters['race/isRacing']
      expect(isRacingAfter).toBe(false)
    }, { timeout: 25000 })

    it('should generate results for each round', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')
      await store.dispatch('race/startRace')

      const results = store.getters['race/raceResults']

      expect(results).toHaveLength(6)
      results.forEach((result, index) => {
        expect(result.round).toBe(index + 1)
        expect(result.results).toHaveLength(10)
        expect(result.winner).toBeDefined()
        expect(result.distance).toBeDefined()
      })
    }, { timeout: 25000 })

    it('should have correct winner format', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')
      await store.dispatch('race/startRace')

      const results = store.getters['race/raceResults']
      const firstRoundWinner = results[0].winner

      expect(firstRoundWinner).toHaveProperty('id')
      expect(firstRoundWinner).toHaveProperty('name')
      expect(firstRoundWinner).toHaveProperty('color')
      expect(firstRoundWinner).toHaveProperty('condition')
    }, { timeout: 25000 })
  })

  describe('State Mutations', () => {
    it('should track race in progress correctly', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      const racePromise = store.dispatch('race/startRace')

      await new Promise((resolve) => setTimeout(resolve, 100))
      const isRacingDuring = store.getters['race/raceInProgress']
      expect(isRacingDuring).toBe(true)

      await racePromise

      const isRacingAfter = store.getters['race/raceInProgress']
      expect(isRacingAfter).toBe(false)
    }, { timeout: 25000 })

    it('should update current round correctly', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      const racePromise = store.dispatch('race/startRace')

      await new Promise((resolve) => setTimeout(resolve, 100))
      const currentRound = store.getters['race/currentRound']
      expect(currentRound).toBeDefined()
      expect(currentRound.round).toBe(1)

      await racePromise

      const finalRound = store.getters['race/currentRound']
      expect(finalRound).toBeNull()
    }, { timeout: 25000 })
  })

  describe('Getters', () => {
    it('should provide hasSchedule getter', async () => {
      let hasSchedule = store.getters['race/hasSchedule']
      expect(hasSchedule).toBe(false)

      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      hasSchedule = store.getters['race/hasSchedule']
      expect(hasSchedule).toBe(true)
    })

    it('should return all getters correctly', async () => {
      await store.dispatch('race/generateHorses')
      await store.dispatch('race/generateRaceSchedule')

      expect(store.getters['race/horses']).toHaveLength(20)
      expect(store.getters['race/raceSchedule']).toHaveLength(6)
      expect(store.getters['race/raceResults']).toHaveLength(0)
      expect(store.getters['race/isRacing']).toBe(false)
      expect(store.getters['race/raceInProgress']).toBe(false)
      expect(store.getters['race/hasSchedule']).toBe(true)
    })
  })
})
