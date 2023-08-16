import {Button, Grid, Modal, Typography} from "@mui/material";

const style = {

    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
function ConfirmModal(props: {message:any, onCancel:any, onDelete:any}) {

    return (

        <Modal
            open={true}
            onClose={props.onCancel}
            aria-labelledby="modalTitle"
        >
            <Grid sx={style} container direction={"column"} rowSpacing={3}>
                <Grid item>
                    <Typography id="modalTitle" variant="h6" component="h2">
                        {props.message}
                    </Typography>
                </Grid>
                <Grid container item justifyContent={"space-between"} direction={"row"}>
                    <Grid item>
                        <Button size="large" variant="contained" color="secondary" onClick={props.onCancel}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button size="large" variant="contained" color="error" onClick={props.onDelete}>Delete</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>

    );
}
export default ConfirmModal