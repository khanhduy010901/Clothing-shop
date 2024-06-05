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
  },
  itemContainerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: Mixin.moderateSize(10),
    paddingLeft: Mixin.moderateSize(15),
    backgroundColor: '#fff',
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
    width: Mixin.moderateSize(60),
    alignItems: 'center',
    marginTop: Mixin.moderateSize(3),
    borderRadius: Mixin.moderateSize(3),
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  actionText: {
    fontSize: Mixin.moderateSize(12),
  }, 
  bottomCotainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
    bottom: 30,
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
  },
  receiverContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: '100%',
    backgroundColor: theme.colors?.white,
    marginTop: Mixin.moderateSize(16),
    paddingVertical: Mixin.moderateSize(12),
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(36, 206, 133, 0.5)',
    height: Mixin.moderateSize(25),
    width: Mixin.moderateSize(110),
    borderRadius: Mixin.moderateSize(5),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: Mixin.moderateSize(6),
    paddingVertical: Mixin.moderateSize(12),
    marginBottom: Mixin.moderateSize(16),

  }
}));
