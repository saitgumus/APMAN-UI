// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Snackbar from "@material-ui/core/Snackbar";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";
// //import { CommonTypes } from "../Types/Common";
// import { connect } from "react-redux";
//
// const useStyles = makeStyles((theme) => ({
//   close: {
//     padding: theme.spacing(0.5),
//   },
// }));
//
// function ShowDialogMessage(props) {
//   const [snackPack, setSnackPack] = React.useState([]);
//   const [open, setOpen] = React.useState(false);
//   const [messageInfo, setMessageInfo] = React.useState(undefined);
//
//   React.useEffect(() => {
//     if (snackPack.length && !messageInfo) {
//       // Set a new snack when we don't have an active one
//       setMessageInfo({ ...snackPack[0] });
//       setSnackPack((prev) => prev.slice(1));
//       setOpen(true);
//     } else if (snackPack.length && messageInfo && open) {
//       // Close an active snack when a new one is added
//       setOpen(false);
//     }
//   }, [snackPack, messageInfo, open]);
//
//   const handleClick = (message) => () => {
//     setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
//   };
//
//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };
//
//   const handleExited = () => {
//     setMessageInfo(undefined);
//   };
//
//   const classes = useStyles();
//   return (
//     <div>
//       <Button onClick={handleClick("Message A")}>Show message A</Button>
//       <Snackbar
//         key={messageInfo ? messageInfo.key : undefined}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         open={open}
//         autoHideDuration={5000}
//         onClose={handleClose}
//         onExited={handleExited}
//         message={messageInfo ? messageInfo.message : undefined}
//         action={
//           <React.Fragment>
//             <Button color="secondary" size="small" onClick={handleClose}>
//               UNDO
//             </Button>
//             <IconButton
//               aria-label="close"
//               color="inherit"
//               className={classes.close}
//               onClick={handleClose}
//             >
//               <CloseIcon />
//             </IconButton>
//           </React.Fragment>
//         }
//       />
//     </div>
//   );
// }
//
// function mapStateToProps(state) {
//   return {
//     messageObject: state.showMessageReducer,
//   };
// }
//
// export default connect(mapStateToProps)(ShowDialogMessage);
