import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';
import {device_height, device_width} from '../../helpers/Mixin';
import { Platform } from 'react-native';

export default makeStyles(theme => ({
  container: {
    width: '100%',
    bottom: Mixin.moderateSize(100),
    height: device_height + Mixin.moderateSize(20),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productCoverImage: {
    width: device_width,
    resizeMode: 'cover',
    height: device_width + 10,
  },
  icon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
    color: theme.colors?.primary,
  },
  productInfoContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    margin: 8,
  },
  textTitle: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    color: 'black',
    marginBottom: 5,
    flex: 1,
  },
  productPrice: {
    fontSize: Mixin.moderateSize(14),
    color: '#F28230',
  },
  productRatingContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingStart: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingEnd: 8,
    justifyContent: 'space-between',
  },
  iconRating: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  txtTitle: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: '500',
    color: 'black',
  },
  componentContainer_ver2: {
    backgroundColor: 'white',
    marginTop: 12,
    padding: 8,
  },
}));
