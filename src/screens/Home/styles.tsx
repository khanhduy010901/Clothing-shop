import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    backgroundColor: theme.colors?.backgroundItem,
    paddingHorizontal: Mixin.moderateSize(16),
    height: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Mixin.moderateSize(22),
    marginBottom: Mixin.moderateSize(16),
  },
  categoryImage: {
    width: Mixin.moderateSize(45),
    height: Mixin.moderateSize(45),
    borderRadius: Mixin.moderateSize(8),
  },
  productImage: {
    width: Mixin.moderateSize(280),
    height: Mixin.moderateSize(145),
    borderRadius: Mixin.moderateSize(8),
    marginBottom: Mixin.moderateSize(8),
  },
  topic: {
    fontSize: Mixin.moderateSize(18),
    marginVertical: Mixin.moderateSize(24),
  },
  starImage: {
    width: Mixin.moderateSize(12),
    height: Mixin.moderateSize(12),
  },

  itemContainer: {
    marginEnd: Mixin.moderateSize(24),
    alignItems: 'center',
  },
  userIcon: {
    width: Mixin.moderateSize(18),
    height: Mixin.moderateSize(18),
  },
  productItem: {
    borderRadius: Mixin.moderateSize(8),
    padding: Mixin.moderateSize(8),
    backgroundColor: theme.colors?.white,
    // height: Mixin.moderateSize(220),
    marginEnd: Mixin.moderateSize(16),

  },
  productName: {
    fontSize: Mixin.moderateSize(16),
    color: theme.colors?.primary
  },
  productPrice: {
    fontSize: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(8),
  },
  categoryListContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  columnWrapperStyle: {
    marginTop: Mixin.moderateSize(16),
  },
  tabviewIndicator: {
    backgroundColor: theme.colors?.primary,
    borderRadius: Mixin.moderateSize(7),
    height: Mixin.moderateSize(36),
  },
  tabviewContainer: {
    borderRadius: Mixin.moderateSize(7),
    backgroundColor: '#DADADA',
    height: Mixin.moderateSize(36),
    marginVertical: Mixin.moderateSize(16),
  },
  categoryText: {
    color: '#979696',
    marginTop: Mixin.moderateSize(8),
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
}));
