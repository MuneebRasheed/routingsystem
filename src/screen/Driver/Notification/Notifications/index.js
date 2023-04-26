import React from 'react'
import { FlatList, View } from 'react-native'

import Item from './Item'
import Placeholder from './Placeholder'
import { __ } from '@utility/translation'
import data from '../data/notifications'

export default function Notification(){
 

  const renderTemplate= ()=> {
    return <Placeholder />
  }

 const  renderItem =() =>{
    return (
      <Item
        language={"this.props.language"}
        // item={item}
      />
    )
  }


    return (
      <>
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </>

    )
  }

