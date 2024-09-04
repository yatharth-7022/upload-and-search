import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { CommentButton } from "./CommentButton";
import { LikeButton } from "./LikeButton";
import { UserComment } from "./UserComment";
import { Comments } from "./Comments";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  btns:{
    position:"relative",
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    borderBottom: (props) => props.display ? '1px solid #000000' : 'none'
  },
  CommentSection:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start'
  }
})

/**
 * This function combines like button, comment button  comments display elements into one single data
 * Element which can be added any post after sending the data via props. 
 * @param {Object} props 
 * @returns {HTMLDivElement} - A div Element containing like button, comment buttons and comments display div
 */
export function DataDisplay(props){
  const [liked, setLiked] = useState(false);
  const [display , setDisplay] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [commentCount , setCommentCount]  = useState(props.data.comments.length);
  const [commentDislayNo , setCommentDislayNo] = useState(0);
  const [fetchedComments,setFetchedComments] = useState(props.data.comments)
  const username = window.localStorage.getItem('username');
  const classes = useStyles({display});
  // loops through the liked user list and checks if the user
  // has liked the post and changes liked state accordingly. 
  useEffect(()=>{
    props.data.likes.forEach((like) =>{
      if(like === username){
        setLiked(true);
        setDisplay(true);
      }
    })
  },[])


  return(
    <div className={classes.root}>
      <div className={classes.btns}>
        <LikeButton setCommentDislayNo={setCommentDislayNo} id={props.data.id} count={props.data.likes.length} liked = {liked} setLiked={setLiked} display={display} setDisplay={setDisplay}/>
        <CommentButton setCommentDislayNo={setCommentDislayNo}  display={display} setDisplay={setDisplay} count={commentCount}/>
      </div>
      <div className={classes.CommentSection}>
        <UserComment id={props.data.id} setCommentCount={setCommentCount} commentCount={commentCount} setUserComments={setUserComments} userComments={userComments} display={display} />
        <Comments setCommentCount={setCommentCount} commentCount={commentCount} id={props.data.id} fetchedComments={fetchedComments} setFetchedComments={setFetchedComments} commentDislayNo={commentDislayNo} setCommentDislayNo={setCommentDislayNo} comments={props.data.comments} userComments={userComments} setUserComments={setUserComments}  display={display} />
      </div>      
    </div>
  )
}