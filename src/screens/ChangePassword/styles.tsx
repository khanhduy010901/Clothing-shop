import {makeStyles} from 'react-native-elements';
import {Mixin} from '../../helpers';

export default makeStyles(theme => ({
  buttonContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: '100%',
    // position: 'absolute',
    // marginBottom: Mixin.moderateSize(30),
  },
  inputText: {
    fontSize: Mixin.moderateSize(12),
    // color: '#BDBDBD',
    fontWeight: '400',
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    padding: Mixin.moderateSize(16),
    marginTop: Mixin.moderateSize(16),
  },
  viewContainer: {
    height: '100%',
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
  dropdownStyle: {
    backgroundColor: '#F6F6F6',
    borderWidth: 0,
    borderRadius: Mixin.moderateSize(5),
    marginBottom: Mixin.moderateSize(16),
    height: Mixin.moderateSize(50),
  },
  labelText: {
    fontSize: Mixin.moderateSize(12),
    fontWeight: '400',
    marginBottom: Mixin.moderateSize(8),
    flex: 1,
    margin: 0,
  },
  valueText: {
    fontSize: Mixin.moderateSize(12),
    fontWeight: '400',
    marginBottom: Mixin.moderateSize(8),
    margin: 0,
  },
  disableInput: {
    backgroundColor: 'rgba(255, 115, 0, 0.2)',
  },
}));
