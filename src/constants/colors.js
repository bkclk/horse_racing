export const HORSE_COLORS = [
  { name: 'Crimson', hex: '#FF6B6B' },
  { name: 'Turquoise', hex: '#4ECDC4' },
  { name: 'Sky Blue', hex: '#45B7D1' },
  { name: 'Light Salmon', hex: '#FFA07A' },
  { name: 'Mint Green', hex: '#98D8C8' },
  { name: 'Golden Yellow', hex: '#F7DC6F' },
  { name: 'Medium Purple', hex: '#BB8FCE' },
  { name: 'Light Blue', hex: '#85C1E2' },
  { name: 'Orange', hex: '#F8B739' },
  { name: 'Emerald', hex: '#52BE80' },
  { name: 'Red', hex: '#EC7063' },
  { name: 'Cyan', hex: '#5DADE2' },
  { name: 'Gold', hex: '#F4D03F' },
  { name: 'Spring Green', hex: '#58D68D' },
  { name: 'Burnt Orange', hex: '#EB984E' },
  { name: 'Cornflower Blue', hex: '#AED6F1' },
  { name: 'Light Coral', hex: '#F1948A' },
  { name: 'Steel Blue', hex: '#85C1E9' },
  { name: 'Pale Goldenrod', hex: '#F9E79F' },
  { name: 'Light Green', hex: '#82E0AA' },
]

export function getColorByIndex(index) {
  return HORSE_COLORS[index % HORSE_COLORS.length]
}

