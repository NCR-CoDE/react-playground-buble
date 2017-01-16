import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import App from './app'
import { AppContainer } from 'react-hot-loader'
import {
  forceViewerUpdate,
} from '@di-internal/react-playground-lite'
import { defaultTheme } from '../../src/themes'
import { ThemeBroadcast } from '@di-internal/leapfrog-util'
import { initThemedPlayground } from './components/themed-playground'
import FastClick from 'fastclick'
export const themeBroadcast = new ThemeBroadcast(defaultTheme)
initThemedPlayground(themeBroadcast)

window.addEventListener('load', () => {
  FastClick.attach(document.body)
})

function rerender(App2) {
  render(
    <AppContainer>
      <App2 />
    </AppContainer>
    ,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./app', () => {
//    const App2 = require('./components/app').default
    System.import('./app').then(({ default: App2 }) => {
      unmountComponentAtNode(document.getElementById('root'))
      rerender(App2)
      //forceViewerUpdate()
    })
  })
}

rerender(App)
