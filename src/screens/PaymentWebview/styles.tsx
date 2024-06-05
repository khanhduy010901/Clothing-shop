import { makeStyles } from "react-native-elements";
import { Mixin } from "../../helpers";

export default makeStyles((theme) => ({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: Mixin.moderateSize(20),
  },
}));
