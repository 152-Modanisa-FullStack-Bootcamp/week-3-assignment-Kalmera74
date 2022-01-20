import { mount, createLocalVue } from '@vue/test-utils';
import Counter from '../../src/Counter';
import Vuex from 'vuex';



describe('Counter.vue', () => {
  let localVue;
  let store;
  let wrapper;
  let actions;
  let state;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);

    state = {
      count: 0
    };

    actions = {
      increment: jest.fn(),
      decrement: jest.fn()
    }
    store = new Vuex.Store({
      actions

    });
    wrapper = mount(Counter, { store, localVue });

  });

  it('is exists', () => {
    expect(wrapper.exists()).toBe(true);

  });

  it('increase button exits', () => {
    const buttons = wrapper.findAll('button');
    const button = buttons.filter(button => button.text().match('Increase'));
    expect(button.exists()).toBe(true);

  });

  it('decrease button exists', () => {
    const buttons = wrapper.findAll('button');
    const button = buttons.filter(button => button.text().match('Decrease'));
    expect(button.exists()).toBe(true);
  });

  it('count increases', async () => {
    const buttons = wrapper.findAll('button');
    const button = buttons.filter(button => button.text().match('Increase'));
    button.trigger('click');

    expect(actions.increment).toHaveBeenCalled();
  });
})
