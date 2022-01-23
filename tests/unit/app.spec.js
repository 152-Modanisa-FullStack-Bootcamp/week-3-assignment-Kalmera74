import App from '../../src/App.vue';
import { mount, createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';
import store from '../../src/store';



describe('App.vue', () => {
  let wrapper;
  let state


  beforeEach(() => {

    const localVue = createLocalVue();
    localVue.use(Vuex);

    state = {
      count: 0
    };


    const getters = {
      getCount: state => state.count
    };

    const stor = new Vuex.Store({
      getters,
      state
    });



    wrapper = mount(App, { localVue, store });
  });

  afterEach(() => {
    wrapper.vm.$store.state.count = 0;
  });

  it('h1 exist', () => {

    const h1 = wrapper.find('h1');
    expect(h1.exists()).toBe(true);
  });

  it('h1 text is Daily Corona Cases in Turkey ', () => {
    const h1 = wrapper.find('h1');
    expect(h1.text()).toMatch('Daily Corona Cases in Turkey');

  });

  it('notification area class is danger when count is equal or greater than 10', async () => {

    wrapper.vm.$store.commit('addToCount', 11);
    await wrapper.vm.$nextTick();
    const notificationArea = wrapper.find('.notificationArea');
    expect(notificationArea.classes()).toContain('danger');


  });


  it('notification area class is normal when count is equal or greater than or to 5 and less than 10', async () => {

    wrapper.vm.$store.commit('addToCount', 9);
    await wrapper.vm.$nextTick();
    const notificationArea = wrapper.find('.notificationArea');
    expect(notificationArea.classes()).toContain('normal');

  });

  it('notification area class is safe when count is less than 5 ', async () => {

    wrapper.vm.$store.commit('addToCount', 4);
    await wrapper.vm.$nextTick();
    const notificationArea = wrapper.find('.notificationArea');
    expect(notificationArea.classes()).toContain('safe');



  });

  it('notification area text is not empty', () => {
    const notificationArea = wrapper.find('.notificationArea');
    expect(notificationArea.text()).not.toBe('');
  });


});