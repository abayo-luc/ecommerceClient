import React, { Component } from 'react';
import {Constants} from 'expo';

//graql things
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  FlatList
} from 'react-native';

// my import things
import Header from '../Components/Header'
import Spinner from '../Components/Spinner'
import SingleProduct from '../Components/SingleProduct'

const Products =({ data: {allProducts}, loading, history }) => {
  if (loading || !allProducts) {
      return (
        <View style={{
          flex: 1,
          justifyContent:'center',
          alignItems: 'center',}}>
          <Spinner color="#0000ff"/>
        </View>
      );
  }

  _renderItem = ({item}) => {
      return(
        <SingleProduct product={item}/>
      )
    }
  return (
    <View style={styles.container}>
    <Header headerText="Products"/>
    <Button onPress={() => history.push('/NewProduct')} title="New Product"/>
    <FlatList
      data={allProducts}
      keyExtractor={item => item.id}
      renderItem={this._renderItem}
    />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingTop: Constants.statusBarHeight
    },
});

const queryingAllProduct = gql`
  query {
    allProducts{
      id
      name
      price
      pictureUrl
    }
  }
`;

export default graphql(queryingAllProduct)(Products);