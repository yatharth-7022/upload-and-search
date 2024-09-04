import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { PostAPI } from "../../requests/api";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'50%',
    height:50,
    borderRight:'1px solid #000000',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    cursor:'pointer',
    backgroundColor:(props) => props.liked ? 'rgb(27 27 27)' : '#ffffff',
    color:(props) => props.liked ? '#ffffff' : '#000000',
    transition:'all 0.25s ease-in',
    '& img':{
      position:'relative',
      top:'0',
      left:'0',
      width:30,
      height:30
    },
    '& p':{
      position:'relative',
      top:0,
      left:0,
      fontSize:'1.1rem',
      margin:'0 0 0 15px',
      fontFamily:"'Orbitron', sans-serif;"
    }
  }
})

/**
 * 
 * @param {Object} props 
 * @returns {HTMLButtonElement} - a reusable button Element to like lik and unlike the post
 */
export function LikeButton(props){

  const classes = useStyles({liked:props.liked});
  const [src,setSrc] = useState('./like_icon.svg');
  const [likeCount, setLikeCount]= useState(props.count);
  const username = window.localStorage.getItem('username');

  useEffect(()=>{
    props.liked && setSrc('./like_icon_dark.svg')
  },[])
  
  async function handleLike(){
    if(!props.liked){
      try{
        // sends an API request to like the post
        await PostAPI(`http://localhost:8000/posts/like/${props.id}`,{username:username});
        props.setLiked(true);
        setSrc('./like_icon_dark.svg');
        props.setDisplay(true);
        setLikeCount(parseInt(likeCount)+1);
      } catch(err){
        console.log(err);
      }
      
    } else{
      try{
        // sends an API request to unlike the post
        await PostAPI(`http://localhost:8000/posts/unlike/${props.id}`,{username:username});
        props.setLiked(false);
        setSrc('./like_icon.svg')
        setLikeCount(parseInt(likeCount)-1);
        props.setDisplay(false);
        props.setCommentDislayNo(0);
      } catch(err){
        console.log(err);
      }

    }
    
  }

  return(
    <button onClick={handleLike} className={classes.root}>
      <img src={src} alt ="Like Button"/>
      <p>{likeCount}</p>
    </button>
  )
}