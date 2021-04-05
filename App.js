import 'react-native-gesture-handler';
import React, {useState, useContext} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';

//importar state de context
import RouteState from './context/RouteState';
import Navigation from './Navigation';

const App = () => {
  return (
    <>
      <RouteState>
        <Navigation />
      </RouteState>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
