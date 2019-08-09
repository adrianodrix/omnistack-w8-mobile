import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native'

import logo from '../../assets/logo.png'
import itsamatch from '../../assets/itsamatch.png'
import dislike from '../../assets/dislike.png'
import like from '../../assets/like.png'

export default ({ navigation }) => {
  const [users, setUsers] = useState([])
  const [matchDev, setMatchDev] = useState(null)

  const id = navigation.getParam('user')

  useEffect(() => {
    const loadUsers = async () => {
      const response = await api.get('https://omnistack-w8-backend.herokuapp.com/devs', {
        headers: { 'Content-User': id }
      })

      setUsers(response.data)
    }
    loadUsers()
  }, [id])

  useEffect(() => {
    const socket = io('https://omnistack-w8-backend.herokuapp.com', {
      query: { user: id }
    })

    socket.on('match', dev => {
      setMatchDev(dev)
    })
  }, [id])

  const handleLike = async () => {
    const [user, ...rest] = users

    await api.post(`https://omnistack-w8-backend.herokuapp.com/devs/${user._id}/likes`, null, {
      headers: { 'Content-User': id }
    })

    setUsers(rest)
  }

  const handleDislike = async () => {
    const [user, ...rest] = users

    await api.post(`https://omnistack-w8-backend.herokuapp.com/devs/${user._id}/dislikes`, null, {
      headers: { 'Content-User': id }
    })

    setUsers(rest)
  }

  const handleLogout = async () => {
    await AsyncStorage.clear()
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
      />

      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {
          users.length === 0
            ? <Text style={styles.empty}>Acabou :(</Text>
            : (users.map((user, index) => (
              <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            )))
        }
      </View>

      { users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}

      { matchDev && (
        <View style={styles.matchContainer}>
          <Image style={styles.matchImage} source={itsamatch} />

          <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />
          <Text style={styles.matchName}>{matchDev.name} </Text>
          <Text style={styles.matchBio}>{matchDev.bio}</Text>

          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.matchClose}>Fechar</Text>
          </TouchableOpacity>

        </View>
      )}
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
  },

  logo: {
    marginTop: 30
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold'
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500
  },

  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  avatar: {
    flex: 1,
    height: 300
  },

  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },

  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999
  },

  matchImage: {
    height: 60,
    resizeMode: 'contain'
  },

  matchAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#fff',
    marginVertical: 30
  },

  matchName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff'
  },

  matchBio: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 30
  },

  matchClose: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 30,
    fontWeight: 'bold'
  }

})
