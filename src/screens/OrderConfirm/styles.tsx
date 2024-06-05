import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  container: {
    flex: 1,
    // backgroundColor: theme.colors?.white,
  },
  inputText: {
    fontSize: Mixin.moderateSize(12),
    // color: '#BDBDBD',
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: Mixin.moderateSize(16),
    ...Mixin.padding(8, 16, 8, 14),
    backgroundColor: '#F6F6F6',
    borderRadius: Mixin.moderateSize(8),
    height: Mixin.moderateSize(50),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: '100%',
    // position: 'absolute',
    // marginBottom: Mixin.moderateSize(30),
  },
}));
