import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { collection, query, where, onSnapshot, writeBatch, runTransaction, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const MainDashboard = ({ route, navigation }) => {
  const [balance, setBalance] = useState(5000); // Initial balance
  const [email, setEmail] = useState("");
  const [uids, setUid] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const [uid2, setUid2] = useState("");
  const [amount, setAmount] = useState("");

  const transferFunds = async () => {
    const sfDocRef = doc(firestore, "users", uid2);
    try {
      await runTransaction(firestore, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        const newWallet = sfDoc.data().wallet + Number(amount);
        transaction.update(sfDocRef, { wallet: newWallet });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        setEmail(user.email);

        const getWallet = async () => {
          const docRef = doc(firestore, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserInfo(data);
          } else {
            console.log("No such document!");
          }
        };
        getWallet();
      } else {
        navigation.navigate("Login");
      }
    });
  }, []);

  const handleTransferFunds = () => {
    // Implement your logic for transferring funds here
    // This is just a placeholder example
    setBalance(balance - 100);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("An error occurred while signing out.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {email}</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabelText}>Account Balance</Text>
        <Text style={styles.balanceAmountText}>₱{userInfo.wallet}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Recipient UID"
        value={uid2}
        onChangeText={setUid2}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={transferFunds}>
        <Text style={styles.buttonText}>Transfer Funds</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
backgroundColor: "#f5f5f5",
alignItems: "center",
justifyContent: "center",
},
welcomeText: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 20,
color: "#333333",
},
balanceContainer: {
marginBottom: 30,
alignItems: "center",
},
balanceLabelText: {
fontSize: 18,
color: "#666666",
marginBottom: 10,
},
balanceAmountText: {
fontSize: 24,
fontWeight: "bold",
color: "#00aeef",
},
input: {
height: 50,
width: 300,
borderColor: "#cccccc",
borderWidth: 1,
borderRadius: 5,
marginBottom: 20,
paddingHorizontal: 10,
fontSize: 16,
color: "#333333",
backgroundColor: "#ffffff",
},
button: {
backgroundColor: "#00aeef",
paddingVertical: 15,
paddingHorizontal: 40,
borderRadius: 5,
marginBottom: 10,
alignItems: "center",
justifyContent: "center",
},
buttonText: {
color: "#ffffff",
fontSize: 18,
fontWeight: "bold",
},
signOutButton: {
backgroundColor: "#ff5555",
paddingVertical: 15,
paddingHorizontal: 40,
borderRadius: 5,
marginBottom: 10,
alignItems: "center",
justifyContent: "center",
},
signOutButtonText: {
color: "#ffffff",
fontSize: 18,
fontWeight: "bold",
},
});

export default MainDashboard; 
