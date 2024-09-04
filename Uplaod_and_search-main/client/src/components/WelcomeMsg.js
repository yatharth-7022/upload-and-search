import { makeStyles } from "@material-ui/styles";
import Avatar from "@mui/material/Avatar";


const useStyles = makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:500,
    maxWidth:500,
    borderRadius:15,
    // border:'1px solid #000000',
    marginTop:40,
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:'10px 0 15px 0',
    backgroundColor:'#ffffff',
    zIndex:1,
    boxShadow: '0px 0px 8px -3px rgba(0,0,0,0.75) inset',
    '@media (max-width:500px)':{
      width:'100%'
    },
    '& h2':{
      position:'relative',
      top:0,
      left:0,
      fontFamily:"'Sahitya', serif",
      fontWeight:10,
      fontSize:'1.9rem',
      margin:0,
    },
    '& h3':{
      position:'relative',
      top:0,
      left:0,
      margin:0,
      padding:0,
      fontSize:'1.3rem',
      fontFamily:'Roboto'
    },
    '& p':{
      position:'relative',
      top:0,
      left:0,
      padding:0,
      fontSize:'1.1rem',
      fontFamily:'Roboto',
      textAlign:'center'
    },
    '& button':{
      position:'relative',
      top:0,
      left:0,
      width:100,
      padding:'1%',
      backgroundColor:"#000000",
      color:'#ffffff',
      border:'none',
      borderRadius:5
    }
  }
})

/**
 * 
 * @returns {HTMLDivElement} - a simple welcome message div
 */
export function WelcomeMsg(){
  const UserName = window.localStorage.getItem('username');
  const classes = useStyles();

  function handleSignout(){
    window.localStorage.removeItem('username');
    window.location.href='/';
  }
  return (
    UserName ?
    <div className={classes.root}>
      <h2>Welcome </h2>
      <Avatar sx={{ bgcolor: '#000000',width:50,height:50 }}>{UserName[0].toUpperCase()}</Avatar>
      <h3>{UserName}</h3>
      <p> feel free to scroll, like, unlike , comment or delete comment . </p>
      <button onClick={handleSignout}>Sign Out</button>
    </div> : <div></div>
  )
}