import {makeStyles} from 'react-native-elements';
import { Mixin } from '../../helpers';

export default makeStyles(theme => ({
  container: {
    flex: 1,
    padding: Mixin.moderateSize(16),
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Mixin.moderateSize(10),
  },
  exploreSearchInput: {
    borderRadius: Mixin.moderateSize(30),
    alignSelf: 'center',
    justifyContent: 'center',
    height: Mixin.moderateSize(34),
    paddingHorizontal: Mixin.moderateSize(25),
    width: '70%',
    borderColor: theme.colors?.primary,
    borderWidth: 1,
    fontSize: Mixin.moderateSize(12),
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: '60%',
  },
  listStyle: {
    backgroundColor: '#F8FAFC',
    borderRadius: Mixin.moderateSize(5),
    paddingHorizontal: Mixin.moderateSize(10),
    marginVertical: Mixin.moderateSize(16),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: theme.colors?.white,
    padding: Mixin.moderateSize(5),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Mixin.moderateSize(10),
  },
  itemCode: {
    justifyContent: 'flex-end',
  },
  dateText: {
    fontSize: Mixin.moderateSize(12),
  },
  codeText: {
    fontSize: Mixin.moderateSize(14),
    fontWeight: '600',
  },
  idText: {
    fontSize: Mixin.moderateSize(12),
    fontWeight: '600',
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(36, 206, 133, 0.5)',
    height: Mixin.moderateSize(25),
    width: Mixin.moderateSize(110),
    borderRadius: Mixin.moderateSize(5),
  },
  statusHeader: {
    height: Mixin.moderateSize(25),
    width: Mixin.moderateSize(110),
    textAlign: 'center',
    fontSize: Mixin.moderateSize(14),
    fontWeight: '600',
  },
  codeHeader: {
    height: Mixin.moderateSize(25),
    width: Mixin.moderateSize(110),
    textAlign: 'center',
    fontSize: Mixin.moderateSize(14),
    fontWeight: '600',
  },
  addIcon: {
    width: Mixin.moderateSize(30),
    height: Mixin.moderateSize(30),
  },
}));
