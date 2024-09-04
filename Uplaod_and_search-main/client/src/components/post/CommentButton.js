import { makeStyles } from "@material-ui/styles";

const useStyles =makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'50%',
    height:50,
    borderLeft:'1px solid #000000',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    cursor:'pointer',
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
 * This function is a reusable comment Button which can be placed anywhere.
 * @param {Object} props 
 * @returns {HTMLDivElement} - a button containing comment Icon with comment count. 
 */
export function CommentButton(props){
  const classes=useStyles();
  // actions to be performed when comment button is clicked
  function handleCommentClick(){
    props.display ? props.setDisplay(false) : props.setDisplay(true)
    props.display && props.setCommentDislayNo(0)
  }

  return(
    <button onClick={handleCommentClick} className={classes.root}>
      <img src='./comment.svg' alt ="Comment Icon"/>
      <p>{props.count}</p>
    </button>
  )
}