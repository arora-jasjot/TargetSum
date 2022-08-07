import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

export default function Answer({ number, id, isSelected, selectNumber, isDisabled }) {
    const numberPressed = () => {
        selectNumber(id);
    }
    return (
        <TouchableOpacity disabled={isDisabled} onPress={!isDisabled && numberPressed}>
            <Text style={[styles.answer, isSelected(id) && styles.selected]}>{number}</Text>
        </TouchableOpacity>
    )
}
Answer.propTypes = {
    number: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isSelected: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    selectNumber: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    answer: {
        width: 100,
        textAlign: "center",
        margin: 20,
        backgroundColor: "#ddd",
        fontSize: 30,
        paddingHorizontal: 5,
        paddingVertical: 3,
        fontWeight: '800'
    },
    selected: {
        opacity: 0.5,
        backgroundColor: "green"
    }
})