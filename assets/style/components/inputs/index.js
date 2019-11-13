import { StyleSheet } from "react-native"
import { color, font, marpad, dimensions } from "../../base"

const baseInptStyle = {
    backgroundColor: color.input,
    borderRadius: 4,
    padding: marpad.md,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: color.inputBorder,
    fontSize: font.md,
    fontFamily: font.reg,
}

//Touchable Opacity Button 11/12/2019 SD
export const txtInput = StyleSheet.create({
    input: {
        ...baseInptStyle,
    },
    fullWidthInput:{
        ...baseInptStyle,
        width:"90%"
    },
    fullWidthInputMarginBottom:{
        ...baseInptStyle,
        width:"90%",
        marginBottom:marpad.xl,
    },

})
