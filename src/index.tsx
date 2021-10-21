import { run } from '@cycle/run'

import { App } from './App'
import { getDrivers, wrapMain } from './drivers'

const main = wrapMain(App)

run(main, getDrivers())
