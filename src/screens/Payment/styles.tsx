import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    flex: 1,
    padding: Mixin.moderateSize(16),
    width: "100%",
    height: "100%",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonContainer: {
    paddingHorizontal: Mixin.moderateSize(16),
    width: "100%",
    // position: 'absolute',
    marginBottom: Mixin.moderateSize(30),
    flexDirection: "row",
  },
  line: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 1,
    width: "100%",
  },
  flatListBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    borderTopColor: "rgba(0, 0, 0, 0.5)",
    borderTopWidth: 1,
    borderStyle: "dashed",
    marginTop: Mixin.moderateSize(16),
  },
  title: {
    alignSelf: "center",
    fontWeight: "bold",
  },
  subTitle: {
    alignSelf: "center",
    marginBottom: Mixin.moderateSize(16),
  },
  flatListHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "center",
  },
  flatListFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.5)",
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
  },
  rowOne: {
    flex: 2,
    marginVertical: Mixin.moderateSize(8),
  },
  rowTwo: {
    flex: 1,
    marginVertical: Mixin.moderateSize(8),
  },

  status: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: Mixin.moderateSize(8),
    borderStyle: "dashed",
  },
  paymentTitle: {
    fontWeight: "bold",
    marginTop: Mixin.moderateSize(16),
  },
  button: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  cancelBtn: {
    backgroundColor: theme.colors?.primary,
    paddingHorizontal: Mixin.moderateSize(16),
    paddingVertical: Mixin.moderateSize(8),
    borderRadius: Mixin.moderateSize(5),
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Mixin.moderateSize(16),
    marginStart: Mixin.moderateSize(16),
  },
  cancelText: {
    fontSize: Mixin.moderateSize(12),
    fontWeight: "700",
    color: "#081435",
  },
}));
