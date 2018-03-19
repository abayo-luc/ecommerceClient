import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const Header = (props) => {
	const {viewStyle, textStyle} = styles;
	return(
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>

	)
}



Header.propTypes = {
  headerText: PropTypes.string,
}


const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: '#F8F8F8',
		alignItems: 'center',
		justifyContent: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0,height: 20,},
		shadowOpacity: 0.5,
		elevation: 2,
		position:'relative',

	},
	textStyle: {
		fontSize: 20,
	}
})
export default Header;