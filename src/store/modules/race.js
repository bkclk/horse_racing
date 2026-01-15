import { generateHorses, generateRaceSchedule, calculateRaceResult } from '@/utils/raceLogic'
import { ANIMATION_TIMING } from '@/constants'

const state = {
  horses: [],
  raceSchedule: [],
  currentRound: null,
  raceResults: [],
  isRacing: false,
  raceInProgress: false,
}

const mutations = {
  SET_HORSES(state, horses) {
    state.horses = horses
  },
  SET_RACE_SCHEDULE(state, schedule) {
    state.raceSchedule = schedule
  },
  SET_CURRENT_ROUND(state, round) {
    state.currentRound = round
  },
  ADD_RACE_RESULT(state, result) {
    state.raceResults.push(result)
  },
  CLEAR_RACE_RESULTS(state) {
    state.raceResults = []
  },
  SET_IS_RACING(state, value) {
    state.isRacing = value
  },
  SET_RACE_IN_PROGRESS(state, value) {
    state.raceInProgress = value
  },
}

const actions = {
  generateHorses({ commit }) {
    const horses = generateHorses()
    commit('SET_HORSES', horses)
  },
  generateRaceSchedule({ commit, state }) {
    if (state.horses.length === 0) {
      throw new Error('Horses must be generated first')
    }
    const schedule = generateRaceSchedule(state.horses)
    commit('SET_RACE_SCHEDULE', schedule)
    commit('CLEAR_RACE_RESULTS')
  },
  async startRace({ commit, state, dispatch }) {
    if (state.raceSchedule.length === 0) {
      throw new Error('Race schedule must be generated first')
    }
    commit('SET_IS_RACING', true)
    commit('CLEAR_RACE_RESULTS')

    for (let i = 0; i < state.raceSchedule.length; i++) {
      commit('SET_CURRENT_ROUND', state.raceSchedule[i])
      
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_TIMING.DELAY_BEFORE_ANIMATION))
      
      commit('SET_RACE_IN_PROGRESS', true)

      // Simulate race with animation delay
      await dispatch('runRound', state.raceSchedule[i])

      commit('SET_RACE_IN_PROGRESS', false)
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_TIMING.BETWEEN_ROUNDS))
    }

    commit('SET_IS_RACING', false)
    commit('SET_CURRENT_ROUND', null)
  },
  async runRound({ commit }, round) {
    return new Promise((resolve) => {
      const result = calculateRaceResult(round)
      commit('ADD_RACE_RESULT', result)

      setTimeout(() => {
        resolve()
      }, ANIMATION_TIMING.RACE_DURATION)
    })
  },
}

const getters = {
  horses: (state) => state.horses,
  raceSchedule: (state) => state.raceSchedule,
  currentRound: (state) => state.currentRound,
  raceResults: (state) => state.raceResults,
  isRacing: (state) => state.isRacing,
  raceInProgress: (state) => state.raceInProgress,
  hasSchedule: (state) => state.raceSchedule.length > 0,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
