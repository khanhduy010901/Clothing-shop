import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: '100%',
    backgroundColor: theme.colors?.backgroundItem,
  },
  icon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
  },
  filterIcon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
    marginVertical: Mixin.moderateSize(8),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productItem: {
    borderRadius: Mixin.moderateSize(8),
    padding: Mixin.moderateSize(8),
    backgroundColor: theme.colors?.white,
    marginTop: Mixin.moderateSize(16),
  },
  productImage: {
    height: Mixin.moderateSize(100),
    width: Mixin.moderateSize(145),
    borderRadius: Mixin.moderateSize(8),
  },
  productName: {
    fontSize: Mixin.moderateSize(14),
    marginTop: Mixin.moderateSize(8),
    marginBottom: Mixin.moderateSize(2),
  },
  productPrice: {
    fontSize: Mixin.moderateSize(12),
    color: theme.colors?.primary,
  },
  cartIcon: {
    width: Mixin.moderateSize(12),
    height: Mixin.moderateSize(12),
    tintColor: theme.colors?.primary,
  },
  title: {
    fontSize: Mixin.moderateSize(18),
  },
  favoriteContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    padding: Mixin.moderateSize(3),
    elevation: 10,
    backgroundColor: theme.colors?.white,
    borderRadius: Mixin.moderateSize(50),
    zIndex: 1,
    top: Mixin.moderateSize(12),
    right: Mixin.moderateSize(12),
  },
  flatlistContainer: {
    marginBottom: Mixin.moderateSize(100),
  }
}));
