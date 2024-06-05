import {makeStyles} from 'react-native-elements';
import { Mixin } from '../../helpers';

export default makeStyles(theme => ({
  WarningBalanceContainer: {
    width: '100%',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    width: '95%',
    bottom: Mixin.moderateSize(24),
    borderRadius: Mixin.moderateSize(8),
  },
  avatar: {
    width: Mixin.moderateSize(100),
    height: Mixin.moderateSize(100),
    borderRadius: Mixin.moderateSize(50),
  },
  menuContainer: {
    marginTop: Mixin.moderateSize(16),
  },
  accountName: {
    fontSize: Mixin.moderateSize(20),
    fontWeight: 'bold',
    marginTop: Mixin.moderateSize(16),
    textAlign: 'center',
  },
  accountNumber: {
    fontSize: Mixin.moderateSize(16),
    fontWeight: '500',
    textAlign: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixin.moderateSize(24),
  },
  overlayStyles: {
    backgroundColor: theme?.colors?.primary,
  },
  dialogBody: {
    backgroundColor: theme?.colors?.white,
    alignItems: 'center',
    paddingTop: Mixin.moderateSize(16),
    paddingBottom: Mixin.moderateSize(32),
  }
}));
