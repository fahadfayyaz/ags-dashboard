// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));



// export default function AddJobsForms(props) {
//     const classes = useStyles();
//     return (
//         <div className='container animate__backInUp' style={{width:'30%'}} >
//             <img alt='close' src="https://p7.hiclipart.com/preview/379/46/457/computer-icons-clip-art-cancel-button.jpg" 
//             style={{float:'right' , height:"20px", width:'20px',}} onClick={props.closeForm} />
//             <form style={{display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center', margin:'10%'}} className={classes.root} >
//             <br />
//             <TextField id="standard-basic" label="Position" />
//             <br />
//             <TextField id="standard-basic" label="Type" />
//             <br />
//             <TextField id="standard-basic" label="Location" />
            
//             <br />
//                 <button className='primary' > Submit </button>
//             </form>
//         </div>
//     )
// }
