import React from 'react'
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text
} from 'react-native'

import logo from '../../assets/logo.png'

export default () => {
  const app = ''

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} />
      <View style={styles.cardsContainer}>
        <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/9584880?v=4' }} />
        <View style={styles.footer}>
          <Text style={styles.name}>Adriano Santos</Text>
          <Text style={styles.bio}>I am entrepreneur and systems analyst, but I consider the Father profession the most inspiring and challenging.</Text>
        </View>
      </View>

      <View />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30
  }
})
