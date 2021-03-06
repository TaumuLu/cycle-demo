import { MainDOMSource, VNode } from '@cycle/dom'
import xs, { Stream } from 'xstream'

import { Reducer, Sinks, Sources } from '@/types/interfaces'

export interface State {
  count: number
}
export const defaultState: State = {
  count: 0,
}

interface DOMIntent {
  increment$: Stream<null>
  decrement$: Stream<null>
  link$: Stream<null>
}

export function Counter({ DOM, state }: Sources<State>): Sinks<State> {
  const { increment$, decrement$, link$ }: DOMIntent = intent(DOM)

  return {
    DOM: view(state.stream),
    state: model(increment$, decrement$),
    router: redirect(link$),
  }
}

function model(
  increment$: Stream<any>,
  decrement$: Stream<any>,
): Stream<Reducer<State>> {
  const init$ = xs.of<Reducer<State>>(prevState =>
    prevState === undefined ? defaultState : prevState,
  )

  const addToState: (n: number) => Reducer<State> = n => state => ({
    ...state,
    count: (state as State).count + n,
  })
  const add$ = increment$.mapTo(addToState(1))
  const subtract$ = decrement$.mapTo(addToState(-1))

  return xs.merge(init$, add$, subtract$)
}

function view(state$: Stream<State>): Stream<VNode> {
  console.log(222, state$)
  // const sinks = {
  //   DOM: sources.DOM.select('input')
  //     .events('click')
  //     .map((ev: any) => ev.target.checked)
  //     .startWith(false)
  //     .map((toggled: any) => (
  //       <div>
  //         <input type="checkbox" /> Toggle me
  //         <p>{toggled ? 'ON' : 'off'}</p>
  //       </div>
  //     )),
  // }
  // return sinks
  // console.log(111, sinks)
  return state$.map(({ count }) => {
    console.log(1111, count)

    const html = (
      <div>
        <h2>My Awesome Cycle.js app - Page 1</h2>
        <span>{'Counter: ' + count}</span>
        <button type="button" className="add">
          Increase
        </button>
        <button type="button" className="subtract">
          Decrease
        </button>
        <button type="button" data-action="navigate">
          Page 2
        </button>
      </div>
    )
    return html
  })
}

function intent(DOM: MainDOMSource): DOMIntent {
  const increment$ = DOM.select('.add').events('click').mapTo(null)

  const decrement$ = DOM.select('.subtract').events('click').mapTo(null)

  const link$ = DOM.select('[data-action="navigate"]')
    .events('click')
    .mapTo(null)

  return { increment$, decrement$, link$ }
}

function redirect(link$: Stream<any>): Stream<string> {
  return link$.mapTo('/speaker')
}
