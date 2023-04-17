import React from 'react'
import { View, ScrollView } from 'react-native'
import { Container, Content, Text, Icon } from '@component/Basic'
import { Button } from '@component/Form'

import styles from './styles'
import theme from '@theme/styles'

import Header from '@component/Header'
import Accordion from './Accordion'

import { navigate } from '@navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'
import { DarkStatusBar } from '@component/StatusBar'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false,
      isOpen: false
    }
  }

  render() {
    const item = this.props.item

    return <Container>
      <DarkStatusBar />
      <Header
        leftType='back' />
      <View style={styles.settlementHeader}>
        <Text style={styles.settlementHeaderTitle}>{__('SETTLEMENT')}</Text>
        <Text style={styles.settlementHeaderText}>{__('SETTLEMENT FOR TRIPS')}</Text>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.settlementContainer} >
            <View style={styles.accordionLayout}>
              <Accordion
                title='BOOKING ID #X876895'
                text='open'
                style={{ backgroundColor: 'rgba(92,186,71,1)' }}
                renderContent={() => (
                  <View style={styles.accordionContent}>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('TRIP COST')}</Text>
                      <Text style={styles.bookingCost}>{__('$1300 USD')}</Text>
                    </View>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('ADVANCE')}</Text>
                      <Text style={styles.bookingCost}>{__('$500 USD')}</Text>
                    </View>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('PAID')}</Text>
                      <Text style={styles.bookingCost}>{__('$700 USD')}</Text>
                    </View>
                    <View style={styles.bookingItem}>
                      <Text style={styles.bookingText}>{__('DUE')}</Text>
                      <Text style={styles.bookingCost}>{__('$100 USD')}</Text>
                    </View>
                  </View>
                )}
              />
              <Accordion
                title='BOOKING ID #X876895'
                text='complete'
                style={{ backgroundColor: 'rgba(92,186,71,1)' }}
                renderContent={() => (
                  <View style={styles.accordionContent}>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('TRIP COST')}</Text>
                      <Text style={styles.bookingCost}>{__('$1500 USD')}</Text>
                    </View>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('ADVANCE')}</Text>
                      <Text style={styles.bookingCost}>{__('$300 USD')}</Text>
                    </View>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('PAID')}</Text>
                      <Text style={styles.bookingCost}>{__('$100 USD')}</Text>
                    </View>
                    <View style={styles.bookingItem}>
                      <Text style={styles.bookingText}>{__('DUE')}</Text>
                      <Text style={styles.bookingCost}>{__('$800 USD')}</Text>
                    </View>
                  </View>
                )}
              />
              <Accordion
                title='BOOKING ID #X876885'
                text='complete'
                style={{ backgroundColor: 'rgba(0,0,0,1)' }}
                renderContent={() => (
                  <View style={styles.accordionContent}>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('TRIP COST')}</Text>
                      <Text style={styles.bookingCost}>{__('$1500 USD')}</Text>
                    </View>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('ADVANCE')}</Text>
                      <Text style={styles.bookingCost}>{__('$300 USD')}</Text>
                    </View>
                    <View style={[styles.bookingItem, styles.bookingItem2]}>
                      <Text style={styles.bookingText}>{__('PAID')}</Text>
                      <Text style={styles.bookingCost}>{__('$100 USD')}</Text>
                    </View>
                    <View style={styles.bookingItem}>
                      <Text style={styles.bookingText}>{__('DUE')}</Text>
                      <Text style={styles.bookingCost}>{__('$800 USD')}</Text>
                    </View>
                  </View>
                )}
              />

            </View>
          </View>
        </ScrollView>
      </Content>
    </Container>
  }
}
