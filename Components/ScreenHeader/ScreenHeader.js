import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faBell} from '@fortawesome/free-solid-svg-icons';

const ScreenHeader = ({fontIcon, title}) => {
  return (
    <>
      <View style={styles.topHeader}>
        <View style={styles.headerContainer}>
          {fontIcon ? (
            <FontAwesomeIcon
              icon={faFileAlt}
              style={styles.iconStyle}
              size={38}
            />
          ) : null}
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FontAwesomeIcon icon={faBell} style={styles.iconStyle} size={25} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    color: 'white',
    marginRight: 10,
  },
  text: {
    fontSize: 22,
    color: 'white',
  },
  topHeader: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ScreenHeader;
