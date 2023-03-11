import React from "react";
import { Dimensions, View } from "react-native";
import { COLOR } from '@theme/typography'

const Content = (props) => {
    return (
        <View style={props.style ? [styles.container, props.style] : styles.container}>{props.children}</View>
    )
}

const deviceHeight = Dimensions.get('window').height;

const styles = {
    container: {
        backgroundColor: 'rgba(89,73,158,0.1)',
        flex: 1,
    }
}

export default Content