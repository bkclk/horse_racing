import {
  HORSE_NAMES,
  RACE_CONFIG,
  getColorByIndex,
  generateConditionVariance,
} from '@/constants'

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomIndices(count, max) {
  const indices = []
  while (indices.length < count) {
    const index = randomInt(0, max - 1)
    if (!indices.includes(index)) {
      indices.push(index)
    }
  }
  return indices
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function generateHorses() {
  const horses = []
  const shuffledNames = shuffleArray(HORSE_NAMES).slice(0, RACE_CONFIG.TOTAL_HORSES)
  
  for (let i = 0; i < RACE_CONFIG.TOTAL_HORSES; i++) {
    const colorObj = getColorByIndex(i)
    const name = shuffledNames[i]
    // Base condition 1-100 arasında rastgele atanıyor
    const baseCondition = Math.floor(Math.random() * 100) + 1
    
    horses.push({
      id: i + 1,
      name: name,
      color: colorObj.hex,
      colorName: colorObj.name,
      condition: generateConditionVariance(baseCondition),
    })
  }
  return horses
}

export function generateRaceSchedule(horses) {
  const schedule = []

  RACE_CONFIG.ROUND_DISTANCES.forEach((distance, index) => {
    const roundNumber = index + 1
    const selectedHorseIndices = getRandomIndices(RACE_CONFIG.HORSES_PER_ROUND, horses.length)
    const selectedHorses = selectedHorseIndices.map((idx) => horses[idx])

    schedule.push({
      round: roundNumber,
      distance,
      horses: selectedHorses,
    })
  })

  return schedule
}

export function calculateRaceResult(round) {
  const { round: roundNumber, distance, horses } = round
  const speedFactor = 0.1

  const results = horses.map((horse) => {
    // Kondisyonun etkisini artırmak için aralığı genişletelim (örn: 30-100 arası)
    // Bu sayede en yavaş ve en hızlı arasındaki fark daha belirgin olur
    const effectiveCondition = 30 + (horse.condition * 0.7)
    const baseTime = distance / (effectiveCondition * speedFactor)
    const randomFactor = 0.9 + Math.random() * 0.2
    const time = baseTime * randomFactor

    return {
      horse,
      time: parseFloat(time.toFixed(2)),
      position: 0,
    }
  })

  results.sort((a, b) => a.time - b.time)
  results.forEach((result, index) => {
    result.position = index + 1
  })

  return {
    round: roundNumber,
    distance,
    results,
    winner: results[0].horse,
  }
}
