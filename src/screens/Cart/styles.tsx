import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    flex: 1,
    // backgroundColor: theme.colors?.white,
  },
  listContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: '100%',
    backgroundColor: theme.colors?.white,
    // flex: 1
  },
  itemContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: Mixin.moderateSize(10),
    paddingLeft: Mixin.moderateSize(15),
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageStyle: {
    width: Mixin.moderateSize(50),
    height: Mixin.moderateSize(50),
    marginRight: Mixin.moderateSize(20),
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: Mixin.moderateSize(80),
    alignItems: 'center',
    marginTop: Mixin.moderateSize(3),
    borderRadius: Mixin.moderateSize(3),
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginEnd: Mixin.moderateSize(10),
  },
  actionText: {
    fontSize: Mixin.moderateSize(12),
  }, 
  bottomCotainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
    bottom: 70,
    position: 'absolute',
    width: '100%',
    padding: Mixin.moderateSize(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalStyle: {
    fontSize: Mixin.moderateSize(16),
  },
  bottomIcon : {
    marginEnd: Mixin.moderateSize(10),
  }
}));
