import isolate from '@cycle/isolate'
import { extractSinks } from 'cyclejs-utils'
import xs, { Stream } from 'xstream'

import { Counter, State as CounterState } from '@/components/counter'
import { Speaker, State as SpeakerState } from '@/components/speaker'
import { driverNames } from '@/drivers'
import { Component, Sinks, Sources } from '@/types/interfaces'

export interface State {
  counter?: CounterState
  speaker?: SpeakerState
}

export function App(sources: Sources<State>): Sinks<State> {
  const match$ = sources.router.define({
    '/counter': isolate(Counter, 'counter'),
    '/speaker': isolate(Speaker, 'speaker'),
  })

  const componentSinks$: Stream<Sinks<State>> = match$
    .filter(({ path, value }: any) => path && typeof value === 'function')
    .map(({ path, value }: { path: string; value: Component<any> }) => {
      console.log(3333, value)
      return value({
        ...sources,
        router: sources.router.path(path),
      })
    })

  const redirect$: Stream<string> = sources.router.history$
    .filter((l: Location) => l.pathname === '/')
    .mapTo('/counter')

  const sinks = extractSinks(componentSinks$, driverNames)
  return {
    ...sinks,
    router: xs.merge(redirect$, sinks.router),
  }
}
