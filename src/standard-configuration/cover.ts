import { ActionConfig } from '../types';
import { levelVariable } from '../actionVariables';
import { HassEntity } from 'home-assistant-js-websocket';
import { HomeAssistant } from 'custom-card-helpers';
import { localize } from '../localize/localize';

export const coverIcon = (stateObj?: HassEntity): string => {
  const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
  switch (deviceClass) {
    case 'garage':
      return 'hass:garage';
    case 'door':
      return 'hass:door-closed';
    case 'shutter':
      return 'hass:window-shutter';
    case 'blind':
      return 'hass:blinds';
    case 'window':
      return 'hass:window-closed';
    default:
      return 'hass:window-shutter';
  }
};

export const coverIconOpen = (stateObj?: HassEntity): string => {
  const deviceClass = stateObj && stateObj.attributes.device_class ? stateObj.attributes.device_class : null;
  switch (deviceClass) {
    case 'garage':
      return 'hass:garage-open';
    case 'door':
      return 'hass:door-open';
    case 'shutter':
      return 'hass:window-shutter-open';
    case 'blind':
      return 'hass:blinds-open';
    case 'window':
      return 'hass:window-open';
    default:
      return 'hass:window-shutter-open';
  }
};

export const coverActions = (hass: HomeAssistant, stateObj?: HassEntity): ActionConfig[] => [
  {
    service: 'cover.open_cover',
    icon: coverIconOpen(stateObj),
    name: localize('services.cover.open_cover', hass.language),
  },
  {
    service: 'cover.close_cover',
    icon: coverIcon(stateObj),
    name: localize('services.cover.close_cover', hass.language),
  },
  {
    service: 'cover.set_cover_position',
    variable: levelVariable({
      field: 'position',
      name: hass.localize('ui.card.cover.position', hass.language),
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
    }),
    supported_feature: 4,
    icon: 'hass:ray-vertex',
    name: localize('services.cover.set_cover_position', hass.language),
  },
];

export const coverStates = ['open', 'closed'];
