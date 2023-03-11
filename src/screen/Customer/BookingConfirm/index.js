import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Container, Content, Text, Icon } from '@component/Basic'
import { Button } from '@component/Form'

import styles from './styles'
import theme from '@theme/styles'

import Modal from 'react-native-modalbox'
import DateTimePicker from '@react-native-community/datetimepicker'

import Header from '@component/Header'
import Support from '@component/Support'

import { navigate, navigateReset } from '@navigation'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'
import { DarkStatusBar } from '@component/StatusBar'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false,
      isOpen: false,
      date: new Date('2020-06-12T14:42:42'),
      mode: 'date',
      show: false
    }

    bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }
  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }
  datepicker = () => {
    this.show('date');
  }
  timepicker = () => {
    this.show('time');
  }

  async onSubmit() {
    await Support.showSuccess({
      title: __('Success'),
      message: __('Your payment can be paid successfully'),
      onHide: () => {
        navigateReset('PublicHome')
      },
      hideDelay: 2500
    })
  }

  render() {
    const { show, date, mode } = this.state
    return <Container>
      <DarkStatusBar />
      <Header
        leftType='back' />
      <View style={styles.bookingHeader}>
        <Text style={styles.bookingHeaderTitle}>{__('BOOKING')}</Text>
        <Text style={styles.bookingHeaderText}>{__('CONFIRMATION')}</Text>
      </View>
      <Content contentContainerStyle={theme.layoutDf}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bookingContainer}>
            <View style={styles.bookingContent}>
              <View style={styles.bookingDetail}>
                <Text style={styles.bookingIdText}>{__('BOOKING ID:#Z83764')}</Text>
                <Button>
                  <Text style={styles.completeBtn}>{__('Closed')}</Text>
                </Button>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('PICKUP DATE')}</Text>
                <View style={styles.bookingDetailInfo}>
                  <Text style={styles.bookingText}>{__('Dec 25,2019')}</Text>
                  <Button style={styles.calendarIcon} onPress={this.datepicker} title='Show date picker!'>
                    <Icon name='calendar' type='AntDesign' style={[theme.SIZE_18, theme.GREY]} />
                  </Button>
                </View>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('PICKUP TIME')}</Text>
                <View style={styles.bookingDetailInfo}>
                  <Text style={styles.bookingText}>{__('11:30 AM')}</Text>
                  <Button style={styles.calendarIcon} onPress={this.timepicker} title='Show date picker!'>
                    <Icon name='clock' type='Feather' style={[theme.SIZE_18, theme.GREY]} />
                  </Button>
                </View>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('PICKUP FROM')}</Text>
                <Text style={styles.bookingText}>{__('NewYork,USA')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('DROP AT')}</Text>
                <Text style={styles.bookingText}>{__('Texas,USA')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('VEHICLE TYPE')}</Text>
                <Text style={styles.bookingText}>{__('Tata, ACE')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('VEHICLE TYPE')}</Text>
                <Text style={styles.bookingText}>{__('Electronics')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('DELIVERY FLOOR')}</Text>
                <Text style={styles.bookingText}>{__('Ground')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('UNLOADING MANPOWER')}</Text>
                <Text style={styles.bookingText}>{__('Yes')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('TOTAL LOADS')}</Text>
                <Text style={styles.bookingText}>{__('1000 Kgs')}</Text>
              </View>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingTitle}>{__('TOTAL PACKAGES')}</Text>
                <Text style={styles.bookingText}>{__('30 Nos')}</Text>
              </View>
              <Button style={styles.uploadBtn} onPress={() => this.refs.modalPackage.open()}>
                <Text style={styles.uploadBtnText}>{__('Click Here for Package Details')}</Text>
              </Button>
              <View style={styles.bookingInfo}>
                <Text style={styles.bookingText}>{__('TOTAL PAYABLE')}</Text>
                <Text style={styles.bookingText}>{__('$ 1200')}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Content>
      {show && <DateTimePicker value={date}
        mode={mode}
        is24Hour
        display='default'
        onChange={this.setDate} />
      }
      <Modal
        ref={'modalCheckout'}
        position={'center'}
        isOpen={this.state.isOpen}
        onClosed={() =>
          this.setState({
            isOpen: false
          })
        }
        isDisabled={this.state.isDisabled}
        style={styles.modalCheckout}>
        <View >
          <Image source={require('@asset/images/tick-inside-circle.png')} resizeMode='cover' style={styles.modalImg} />
        </View>
        <View style={styles.modalTextInfo}>
          <Text style={styles.modalTitle}>{__('Thank You')}</Text>
          <Text style={styles.modalTitleText}>{__('Your booking has been placed\nsuccessfully')}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalText}>{__('BOOKING ID')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('#tZ6587')}</Text>
          </View>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalText}>{__('YOUR OTP')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('6751')}</Text>
          </View>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalText}>{__('DRIVER NAME')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('DANIEL VENTO')}</Text>
          </View>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalText}>{__('VEHICLE NUMBER')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('NY 00657647')}</Text>
          </View>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalText}>{__('CALL DRIVER')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('@7653756')}</Text>
          </View>
        </View>
        <View style={styles.payBtnInfo}>
          <Button style={styles.payBtn} onPress={() => { navigate('CustomerPayment') }}>
            <Text style={styles.payText}>{__('PAY ADVANCE')}</Text>
          </Button>
          <Button style={styles.cancelBtn} onPress={() => this.refs.modalCheckout.close()}>
            <Text style={styles.cancelText}>{__('CANCEL')}</Text>
          </Button>
        </View>
      </Modal>
      <Modal
        ref={'modalPackage'}
        position={'center'}
        isOpen={this.state.isOpen}
        onClosed={() =>
          this.setState({
            isOpen: false
          })
        }
        isDisabled={this.state.isDisabled}
        style={styles.modalPackage}>
        <View>
          <Image source={require('@asset/images/package.png')} style={styles.modalImg} />
        </View>
        <View style={styles.modalTextInfo}>
          <Text style={styles.modalTitle}>{__('Package')}</Text>
          <Text style={styles.modalTitleText}>{__('Checkout Your Package\ninformations')}</Text>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalText}>{__('DIMENSION')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalText}>{__('QUANTITY')}</Text>
          </View>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalDetailText}>{__('7.2 ft x 4/2 ft x 1ft')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('20 Nos')}</Text>
          </View>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.modalDetailText}>{__('41 ft x 4/2 ft x 2ft')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailText}>{__('10 Nos')}</Text>
          </View>
        </View>
        <View style={[styles.modalInfo, styles.modalInfoNoBorder]}>
          <Text style={styles.modalDetailTextDark}>{__('TOTAL PACKAGES')}</Text>
          <View style={styles.modalDetailInfo}>
            <Text style={styles.modalDetailTextDark}>{__('30 Nos')}</Text>
          </View>
        </View>
      </Modal>
      <Button style={styles.bookingBtn} onPress={() => this.refs.modalCheckout.open()}>
        <Text style={styles.bookingBtnText}>{__('CONFIRM BOOKING')}</Text>
      </Button>
    </Container>
  }
}
