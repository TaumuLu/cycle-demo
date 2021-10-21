import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@cycle/history'
import { withState } from '@cycle/state'
import { routerify } from 'cyclic-router'
import switchPath from 'switch-path'

import { Component } from '@/types/interfaces'

import speechDriver from './speech'

const driversFactories = {
  DOM: () => makeDOMDriver('#root'),
  history: () => makeHistoryDriver(),
  speech: () => speechDriver,
}

export function getDrivers(): any {
  return Object.keys(driversFactories)
    .map(k => ({ [k]: driversFactories[k as keyof typeof driversFactories]() }))
    .reduce((a, c) => ({ ...a, ...c }), {})
}

export const driverNames = Object.keys(driversFactories)
  .filter(name => name !== 'history')
  .concat(['state', 'router'])

export function wrapMain(main: Component<any>) {
  return withState(routerify(main, switchPath))
}
