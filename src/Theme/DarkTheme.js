const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"rgb(88,129,250)"
        },
        secondary:{
            main:"#5A20cb"
        }
    }
})