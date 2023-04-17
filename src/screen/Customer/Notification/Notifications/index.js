import React from 'react'
import { FlatList, View } from 'react-native'

import Item from './Item'
import Placeholder from './Placeholder'
import { __ } from '@utility/translation'

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.renderTemplate = this.renderTemplate.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  renderTemplate () {
    return <Placeholder />
  }

  renderItem ({ item }) {
    return (
      <Item
        language={this.props.language}
        item={item}
      />
    )
  }

  render () {
    return (
      <>
        <FlatList
          data={this.props.fetching ? [1, 2, 3, 4] : this.props.list}
          showsHorizontalScrollIndicator={false}
          renderItem={this.props.fetching ? this.renderTemplate : this.renderItem}
        />
      </>

    )
  }
}
