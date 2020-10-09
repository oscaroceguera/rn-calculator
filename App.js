import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';

import Row from './components/Row';
import Button from './components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
  },
});

const App = () => {
  const [currentValue, setCurrentValue] = useState('0')
  const [operator, setOperator] = useState(null)
  const [previousValue, setPreviousValue] = useState(null)
  
  const handleTap = (type, value) => () => {
    if (type === 'number') {
      setCurrentValue(state => {
        if (state === '0') {
          return `${value}`
        }
        return `${state}${value}`
      })
    }

    if (type === 'operator') {
      setOperator(value)
      setPreviousValue(currentValue)
      setCurrentValue('0')
    }

    if (type === 'equal') {
      const current = parseFloat(currentValue)
      const previous = parseFloat(previousValue)
      
      if (operator === '/') {
        setCurrentValue(previous / current)
        return resetValueAndOperator
      }
      if (operator === '*') {
        setCurrentValue(previous * current)
        return resetValueAndOperator
      }
      if (operator === '+') {
        setCurrentValue(previous + current)
        return resetValueAndOperator
      }
      if (operator === '-') {
        setCurrentValue(previous - current)
        return resetValueAndOperator
      }
    }

    if (type === 'clear') {
      setCurrentValue('0')
      return resetValueAndOperator
    }

    if (type === 'posneg') {
      return setCurrentValue(`${parseFloat(currentValue) * - 1}`)
    }

    if (type === 'percentage') {
      return setCurrentValue(`${parseFloat(currentValue) * 0.01}`)
    }
  }

  const resetValueAndOperator = () => {
    setOperator(null)
    setPreviousValue(null)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.value}>{parseFloat(currentValue).toLocaleString()}</Text>
        <Row>
          <Button text="C" theme='secondary' onPress={handleTap('clear')} />
          <Button text="+/-" theme='secondary' onPress={handleTap('posneg')} />
          <Button text="%" theme='secondary' onPress={handleTap('percentage')} />
          <Button text="/" theme='accent' onPress={handleTap('operator', '/')} />
        </Row>
        <Row>
          <Button text="7" onPress={handleTap('number', 7)} />
          <Button text="8" onPress={handleTap('number', 8)} />
          <Button text="9" onPress={handleTap('number', 9)} />
          <Button text="x" theme='accent' onPress={handleTap('operator', '*')} />
        </Row>
        <Row>
          <Button text="4" onPress={handleTap('number', 4)} />
          <Button text="5" onPress={handleTap('number', 5)} />
          <Button text="6" onPress={handleTap('number', 6)} />
          <Button text="-" theme='accent' onPress={handleTap('operator', '-')} />
        </Row>
        <Row>
          <Button text="1" onPress={handleTap('number', 1)} />
          <Button text="2" onPress={handleTap('number', 2)} />
          <Button text="3" onPress={handleTap('number', 3)} />
          <Button text="+" theme='accent' onPress={handleTap('operator', '+')} />
        </Row>
        <Row>
          <Button text="0" size="double" onPress={handleTap('number', 0)} />
          <Button text="." onPress={handleTap('number', '.')} />
          <Button text="=" theme='accent' onPress={handleTap('equal')} />
        </Row>
      </SafeAreaView>
    </View>
  );
}

export default App