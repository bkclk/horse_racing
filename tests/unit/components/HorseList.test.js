import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import HorseList from '@/components/feature/HorseList.vue'

describe('HorseList.vue', () => {
  const createMockStore = (horses = []) => {
    return createStore({
      modules: {
        race: {
          namespaced: true,
          getters: {
            horses: () => horses,
          },
        },
      },
    })
  }

  it('renders horse list correctly', () => {
    const horses = [
      { id: 1, name: 'Horse 1', color: '#FF0000', colorName: 'Red', condition: 50 },
      { id: 2, name: 'Horse 2', color: '#00FF00', colorName: 'Green', condition: 75 },
    ]

    const store = createMockStore(horses)
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('Horse List')
    expect(wrapper.text()).toContain('Horse 1')
    expect(wrapper.text()).toContain('Horse 2')
    expect(wrapper.text()).toContain('Red')
    expect(wrapper.text()).toContain('Green')
  })

  it('displays horse condition scores', () => {
    const horses = [
      { id: 1, name: 'Horse 1', color: '#FF0000', colorName: 'Red', condition: 50 },
    ]

    const store = createMockStore(horses)
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('50')
  })

  it('displays color names in parentheses', () => {
    const horses = [
      { id: 1, name: 'Thunder', color: '#FF6B6B', colorName: 'Crimson', condition: 75 },
    ]

    const store = createMockStore(horses)
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.text()).toContain('(Crimson)')
  })

  it('applies horse colors correctly', () => {
    const horses = [
      { id: 1, name: 'Horse 1', color: '#FF0000', condition: 50 },
    ]

    const store = createMockStore(horses)
    const wrapper = mount(HorseList, {
      global: {
        plugins: [store],
      },
    })

    const colorElement = wrapper.find('.horse-color')
    expect(colorElement.attributes('style')).toContain('rgb(255, 0, 0)')
  })
})

 
