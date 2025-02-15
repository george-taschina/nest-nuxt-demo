import { mount } from '@vue/test-utils';
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest';
import { Timer } from '#components';
import * as Nuxt from '#app/composables/router';

const navigateTo = vi.fn();

describe('Timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const mockDate = new Date(2025, 0, 1, 12, 0, 0);
    vi.setSystemTime(mockDate);
    navigateTo.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('displays correct initial time left', async () => {
    const expiresAt = new Date(2025, 0, 1, 12, 2, 30);
    const wrapper = mount(Timer, {
      props: { expiresAt },
      global: {
        mocks: { navigateTo },
      },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('p.text-lg').text()).toBe('02:30');
  });

  test('updates time left every second and navigates on expiration', async () => {
    const expiresAt = new Date(2025, 0, 1, 12, 0, 3);
    const wrapper = mount(Timer, {
      props: { expiresAt },
      global: {
        mocks: { navigateTo },
      },
    });
    const mock = vi.spyOn(Nuxt, 'navigateTo');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('p.text-lg').text()).toBe('00:03');

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p.text-lg').text()).toBe('00:02');

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p.text-lg').text()).toBe('00:01');

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(mock).toHaveBeenCalledWith('/expired');
  });

  test('navigates immediately if expired on mount', () => {
    const expiresAt = new Date(2025, 0, 1, 11, 59, 59);
    const mock = vi.spyOn(Nuxt, 'navigateTo');
    mount(Timer, {
      props: { expiresAt },
      global: {
        mocks: { navigateTo },
      },
    });

    expect(mock).toHaveBeenCalledWith('/expired');
  });

  test('clears interval when component is unmounted', () => {
    const expiresAt = new Date(2025, 0, 1, 12, 2, 30);
    const wrapper = mount(Timer, {
      props: { expiresAt },
      global: {
        mocks: { navigateTo },
      },
    });

    expect(vi.getTimerCount()).toBe(1);

    wrapper.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
