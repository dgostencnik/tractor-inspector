import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { RouterLink } from 'vue-router'
import { defaultTractorImageUrl } from '../../utils/const'
import { formatLastActive } from '../../utils/formatters'
import TractorCard from '../tractor-card.vue'

const mockedTractor = {
  serialNumber: 'A2302895',
  totalWorkingHours: 1245,
  imageUrl: '/images/A2302895.jpg',
  status: 'Active',
  lastActive: 'Mar 14, 2026 6:44:12 AM',
  location: 'Field A-12',
}

describe('tractorCard', () => {
  it('renders tractor image', () => {
    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractor,
      },
    })

    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(mockedTractor.imageUrl)
  })

  it('renders tractor serial number', () => {
    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractor,
      },
    })

    const serialNumber = wrapper.find('h3')
    expect(serialNumber.exists()).toBe(true)
    expect(serialNumber.text()).toBe(mockedTractor.serialNumber)
  })

  it('renders tractor total working hours', () => {
    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractor,
      },
    })

    const totalWorkingHours = wrapper.find('[data-testid="totalWorkingHours"]')
    expect(totalWorkingHours.exists()).toBe(true)
    expect(totalWorkingHours.text()).toBe(String(mockedTractor.totalWorkingHours))
  })

  it('renders tractor last active ', () => {
    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractor,
      },
    })

    const lastActive = wrapper.find('[data-testid="lastActive"]')
    expect(lastActive.exists()).toBe(true)
    expect(lastActive.text()).toBe(formatLastActive(String(mockedTractor.lastActive)))
  })

  it('renders progress bar', () => {
    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractor,
      },
    })

    const progressBar = wrapper.find('progress')
    expect(progressBar.exists()).toBe(true)
  })

  it('renders default image when tractor image is not provided', () => {
    const mockedTractorWithoutImageUrl = {
      serialNumber: 'A2302895',
      totalWorkingHours: 1245,
      status: 'Active',
      lastActive: 'Mar 14, 2026 6:44:12 AM',
      location: 'Field A-12',
    }

    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractorWithoutImageUrl,
      },
    })

    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe(defaultTractorImageUrl) // assuming this is the default image URL
  })

  it('renders view details link', () => {
    const wrapper = mount(TractorCard, {
      props: {
        tractor: mockedTractor,
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
    expect(backButton.props().to).toBe(`/tractors/${mockedTractor.serialNumber}`)
  })
})
