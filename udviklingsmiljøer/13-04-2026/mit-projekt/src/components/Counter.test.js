import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Counter from './Counter.vue'

describe('Counter', () => {

  it('shows 0 when it starts', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('0')
  })

  it('Bliver den 1 når man bruger add', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('.add').trigger('click');

    expect(wrapper.find('p').text()).toContain('1');
  });

  it('Forbliver den 0 når man trykker på subtract når den er på 0', async () => {
    const wrapper = mount(Counter)

    await wrapper.find('.subtract').trigger('click');

    expect(wrapper.find('p').text()).toContain('0');
  });

  it('Bliver den 2 når man bruger add 2 gange', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('.add').trigger('click');
    await wrapper.find('.add').trigger('click');

    expect(wrapper.find('p').text()).toContain('2');
  });

  it('Bliver den 0 når man bruger add og subtract', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('.add').trigger('click');
    await wrapper.find('.subtract').trigger('click');

    expect(wrapper.find('p').text()).toContain('0');
  });
})