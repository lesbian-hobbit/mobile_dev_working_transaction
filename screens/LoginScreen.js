import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { auth } from '../firebase'
import { auth, firebase } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser  } from "firebase/auth";
import { updateDoc, doc , setDoc } from 'firebase/firestore';



const LoginScreen = () => {
  const todoRef = firebase.firestore().collection('Users');
  
  const navigation = useNavigation()
 
  
  const db = firebase.firestore();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [availableAmount, setAvailableAmount] = useState('0')



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Main")
      }
    })

    return unsubscribe
  }, [])

//sign up 
  const handleSignUp = async () => {
      auth
      createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      
        console.log('Registered with:', user.uid);

         setDoc(doc(db, "Users", user.uid),{
        email: email,
        password: password,
        availableAmount: Number( availableAmount)

      })

      }).catch(error => alert(error.message))
       
        
     
      
    
  }
//Sign in..



  const handleLogin = () => {
      auth
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        
      
      })
      .catch(error => alert(error.message))
    
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5', // Changing the background color
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25, // Changing the border radius for a rounded input
    marginTop: 10, // Increasing margin top for better spacing
    fontSize: 16,
    color: '#333333', // Changing the input text color
  },
  buttonContainer: {
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FF6F61', // Changing the button background color
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25, // Changing the border radius for a rounded button
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    marginTop: 10,
    borderColor: '#FF6F61', // Changing the outline button border color
    borderWidth: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#FF6F61', // Changing the outline button text color
    fontWeight: '700',
    fontSize: 16,
  },
})