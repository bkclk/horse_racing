import { describe, it, expect, beforeEach } from 'vitest'
import {
  generateHorses,
  generateRaceSchedule,
  calculateRaceResult,
} from '@/utils/raceLogic'

describe('raceLogic', () => {
  let horses

  beforeEach(() => {
    horses = generateHorses()
  })

  describe('generateHorses', () => {
    it('should generate exactly 20 horses', () => {
      expect(horses).toHaveLength(20)
    })

    it('should generate horses with unique ids', () => {
      const ids = horses.map((h) => h.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(20)
    })

    it('should generate horses with condition scores between 1 and 100', () => {
      horses.forEach((horse) => {
        expect(horse.condition).toBeGreaterThanOrEqual(1)
        expect(horse.condition).toBeLessThanOrEqual(100)
      })
    })

    it('should generate horses with unique colors', () => {
      const colors = horses.map((h) => h.color)
      const uniqueColors = new Set(colors)
      expect(uniqueColors.size).toBe(20)
    })
  })

  describe('generateRaceSchedule', () => {
    it('should generate 6 rounds', () => {
      const schedule = generateRaceSchedule(horses)
      expect(schedule).toHaveLength(6)
    })

    it('should have correct distances for each round', () => {
      const schedule = generateRaceSchedule(horses)
      const expectedDistances = [1200, 1400, 1600, 1800, 2000, 2200]

      schedule.forEach((round, index) => {
        expect(round.distance).toBe(expectedDistances[index])
        expect(round.round).toBe(index + 1)
      })
    })

    it('should select 10 horses for each round', () => {
      const schedule = generateRaceSchedule(horses)
      schedule.forEach((round) => {
        expect(round.horses).toHaveLength(10)
      })
    })

    it('should select unique horses within each round', () => {
      const schedule = generateRaceSchedule(horses)
      schedule.forEach((round) => {
        const horseIds = round.horses.map((h) => h.id)
        const uniqueIds = new Set(horseIds)
        expect(uniqueIds.size).toBe(10)
      })
    })
  })

  describe('calculateRaceResult', () => {
    it('should calculate results for all horses in a round', () => {
      const schedule = generateRaceSchedule(horses)
      const round = schedule[0]
      const result = calculateRaceResult(round)

      expect(result.results).toHaveLength(round.horses.length)
    })

    it('should assign positions correctly (1 to 10)', () => {
      const schedule = generateRaceSchedule(horses)
      const round = schedule[0]
      const result = calculateRaceResult(round)

      const positions = result.results.map((r) => r.position)
      expect(Math.min(...positions)).toBe(1)
      expect(Math.max(...positions)).toBe(10)
    })

    it('should have results sorted by time (ascending)', () => {
      const schedule = generateRaceSchedule(horses)
      const round = schedule[0]
      const result = calculateRaceResult(round)

      for (let i = 1; i < result.results.length; i++) {
        expect(result.results[i].time).toBeGreaterThanOrEqual(
          result.results[i - 1].time
        )
      }
    })

    it('should identify the winner correctly', () => {
      const schedule = generateRaceSchedule(horses)
      const round = schedule[0]
      const result = calculateRaceResult(round)

      expect(result.winner).toBe(result.results[0].horse)
    })

    it('should include round number and distance in result', () => {
      const schedule = generateRaceSchedule(horses)
      const round = schedule[0]
      const result = calculateRaceResult(round)

      expect(result.round).toBe(round.round)
      expect(result.distance).toBe(round.distance)
    })
  })
})
