import React, { Component } from 'react';
// expo things 
import {Constants, LinearGradient} from 'expo';
// apollo things
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

// react-native component
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';


//my imported component
import SimpleTextInput from '../Components/SimpleTextInput';
import Spinner from '../Components/Spinner';
import {TOKEN_KEY }from '../Components/MyConstants'
const initialState = {
	credentails: {
		email: '',
		password: '',
	},
	isSubmitting: false,
	errors: {
		email:'',
		password:''
	},
}
class Login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = initialState;
	}
	handleInput = (key, value) => {
		this.setState(state => ({
			credentails:{
				...state.credentails,
				[key]: value,
			}
		}))
	}

	handleLogin = async () => {
		this.setState({errors:{email:'', password:''}})
		if (this.state.isSubmitting) {
			return;
		}
		this.setState({isSubmitting: true})

		const response = await this.props.mutate({
				variables: this.state.credentails,
		});

		const {payLoad,error} = response.data.login;

		if (payLoad) {
			console.log(payLoad.token)
			await AsyncStorage.setItem(TOKEN_KEY, payLoad.token)
			this.props.history.push('/Products')
		} else {
			this.setState({
				errors: {
					[error.field]: error.msg
				},
				isSubmitting: false
			})
		}
	}

	goToSingU = () => {
		this.props.history.push('/SignUp')
	}
  render() {
  	const {credentails: {email, password}, errors} = this.state;
    return (
     	<LinearGradient colors={['#00cbcc', '#e0f2f1', '#00e5ff']} style={{flex:1, justifyContent: 'center',display: 'flex'}} >
 	      <KeyboardAvoidingView  style={{flex:1, justifyContent: 'center'}}>
 	      	<View style={styles.formContainer}>
 	      		<View style={{paddingBottom: 20}}>
	               <SimpleTextInput placeholder="Email"
	               autoCapitalize="none"
	               onChangeText={text => this.handleInput('email', text)}
	               value={email}
	               error={errors.email}/>
	               <SimpleTextInput placeholder="Password"
	               secureTextEntry={true}
	               autoCapitalize="none"
	               onChangeText={text => this.handleInput('password', text)}
	               value={password}
	               error={errors.password}/>
 	      		</View>
 	      		<TouchableOpacity onPress={this.handleLogin}>
 		      		<LinearGradient colors={['#ff8f00','#ffc046','#ff8f00']} style={styles.button}>
 			      		{this.state.isSubmitting ? <Spinner/> : <Text style={styles.buttonText}>Save</Text>}
 		      		</LinearGradient>
 	      		</TouchableOpacity>
 	      	</View>
         </KeyboardAvoidingView>
         <View style={styles.footer}>
           <Text>or</Text>
           <TouchableOpacity onPress={this.goToSingU}>
             <Text style={styles.loginText}>SignUp</Text>
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
	  paddingBottom: 20,
	  alignItems: 'center',
	},
	loginText:{
	  padding: 20,
	  color: '#fff',
	  fontSize: 25,
	}
});

const loginMutation = gql`
	mutation($email: String!, $password: String!){
	  login(email: $email, password: $password){
		   payLoad{
			   token
		   }
		   error{
		   		field
		        msg
		   }
	  }
	}
`;

export default graphql(loginMutation)(Login);