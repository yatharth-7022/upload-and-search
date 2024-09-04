import { makeStyles } from "@material-ui/styles";
import Avatar from "@mui/material/Avatar";
import { PostAPI } from "../../requests/api";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    height:(props) => props.display ? 'auto' : '0',
    display:'flex',
    overflow:'hidden',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    transition:'all 0.25s ease-in',
    borderBottom:(props) => props.display ? '1px solid black' : 'none',
    paddingBottom:(props) => props.display ? 20 : '0',
    paddingTop:(props) => props.display ? 20 : '0',
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
  },
  commentCont:{
    position:'relative',
    top:0,
    left:0,
    width:'80%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    '& p':{
      position:'relative',
      top:0,
      left:0,
      width:'100%',
      margin:0,
      padding:0
    }
  },
  username:{
    fontWeight:'bold',
    marginBottom:'8px !important'
  }
})

/**
 * This function returns a reuseable single comment display div with features to 
 * delete itself when delete button is clicked. 
 * @param {Object} props
 * @returns {HTMLDivElement} - a single comment div. 
 */
export function Comment(props){
  const classes = useStyles({display:props.display});
  const UserName = window.localStorage.getItem('username')
  async function handleCommentDelete(){
    let found = false;
    try{
      // send an api call to delete the comment.
      await PostAPI(
        `http://localhost:8000/posts/uncomment/${props.id}`,
        {username:UserName,commentId:props.comment.commentId}
      );
      // reduce comment count to give a instant delete experience
      props.setCommentCount(parseInt(props.commentCount)-1);
      if(!found){
        // remove the comment from global comments array for instant delete experience
        // this function removes the comment from fetched comments array that is fetched from the server
        // when a post loads up.
        props.setFetchedComments(props.fetchedComments.filter((comment)=>{
          if(comment.commentId === props.comment.commentId){
            found = true
            return false;
            
          } else{
            return true;
          }
        }));
      }
      if(!found){
        // remove the comment from global comments array for instant delete experience
        // this function removes the comment from user comments array that is an array containing
        // comments that user did after fetching the data from the server.
        props.setUserComments(
          props.userComments.filter((comment) => {
            if (comment.commentId === props.comment.commentId) {
              found = true;
              return false;
            } else {
              return true;
            }
          })
        );
      }
    } catch(err){
      console.log(err);
    }
    
  }
  
  return(
    <div className={classes.root}>
      <div className={classes.Img}>
        <Avatar sx={{ bgcolor: '#000000',width:'100%',height:'100%',position:'absolute' }}>{UserName[0].toUpperCase()}</Avatar>
      </div> 
      <div className={classes.commentCont}>
        <p className={classes.username}>{UserName}</p>
        <p>{props.comment.comment}</p>
      </div>
      <button onClick={handleCommentDelete} type="submit" className={classes.Img}>
        <img src='./delete.png' alt='Delete Icon'/>
      </button>
    </div>
  )
}