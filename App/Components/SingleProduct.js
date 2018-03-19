import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';

import CardSection from './CardSection'
import Card from './Card'
import {IP_ADRESS} from 'react-native-dotenv'

const SingleProduct =({product}) => {
	const {name, pictureUrl, price, id} = product;
	handleBuyNow = () => {
		console.log('but item pressed')
	}
	const {thumbnailContainer, headerContent, headerText, imageStyle} = styles
	return (
	  <Card>
	    <CardSection>
	      <View style={headerContent}>
	        <Text style={headerText}>{name}</Text>
	      </View>
	    </CardSection>

	    <CardSection>
	      <Image source={{uri: `http://${IP_ADRESS}:4000/${pictureUrl}`}} style={imageStyle}/>
	    </CardSection>

	    <CardSection>
	      <View style={styles.footerStyle}>
	        <Button onPress={this.handleBuyNow} title="Buy Now"/>
	        <Text style={styles.priceText}>${price}</Text>
	      </View>
	    </CardSection>
	  </Card>
	);
}

const styles = StyleSheet.create({
	headerContent: {
	  flex: 1,
	  flexDirection: 'column',
	  alignItems: 'center'
	},
	headerText:{
	  fontSize: 20,
	},
	thumbnail: {
	  height: 50,
	  width: 50,
	}, 
	thumbnailContainer:{
	  justifyContent: 'center',
	  alignItems: 'center', 
	  marginTop: 10,
	  marginBottom: 10,
	},
	imageStyle:{
	  height: 300,
	  flex: 1,
	  width: null,
	},
	footerStyle:{
	  flex: 1,
	  flexDirection: 'row',
	  justifyContent: 'space-between'
	},
	priceText:{
	  justifyContent: 'flex-end', 
	}
});


export default SingleProduct;