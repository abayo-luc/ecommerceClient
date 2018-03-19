import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';


const CardSection = (props) => {
	return(
		<View style={styles.container}>{props.children}</View>
	)
}

const styles = StyleSheet.create({
	container:{
		borderBottomWidth: 1,
		padding: 5,
		backgroundColor: '#fff',
		flexDirection: 'row',
		borderColor: '#ddd',
		position: 'relative',
	}
})

CardSection.propTypes = {
  children: PropTypes.any,
}

export default CardSection;