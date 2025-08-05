import { Icon } from '@iconify/vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RouterLink } from 'vue-router'
import AppHeader from '../app-header.vue'

describe('appHeader', () => {
  it('renders icon', () => {
    const wrapper = mount(AppHeader, {
      props: {
        icon: 'tabler:tractor',
      },
      slots: {
        title: '<h1>Tractor Inspector</h1>',
      },
    })
    expect(wrapper.findComponent(Icon).props().icon).toBe('tabler:tractor')
  })

  it('renders title slot', () => {
    const wrapper = mount(AppHeader, {
      props: {
        icon: 'tabler:tractor',
      },
      slots: {
        title: '<h1>Tractor Inspector</h1>',
      },
    })
    expect(wrapper.find('h1').text()).toBe('Tractor Inspector')
  })

  it('does not render back button without backTo prop', () => {
    const wrapper = mount(AppHeader, {
      props: {
        icon: 'tabler:tractor',
      },
    })

    expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
  })

  it('renders back button with link', () => {
    const wrapper = mount(AppHeader, {
      props: {
        icon: 'tabler:tractor',
        backTo: '/home',
      },
      global: {
        stubs: {
          RouterLink: {
            name: 'RouterLink',
            props: ['to'],
            template: `<a :href="to"><slot /></a>`,
          },
        },
      },
    })

    const backButton = wrapper.findComponent(RouterLink)
    expect(backButton.exists()).toBe(true)
    expect(backButton.props().to).toBe('/home')
  })
})
