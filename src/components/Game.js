import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import PropTypes from 'prop-types'
import Answer from './Answer';

export default function Game({ randomNumberCount, initialTimer, reset }) {

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [randomNumbers, setRandomNumbers] = useState([]);
    const [target, setTarget] = useState(0);
    const [timer, setTimer] = useState(initialTimer);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    if (target === 0) {
        let arr = Array.from({ length: randomNumberCount }).map(() => 1 + Math.floor(10 * Math.random()));

        let t = 0;
        arr.slice(0, (randomNumberCount - 2)).map((val) => t += val);
        setTarget(t);

        arr = shuffle(arr);
        setRandomNumbers(arr);
    }

    const isSelected = (numberIndex) => {
        if (selectedNumbers.includes(numberIndex)) return true;
        return false;
    }

    const selectNumber = (numberIndex) => {
        if (currentStatus === "PLAYING" && timer > 0)
            setSelectedNumbers(selectedNumbers => [...selectedNumbers, numberIndex]);
    }

    const gameStatus = (status) => {
        if (status === "LOST") return "LOST";
        let sum = 0;
        selectedNumbers.map((i) => sum += randomNumbers[i]);
        if (sum === target) return "WON";
        else if (sum < target) return "PLAYING";
        else return "LOST";
    }


    useEffect(() => {
        if (timer !== 0 && currentStatus === "PLAYING") {
            setTimeout(() => {
                setTimer(timer => timer - 1);
            }, 1000);
        }
    }, [timer])



    let currentStatus = timer > 0 ? gameStatus() : "LOST";

    return (
        <View style={styles.container}>
            <Text style={styles.timer}>{timer}</Text>
            <Text style={styles.targetSum}>{target}</Text>
            <View style={styles.answerContainer}>
                {randomNumbers.map((number, index) => <Answer key={index} number={number} isSelected={isSelected} selectNumber={selectNumber} id={index} isDisabled={isSelected(index) || currentStatus !== "PLAYING" || timer === 0} />)}
            </View>
            <View style={[styles.statusContainer, (currentStatus === "WON") ? styles.won : ((currentStatus === "PLAYING") ? styles.playing : styles.lost)]}>
                <Text style={[styles.status, (currentStatus === "WON") ? styles.won : ((currentStatus === "PLAYING") ? styles.playing : styles.lost)]}>{currentStatus}</Text>
            </View>
            {currentStatus !== "PLAYING" && <Button title='Play Again' onPress={reset} />}
        </View>
    )
}

Game.propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialTimer: PropTypes.number.isRequired,
    reset: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    timer: {
        marginRight: 5,
        marginLeft: "auto",
        backgroundColor: '#ddd',
        padding: 2,
        borderRadius: 50,
        padding: 5,
        fontWeight: "900"
    },
    targetSum: {
        margin: 40,
        fontSize: 50,
        marginHorizontal: 50,
        backgroundColor: "#000",
        color: "#fff",
        textAlign: "center",
        fontWeight: "600"
    },
    answerContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        height: "100%",
        flexShrink: 1
    },
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
    statusContainer: {
        width: "100%"
    },
    status: {
        textAlign: "center",
        fontSize: 30,
        paddingVertical: 10
    },
    won: {
        backgroundColor: "green",
        color: "white"
    },
    lost: {
        backgroundColor: "red",
        color: "white"
    },
    playing: {
        backgroundColor: "yellow"
    }
})