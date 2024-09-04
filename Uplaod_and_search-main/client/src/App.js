import { UserName } from './components/UserName';
import { WelcomeMsg } from './components/WelcomeMsg';
import { Posts } from './components/Posts';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  root:{
    position:'relative',
    top:0,
    left:0,
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  mainBg:{
    position:'fixed',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    backgroundColor:'#e7e6e6b3',
    zIndex:0
  }
})

function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className={classes.mainBg}></div>
      <UserName />
      <WelcomeMsg />
      <Posts />
    </div>
    
  )
}

export default App;
