import React, { useState, useContext } from 'react'
import { AsyncStorage, Text, TextInput, View, StyleSheet } from 'react-native'
// import {connect} from 'react-redux' sd 10/23/2019
// import {doLogin} from '../../store/actions/authActions' sd 10/23/2019
import { styles } from '../../components/Styles'
import { Button } from 'native-base'
import axios from 'axios'
import { UserContext } from "../../context/userState";
// SENDS A TEXT FROM THE AUTH SERVER > ENTER THE TEXT CODE > GET THE TOKEN 10/24/2019 SD
const LoginVerify = props => {
    console.log('TCL: LoginVerify -> props', props)
    // GETS USERNAME OUT OF PROPS 10/24/2019 SD
    const username = props.navigation.state.params.username
    //SETS VERIFY CODE FROM USER INPUT 10/24/2019 SD
    const [vercode, setVercode] = useState('')
    // const [token, setToken] = useState('')
    const { user, setToken  } = useContext(UserContext)
    const vercodeMutation = ``
    const handlePress = () => {
        //DEVELOPMENT VERIFICATION CODE MUTATION SENT TO SERVER AND RETURNING TOKEN IN THE RESULTS 10/24/2019 SD
        const devVerCode = `mutation { authyVerifyDev( username: "${username}", code: "${vercode}" ) { token }}`

        axios({
            method: 'post',
            url: 'https://netgiver-stage.herokuapp.com/graphql',
            data: {
                query: devVerCode,
            },
        }).then(res => {
            // NAVIGATES TO LOGINCKECKER AND SETS TddOKEN TO PROPS 10/24/2019 SD
            AsyncStorage.removeItem('TOKEN', (err, result) => {
                AsyncStorage.setItem(
                    'TOKEN',
                    JSON.stringify(res.data.data.authyVerifyDev.token),
                    () => {
                        AsyncStorage.getItem('TOKEN', (err, result) => {
                            console.log('FROM ASYNC', result)
                            setToken({  token:  res.data.data.authyVerifyDev.token}) 
                            props.navigation.navigate('WorkOrderList', {token:res.data.data.authyVerifyDev.token})
                        })
                    }
                )
            })
        })
import React, { useState } from "react";
import { AsyncStorage, Text, TextInput, View, StyleSheet } from "react-native";
// import {connect} from 'react-redux' sd 10/23/2019
// import {doLogin} from '../../store/actions/authActions' sd 10/23/2019
import { styles } from "../../components/Styles";
import { Button } from "native-base";
import { gql } from "apollo-boost";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

export const AUTHY_VERIFY_DEV = gql`
  mutation authyVerifyDev($username: String!, $code: String!) {
    authyVerifyDev(username: $username, code: $code) {
      token
    }
  }
`;
// SENDS A TEXT FROM THE AUTH SERVER > ENTER THE TEXT CODE > GET THE TOKEN 10/24/2019 SD
const LoginVerify = props => {
  // GETS USERNAME OUT OF PROPS 10/24/2019 SD
  const username = props.navigation.state.params.username;
  //SETS VERIFY CODE FROM USER INPUT 10/24/2019 SD
  const [vercode, onChangeText] = useState("");
  const [token, setToken] = useState("");
  const client = useApolloClient();
  const [authyVerifyDev, { loading, error }] = useMutation(AUTHY_VERIFY_DEV, {
    onCompleted({ authyVerifyDev }) {
      const token = authyVerifyDev.token;
      client.writeData({ data: { isLoggedIn: true } });
      AsyncStorage.setItem("userToken", token).then(() => {
        props.navigation.navigate("WorkOrderList");
      });
    }
  });

  //SENDS BACK TO LOGIN INCASE OF NO TOKEN 10/24/2019 SD
  const goBack = () => {
    props.navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>ADD LOGO</Text>
      <Text>Please Verify Your Code</Text>
      <TextInput
        style={styles.loginTextInput}
        placeholder="Verification Code"
        name="vercode"
        id="vercode"
        value={vercode}
        autoCapitalize="none"
        onChangeText={text => onChangeText(text)}
        onFocus={() => onChangeText("")}
      />
      <Button
        onPress={() =>
          authyVerifyDev({
            variables: {
              username: username,
              code: vercode
            }
          })}
        style={styles.button}
      >
        <Text>Verify Access</Text>
      </Button>
      <Text style={styles.marginTop}>Didn't get the code? Try Again!</Text>
      <Button onPress={goBack} style={styles.button}>
        <Text>Get Another Code!</Text>
      </Button>
    </View>
  );
};

export default LoginVerify;
