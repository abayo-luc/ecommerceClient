import React, { Component } from 'react';


// graphql things
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'


import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';

import Spinner from '../Components/Spinner'
import {TOKEN_KEY }from '../Components/MyConstants'
class CheckToken extends Component {
	componentDidMount= async () =>{
		const token = await AsyncStorage.getItem(TOKEN_KEY)	
		if (!token) {
			this.props.history.push('/SignUp')
			return
		}

		let response;
		try{
			response = await this.props.mutate({
				variables:{
					token,
				}
			})
		}
		catch(error){
			this.props.history.push('/SignUp')
			return;
		}

		const {refreshToken} =response.data;
		await AsyncStorage.setItem(TOKEN_KEY, refreshToken)
		this.props.history.push('/Products')
	}

  render() {
    return (
    <View style={styles.container}>
      <Spinner color="#0000ff"/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent:'center',
		alignItems: 'center',
	}
});

const refreshTokenMutation = gql`
	mutation($token:String!){
	 	refreshToken(token:$token)
	}
`;

export default graphql(refreshTokenMutation)(CheckToken);