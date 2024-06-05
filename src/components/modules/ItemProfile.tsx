import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Mixin} from '../../helpers';
import { theme } from '../../utils/styles/theme';

interface ItemProfileProps {
  icon: any;
  title?: string;
  onPress?: () => void;
  enableSwitch?: boolean;
  enabled?: boolean;
  onChangeSwitch?: (value: boolean) => void;
}
const ItemProfile = (props: ItemProfileProps) => {
  const {icon, title, onPress, enableSwitch} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        resizeMode={'contain'}
        style={{width: 20, height: 20, tintColor: theme.colors?.primary}}
        source={icon}
      />
      <View style={styles.contentRight}>
        <View style={{width: '80%'}}>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        <Icon style={styles.ic} name="chevron-right" size={28} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    alignItems: 'center',
    height: Mixin.moderateSize(56),
    backgroundColor: '#fff',
  },
  ic: {
    marginRight: Mixin.moderateSize(12),
  },
  textTitle: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: '400',
    color: '#000',
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: Mixin.moderateSize(12),
    borderBottomWidth: 1,
    height: '100%',
    borderColor: '#EEF0F4',
  },
});

export default ItemProfile;
