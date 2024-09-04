import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { PostAPI } from "../../requests/api";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:(props) => props.display ? '80px' : '0',
    display:'flex',
    overflow:'hidden',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    transition:'all 0.25s ease-in',
    borderBottom:(props) => props.display ? '1px solid black' : 'none',
    paddingBottom:(props) => props.display ? 20 : '0',
    marginTop:(props) => props.display ? 20 : '0',
    '& textarea':{
      position:'relative',
      top:0,
      left:0,
      width:'80%',
      height:50,
      borderRadius:'15px',
      border:'1px solid #000000',
      padding:'10px 5px 10px 10px',
      resize:'none'
    },
  },
  Img:{
    position:'relative',
    top:0,
    left:0,
    width:'6%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:'0 3% 0 3%',
    padding:0,
    border:'none',
    backgroundColor:'#ffffff',
    cursor:'pointer',
    '&:after':{
      width:'100%',
      paddingTop:'100%',
      display:'block',
      content:"''"
    },
    "& img":{
      width:'80%',
      height:'80%',
      position:'absolute',
      top:'50%',
      left:'50%',
      transform:'translateX(-50%) translateY(-50%)'
    },
    "@media (max-width:500px)":{
      width:'15%'
    },
    "@media (max-width:320px)":{
      width:'15%'
    }
  }
})

/**
 * This function returns a form Element which takes user input and sends an API call to backend 
 * to add that comment.
 * @param {Object} props 
 * @returns {HTMLFormElement} - a form element to take comment input and send the comment.
 */
export function UserComment(props){
  const classes = useStyles({display:props.display});
  const UserName = window.localStorage.getItem('username')
  const [value, setvalue] = useState();

  async function handleCommentSubmit(event){
    event.preventDefault();
    let date = new Date();
    let commentId = `${UserName}${date.getTime()}`;

    try{
      // send an api request to add the comment
      await PostAPI(`http://localhost:8000/posts/comment/${props.id}`,{username:UserName,comment:value,commentId:commentId});
      // increse comment count and add comment to a new user array so it can be displayed instantly
      // giving a smooth user experience.
      props.setCommentCount(parseInt(props.commentCount)+1);
      props.setUserComments([...props.userComments, {username:UserName,comment:value,commentId:commentId}])
      setvalue('');
    } catch(err){
      console.log(err);
    }

  }
  
  return(
    <form onSubmit={handleCommentSubmit} className={classes.root}>
      <div className={classes.Img}>
        <Avatar sx={{ bgcolor: '#000000',width:'100%',height:'100%',position:'absolute' }}>{UserName[0].toUpperCase()}</Avatar>
      </div> 
      <textarea placeholder="Type a Comment" value={value} onChange={(event) => setvalue(event.target.value)} name='comment' ></textarea>
      <button type="submit" className={classes.Img}>
        <img src='./commentSend.png' alt="Comment send icon" />
      </button>
    </form>
  )
}