import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HelloWorld from './hello-world.vue'

describe('helloWorld.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        name: 'asfd',
      },
    })
    expect(wrapper.text()).toContain('asfd')
  })
})
