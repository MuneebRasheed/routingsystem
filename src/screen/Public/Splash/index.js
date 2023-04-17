import React from 'react'
import { Image, StatusBar, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles'

import { Container } from '@component/Basic'
import { navigateReset } from '@navigation'
import theme from '@theme/styles'
import { __ } from '@utility/translation'

class Splash extends React.Component {

  async componentDidMount() {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })
  }
  componentDidMount() {
    setTimeout(() => {
      navigateReset('PublicIntro')
    }, 2500)
  }

  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor='transparent' />
        <View style={styles.splash}>
          <View style={styles.splashContent}>
            <View style={styles.splashTop}>
              <Image source={require('@asset/images/truck.png')} style={styles.splashImg} />
              <Text style={styles.splashTitle}>{__('Truckie')}</Text>
            </View>
          </View>
        </View>
      </Container>
    )
  }
}

export default Splash