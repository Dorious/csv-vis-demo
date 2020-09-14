import { IConfig, createOvermind } from "overmind";
import { createHook, createActionsHook, createStateHook } from "overmind-react";

import { state } from './state';
import * as actions from './actions';
import * as effects from './effects';

const config = {
  state,
  actions,
  effects
};

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const app = createOvermind(config, {
  devtools: false,
});

export const useApp = createHook<typeof config>();
export const useActions = createActionsHook<typeof config>();
export const useAppState = createStateHook<typeof config>();