import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Post } from "./post/Post";
import { GetAPI } from '../requests/api';

const useStyles =makeStyles({
  root:{
    zIndex:1,
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    marginTop:40,
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  endMsg:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    fontSize:'1.2rem',
    textAlign:'center'
  }
});

/**
 * This function adds a list of post from the data loaded from API, adds a scroll event
 * to load and disply more posts when user reaches an end. 
 * @returns {HTMLDivElement} - a list  of posts.
 */
export function Posts(){
  const UserName = window.localStorage.getItem('username')
  const [data,setData] = useState([]);
  const [ParamData, setParamData] = useState({});
  const [twitch , settwitch] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  // loads posts data with pagination
  async function loadData(){
    let resData = await GetAPI("http://localhost:8000/posts",{LastEvalValue:JSON.stringify(ParamData)});
    setData([...data, ...resData.data]);
    resData.LastEvalValue ? setParamData(resData.LastEvalValue) : setParamData({})
  }

  useEffect(()=>{
    loadData();
    let scriptURL = 'https://embed.twitch.tv/embed/v1.js';
    //load the twitch script and set twitch to true so iframe integration can start
    const script = document.createElement('script');
    script.setAttribute('src',scriptURL);
    script.addEventListener('load', () => {
      settwitch(true);
    }); 
    document.body.appendChild(script);

    return () =>{
      script.removeEventListener('load', () => {
        settwitch(true);
      }); 
    }
  },[]);

  useEffect(()=>{
    if(startLoading && JSON.stringify(ParamData) != '{}'){
      loadData();
      setStartLoading(false);  
    }
  },[startLoading])

  useEffect(()=>{
    document.addEventListener('scroll',()=>{
      if((parseInt(window.scrollY)+parseInt(window.innerHeight)) >= (parseInt(document.body.scrollHeight) - 700) && !startLoading){
        setStartLoading(true);
      }
    });
    return () =>{
      document.removeEventListener('scroll',()=>{
        if((parseInt(window.scrollY)+parseInt(window.innerHeight)) >= (parseInt(document.body.scrollHeight - 700)) && !startLoading){
          setStartLoading(true);
        }
      });
    }
  },[])

  const classes = useStyles();
  return(
    <div className={classes.root}>
      {UserName && twitch && data.map((d) =>{
        return <Post twitch={twitch} key={d.id} data={d} />
      })}
      {JSON.stringify(ParamData) != '{}' ? <p className={classes.endMsg}>Loading ...</p> : <p className={classes.endMsg}>You Reached an End ;-)</p>} 
    </div>
  )
}
