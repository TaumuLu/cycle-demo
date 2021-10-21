import { MainDOMSource, VNode } from '@cycle/dom'
import { Reducer, StateSource } from '@cycle/state'
import { RouterSource } from 'cyclic-router'
import { Stream } from 'xstream'

export type { Reducer } from '@cycle/state'

export type Component<State> = (s: Sources<State>) => Sinks<State>

export interface Sources<State> {
  DOM: MainDOMSource
  router: RouterSource
  state: StateSource<State>
}

export interface Sinks<State> {
  DOM?: Stream<VNode>
  router?: Stream<string>
  speech?: Stream<string>
  state?: Stream<Reducer<State>>
}
