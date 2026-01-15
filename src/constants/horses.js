
export const HORSE_NAMES = [
  'Thunder',
  'Lightning',
  'Storm',
  'Blaze',
  'Shadow',
  'Phoenix',
  'Ace',
  'Duke',
  'King',
  'Prince',
  'Warrior',
  'Champion',
  'Victory',
  'Legend',
  'Hero',
  'Star',
  'Flash',
  'Rocket',
  'Comet',
  'Arrow',
]


export function generateConditionVariance(baseCondition) {
  // daha gerçekçi olması için yakın pozisyonlar olsun diye yapılmıstır
  const variance = Math.floor(Math.random() * 31) - 15
  return Math.max(1, Math.min(100, baseCondition + variance))
}
