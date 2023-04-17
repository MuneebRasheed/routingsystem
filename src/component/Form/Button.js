import React from 'react'
import { Pressable } from 'react-native'

import { COLOR } from '@theme/typography'

export const Button = ({ variant = 'default', disabled, style, children, ...props }) => {
  const btnStyle = [styles.button[variant]]
  if (disabled) {
    btnStyle.push(styles.disabled)
  }
  if (style) {
    btnStyle.push(style)
  }
  return <Pressable
    {...props}
    style={btnStyle}
  >
    {children}
  </Pressable>
}

const styles = {
  button: {
    default: {
    },
    primary: {
      backgroundColor: COLOR.primary,
      borderRadius: 5,
      justifyContent: 'center',
      paddingHorizontal: 15,
      paddingVertical: 15,
      marginHorizontal: 20
    },
    secondary: {
      // backgroundColor: COLOR.secondary,
      // borderRadius: 5
    },
    transparent: {
      // backgroundColor: 'transparent',
      // alignItems: 'center'
    }
  },
  disabled: {
  },
  size: {
  }
}

export default Button