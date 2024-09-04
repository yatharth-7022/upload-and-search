import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";


const useStyles = makeStyles({
  root:{
    position:'fixed',
    top:0,
    left:0,
    display:(props) => props.display ? 'flex' : 'none',
    width:'100%',
    height:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    zIndex:2
  },

  bg:{
    position:'absolute',
    top:0,
    left:0,
    display:'block',
    width:'100%',
    height:'100%',
    backgroundColor:'#252525',
    opacity:0.8,
  },
  mainBox:{
    position:'absolute',
    top:'50%',
    left:'50%',
    width:300,
    height:200,
    background:'#ffffff',
    transform:'translateX(-50%) translateY(-50%)',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    boxShadow: "-1px -1px 10px -3px rgba(0,0,0,0.75) inset", 
    fontFamily:"'Roboto', sans-serif",
    "@media (max-width:300px)":{
      width:'100%'
    },
    '& label':{
      position:'relative',
      top:0,
      left:0,
      width:'100%',
      marginBottom:20,
      textAlign:'center'
    },
    '& input':{
      position:'relative',
      top:0,
      left:0,
      width:'60%',
      padding:'4%',
      marginBottom:20
    },
    '& p':{
      position:'relative',
      top:0,
      left:0,
      width:'100%',
      textAlign:'center',
      margin:0,
      padding:0,
      fontSize:'0.7rem',
      color:'red',
      marginBottom:10,
      display:(props) => props.valid ? 'none' : 'block'
    },
    '& button':{
      position:'relative',
      top:0,
      left:0,
      width:150,
      padding:'2%',
      border:'none',
      borderRadius:10,
      color:'#ffffff',
      backgroundColor:'#000000'
    }
  },


})

/**
 * This function returns a div element with form for user to type a username which will 
 * be used to store and display comments and likes linked with that username. It hides itself when 
 * the username is typed. 
 * @returns {HTMLDivElement} - a div element with form to submit user name or an empty div.
 */
export function UserName(){
  const [validUserName, setValidUserName] = useState(true)
  const [display,setDisplay] = useState(false);
  const classes = useStyles({valid:validUserName, display:display});
  const [username,setUserName] = useState('');
  
  
  useEffect(()=>{
    if(username.includes(' ')){
      validUserName && setValidUserName(false);
    } else{
      !validUserName && setValidUserName(true);
    }
  },[username]);

  useEffect(()=>{
    if(window.localStorage.getItem('username')){
      setDisplay(false);
    } else{
      setDisplay(true);
    }
  },[])

  function handleUserNameChange(e){
    e.preventDefault();
    if(validUserName){
      window.localStorage.setItem('username',e.target.username.value)
      setDisplay(false)
      window.location.href='/';
    }
  }

  return (
    display ?
    <div className={classes.root}>
      <div className={classes.bg}></div>
      <form onSubmit={(event)=>{handleUserNameChange(event)}} className={classes.mainBox}>
        <label htmlFor="username">Type a Username without Spaces:</label>
        <input id="username" name="username" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
        <p>Remove Spaces from UserName</p>
        <button type="submit">Submit</button>
      </form>
    </div> : <div></div>
  );
}