import { makeStyles } from "@material-ui/styles";
import { useEffect } from "react";
import { DataDisplay } from "./DataDisplay";
const useStyles =makeStyles({
  root:{
    zIndex:1,
    position:'relative',
    top:0,
    left:0,
    width:700,
    maxWidth:700,
    borderRadius:15,
    border:'1px solid #000000',
    marginTop:40,
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:'0 0 0px 0',
    backgroundColor:'#ffffff',
    boxShadow: '0px 0px 8px -3px rgba(0,0,0,0.75) inset',
    overflow:'hidden',
    '@media (max-width:700px)':{
      width:'100%'
    },
  },
  video_div:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    "&:after":{
      display:'block',
      content:'""',
      width:"100%",
      paddingTop:`${(9/16)*100}%`,
    },
    '& iframe':{
      position:'absolute',
      top:0,
      left:0,
      width:'100%',
      height:'100%',
      '& body':{
        fontSize:'0.5rem !important'
      }
    },
    '@media (max-width:700px)':{
      "&:after":{
        paddingTop:`${(14/16)*100}%`,
      },
    },
  },
  video:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%'
  },
  data:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  }
});

/**
 * This function integrates all the components - likes, comments , comments display, iframe and returns one
 * reuable element that could be used over and over again by modifying data insidde props. 
 * @param {Object} props 
 * @returns {HTMLDivElement}- a complete post Item div element 
 */
export function Post(props){
  let url='';
  let videoType = props.data.video.indexOf('youtube') !== -1 ? 'youtube' : 'twitch';
  if(videoType === 'youtube'){
    let videoId = props.data.video.split('=')[1];
    url = `https://www.youtube.com/embed/${videoId}`;
  }

  useEffect(()=>{
    if(videoType === 'twitch'){
      let videoId = (props.data.video.split('/'))[4];
      if(!document.getElementById(`twitch-embed${props.data.id}`).innerHTML){ 
        new window.Twitch.Player(`twitch-embed${props.data.id}`, { video: videoId, layout:'video', autoplay: "false" }); 
      }
    }
  },[]);
   
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <div className={classes.video_div}>
        {videoType === 'twitch' ?
          <div className={classes.video} id={`twitch-embed${props.data.id}`}></div>
          : <iframe src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> }
      </div>
      <div className={classes.data}>
        <DataDisplay data={props.data}/>
      </div>
    </div>
  )
}