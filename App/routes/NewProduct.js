import React, { Component } from 'react';
import {Constants, ImagePicker} from 'expo';
import { Entypo, Ionicons} from '@expo/vector-icons';

// dabase things
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import { ReactNativeFile } from 'apollo-upload-client';

import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';

// my imported components
import SimpleTextInput from '../Components/SimpleTextInput';
import Header from '../Components/Header';
import {TOKEN_KEY }from '../Components/MyConstants'

const initialState = {
      values: {
        name: '',
        pictureUrl: '',
        price: '',
        description: '',
      },
      isSubmitting: false,
    };

class NewProduct extends Component {
  constructor(props) {
    super(props);
  
    this.state = initialState;
  }

  handleTextInput = (key, input) => {
   this.setState(state => ({
    values:{
      ...state.values,
      [key]: input,
    }
   }))
  }


  _pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
       allowsEditing: true,
       aspect: [4, 3],
     });

     console.log(result);

     if (!result.cancelled) {
       this.handleTextInput('pictureUrl', result.uri );
     }
   };


  saveProduct = async () => {
    if (this.state.isSubmitting) {
      return;
    }
    this.setState({isSubmitting: true})
    const { pictureUrl, name, price, description } = this.state.values;

    const picture = new ReactNativeFile({
          uri: pictureUrl,
          type: 'image/png',
          name: 'i-am-a-name',
    });
    let response;
    response = await this.props.mutate({
      variables:{
       picture,
       name,
       price,
       description,
      }
    })
    // this.setState(initialState)
    // console.log(this.props)
    this.props.history.push('/Products');
  }

  render() {
    const {pictureUrl, price, description, name} = this.state.values;
    return (
      <View style={styles.container}>
        <Header headerText="New Product"/>
        <View style={styles.wraper}>
          <View>
          <KeyboardAvoidingView  style={styles.formContainer}>
            <SimpleTextInput value={name} onChangeText ={input => this.handleTextInput('name', input)} 
                        placeholder="name" style={styles.textInput}/>

            <SimpleTextInput values={price} onChangeText={input => this.handleTextInput('price', input)}
            placeholder="$49" keyboardType="numeric"/>
            <SimpleTextInput value={description} onChangeText={input => this.handleTextInput('description', input)} 
            placeholder="Description"/>
          </KeyboardAvoidingView>
          <View style={styles.selectedImage}>
            {pictureUrl ? <Image source={{ uri: pictureUrl }} style={{ width: 200, height: 200, padding: 5}} /> : null}
            <TouchableOpacity onPress={this._pickImage} style={styles.uploadButon}>
              <Entypo name="attachment" size={32} color="green" style={{alignSelf:  'center',}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonStyle}>
            <Button title="Save" onPress={this.saveProduct} color="#841584" disabled={this.state.isSubmitting}/>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
    flex:1,
	},
  wraper:{
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
      backgroundColor: '#00cbcc',
      borderRadius: 10,
      paddingTop: 5,
      paddingBottom: 32,
      elevation: 1,
      paddingHorizontal: 5,
  },
  buttonStyle:{
    paddingTop: 10,
  },
  selectedImage:{
    paddingTop: 20,
    alignItems: 'center',
  },
  uploadButon:{
    padding: 5,
    width: 200,
    backgroundColor: '#00cbcc',
    borderRadius: 5,
  }
});

const createProductMutation = gql`
  mutation($name: String!, $picture: Upload!, $price: Float!, $description: String){
      createProduct(name: $name, picture:$picture, price: $price,
      description: $description){
        id
      }
  } 
`;
export default graphql(createProductMutation)(NewProduct);