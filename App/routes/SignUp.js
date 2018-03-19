import React, { Component } from 'react';
import { LinearGradient, Constants} from 'expo';

//apollo
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';


// my import
import SimpleTextInput from '../Components/SimpleTextInput';
import {TOKEN_KEY }from '../Components/MyConstants'

const defaultState = {
  values: {
    name: '',
    email: '',
    password:'',
  },
  errors: {},
  isSubmitting: false,
};

class SignUp extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = defaultState
  }
	handleInput =(key, value) =>{
		this.setState(state =>({
			values:{
				...state.values,
				[key]: value,
			}
		}))
	}
	singUp = async () => {

		this.setState({isSubmitting: true})
		if (this.state.isSubmitting) {
			return;
		}
		let response;

    // trying to create new user
		try{
			response = await this.props.mutate({
				variables: this.state.values,
			});
		} catch(err){
			this.setState({
        errors: {
          email: 'The email is alread taken'
        },
        isSubmitting: false,
      })
      return;
		}

    // storing token
    try {
      await AsyncStorage.setItem(TOKEN_KEY, response.data.singup.token);
    } catch (error) {
      console.log(error)
      return;
    }
		this.setState(defaultState)
    this.props.history.push('/Products')
	}

  //got to login page
  loginPage = () => {
    this.props.history.push('/Login')
  }
  render() {
  	const { values: {name, email, password}, errors} = this.state;
    return (
    	<LinearGradient colors={['#00cbcc', '#e0f2f1', '#00e5ff']} style={{flex:1, justifyContent: 'center',display: 'flex'}} >
	      <KeyboardAvoidingView behavior="padding"  style={{flex:1, justifyContent: 'center'}}>
	      	<View style={styles.formContainer}>
	      		<View style={{paddingBottom: 20}}>
		      		<SimpleTextInput placeholder="Name"
              onChangeText={text => this.handleInput('name', text)}
              value={name}/>
              <SimpleTextInput placeholder="Email"
              autoCapitalize="none"
              onChangeText={text => this.handleInput('email', text)}
              value={email}
              error={errors.email}/>
              <SimpleTextInput placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={text => this.handleInput('password', text)}
              value={password}/>
	      		</View>
	      		<TouchableOpacity onPress={this.singUp}>
		      		<LinearGradient colors={['#ff8f00','#ffc046','#ff8f00']} style={styles.button}>
			      		<Text style={styles.buttonText}>Save</Text>
		      		</LinearGradient>
	      		</TouchableOpacity>
	      	</View>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Text>or</Text>
          <TouchableOpacity onPress={this.loginPage}>
            <Text style={styles.loginText}>Login?</Text>
          </TouchableOpacity>
        </View>
	    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		paddingTop: Constants.statusBarHeight

	},
	formContainer:{
		paddingHorizontal: 30,
	},
	button:{
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonText:{
		paddingVertical: 5,
		fontSize: 20,
		color: '#fff'
	},
  footer:{
    flex: 0.5,
    paddingBottom: 20,
    alignItems: 'center',
  },
  loginText:{
    padding: 20,
    color: '#fff',
    fontSize: 25,
  }
});


const signUpMutation = gql`
	mutation($name: String!, $email: String!, $password: String!) {
	   signup(name: $name, email: $email, password: $password) {
	     token
	   }
	 }
`;
export default graphql(signUpMutation)(SignUp);