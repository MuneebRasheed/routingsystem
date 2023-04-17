import React from 'react'
import { BackHandler } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Support from '@component/Support'
import { setLandingScreen, goBack } from '@navigation'
import Navigator from '@navigation/screen'
import { store, persistor } from '@store'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      storeLoaded: false,
      loading: true
    }

    this.initiate = this.initiate.bind(this)
    this.onBeforeLift = this.onBeforeLift.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      goBack()
      return true
    })

    this.initiate()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', function () {
    })
  }

  async initiate() {
    if (!(this.state.storeLoaded)) {
      setTimeout(this.initiate, 1000)
      return
    }

    const routeData = {}

    this.setState({
      loading: false
    })
  }

  onBeforeLift() {
    this.setState({ storeLoaded: true })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={this.onBeforeLift}
        >
          {this.state.loading ? null : <Navigator />}
        </PersistGate>
        <Support />
      </Provider>
    )
  }
}