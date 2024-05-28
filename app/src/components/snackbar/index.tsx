import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface ISnackBarComponent{
    message: string
    show: boolean
    bg: string
    setStatus: (show:boolean) => void
}
const SnackBarComponent:React.FC<ISnackBarComponent> = (props) => {
    const { message, show, bg } = props
    const { setStatus } = props
    return (
        <Snackbar 
            open={show} 
            autoHideDuration={5000} 
            onClose={() => setStatus(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
        >
            <Alert
                onClose={() => setStatus(false)}
                variant="filled"
                sx={{ width: '100%', backgroundColor:bg }}
            >
                { message }
            </Alert>
        </Snackbar>
    )
}

export default SnackBarComponent;