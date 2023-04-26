import React from 'react'
import { View } from 'react-native'
import { Text, Icon } from '@component/Basic'
import { Button } from '@component/Form'

import styles from '../styles'

import Modal from 'react-native-modalbox'

import theme from '@theme/styles'
import { navigate } from '@navigation'
import { __ } from '@utility/translation'

export default function Item() {
    return (
      <>
        <View style={styles.notificationContent}>
          <View style={styles.notificationInfo}>
            <Text style={styles.notificationTitle}>{__('BOOKING ID')} {"item.name"}</Text>
            <Text style={styles.notificationText}>{ "item.time"}</Text>
          </View>
          <View style={styles.notificationDetail}>
            <Text style={styles.bookingText}>{ "item.desc"}</Text>
            <Button style={styles.deleteBtn}>
              <Icon name='delete' type='AntDesign' style={[theme.SIZE_20, theme.SMOKEVIOLET]} />
            </Button>
          </View>
        </View>
      </>
    )
  }

