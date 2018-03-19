import React from 'react';

import {
	View,
	Text,
	StyleSheet,
	TextInput,
} from 'react-native';

const SimpleTextInput = (props) => {
	const {value, onChangeText, placeholder, secureTextEntry, autoCapitalize, error, keyboardType} = props;
	return (
	  <View style={styles.inputFieldWraper}>
	  	<TextInput placeholder={placeholder} style={styles.inputField} 
	  	underlineColorAndroid="transparent" 
	  	value={value}
	  	onChangeText={onChangeText}
	  	secureTextEntry={secureTextEntry}
	  	autoCapitalize={autoCapitalize}
	  	keyboardType={keyboardType}/>
	  	<Text style={styles.textError}>{error}</Text>
	  </View>
	);
}

const styles = StyleSheet.create({
	inputField:{
		borderBottomWidth: 1,
		borderBottomColor: '#000000',
		fontSize: 20,
	}, 
	inputFieldWraper:{
		paddingBottom: 10,
	},
	textError: {
	  color: '#d50000',
	  fontSize: 11,
	  alignSelf: 'center', 
	},
});

export default SimpleTextInput;