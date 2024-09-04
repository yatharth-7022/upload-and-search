const db= require('./db.json');
const paginationNumber = 5;
const fs = require('fs')

exports.getPosts = function (req,res){
  let start=0;
  let data=[];
  let dbLength = db.length;
  // setting lastEvaluated ID value for continuing pagination
  if(!req.query.LastEvalValue){
    res.status(400).send("invalid query");
  }
  req.query.LastEvalValue = JSON.parse(req.query.LastEvalValue)
  req.query.LastEvalValue.id >=0 ?
   start = (req.query.LastEvalValue.id) :
   start=dbLength-1;
  
  
  let end = start - paginationNumber;
  let StrData = '';
  if(start >= 0 && end >= 0){
    for(let i= start; i>end; i--){
      data.push(db[i]);
    }
    StrData = JSON.stringify({data:data,LastEvalValue:{id:end}})
  }
  else if(end < 0 && start>=0) {
    for(let i=start;i>-1;i--){
      data.push(db[i])
    }
    StrData = JSON.stringify({data:data})
  }
  else{
    StrData = JSON.stringify({data:data});
  }
  
  return res.status(200).send(StrData)
}

exports.addPosts = function (req,res){
  if(!req.body.video){
    res.status(400).send('Video Url invalid')
  }
  let post ={
    id:db.length+1,
    video:req.body.video,
    likes:[],
    comments:[]
  }
  db.push(post);
  try{
    fs.writeFile('db.json',strData,'utf8',()=>{
    res.status(200).send({msg:"Post Liked"});
    })
  }catch(err){
    console.log(err);
    res.status(500).send({msg:"Something went Wronng"})
  }

}



exports.likePost = function (req,res){  
  // I usually go with db.map or search incase of a database to change the data
  // but because the data is sorted and id are sequence numbers i am updating this way
  // Because Id should be a number checking whether or not id is a number nad also username check.
  let isNumber = ((String(parseInt(req.params.id))).length == req.params.id.length);
  let isValidUser = req.body.username && !req.body.username.includes(' ')
  if(req.params.id <= db.length && isNumber && isValidUser){
    // adds likes to db file
    let liked = false;
    db[req.params.id - 1].likes.map((like) =>{
      if(like == req.body.username){
        liked =true;
      }
    })

    if(!liked){
      db[req.params.id - 1].likes.push(req.body.username);
      let strData = JSON.stringify(db)
      try{
        fs.writeFile('db.json',strData,'utf8',()=>{
        return res.status(200).send({msg:"Post Liked"});
        })
      }catch(err){
        console.log(err);
        return res.status(500).send({msg:"Something went Wronng"})
      }
    } else{
      return res.status(400).send({msg:"You already liked this post"})
    }
  } 
  else if(!isValidUser){
    return res.status(400).send({msg:"Username is not valid"})
  } else{
    return res.status(400).send({msg:"id is not valid"})
  }
}


exports.unlikePost = function (req,res){
  // I usually go with db.map or search incase of a database to change the data
  // but because the data is sorted and id are sequence numbers i am updating this way.

  // Because Id should be a number checking whether or not id is a number
  let isNumber = ((String(parseInt(req.params.id))).length == req.params.id.length);
  let isValidUser = req.body.username && !req.body.username.includes(' ');

  if(req.params.id <= db.length && isNumber){
    // removing like from db file
    let liked = true;
    db[req.params.id - 1].likes = db[req.params.id - 1].likes.filter((like) =>{
      if(like == req.body.username){
        liked =false;
        return false;
      }
      return true
    })

    if(!liked){
      let strData = JSON.stringify(db)
      try{
        fs.writeFile('db.json',strData,'utf8',()=>{
          return res.status(200).send({msg:"Unliked Post Successfully"})
        })
      } catch(err){
        console.log(err)
        return res.status(500).send({msg:"Something went Wronng"})
      }
      
    } else{
      return res.status(400).send({msg:"You Never liked this post"})
    }
  } 
  else if(!isValidUser){
    res.status(400).send({msg:"Username is not valid"})
  } else{
    res.status(400).send({msg:"id is not valid"})
  }
}

exports.commentOnPost = function(req,res){
  let isNumber = ((String(parseInt(req.params.id))).length == req.params.id.length);
  let isValidUser = req.body.username && !req.body.username.includes(' ')
  if(req.params.id <= db.length && isNumber && isValidUser){
    // adds Comments to db file
    let date = new Date()
    db[req.params.id - 1].comments.push({username:req.body.username,comment:req.body.comment,commentId:req.body.commentId});
    let strData = JSON.stringify(db)
    try{
      fs.writeFile('db.json',strData,'utf8',()=>{
      res.status(200).send({msg:"Comment added Successfully"});
      })
    }catch(err){
      console.log(err);
      res.status(500).send({msg:"Something went Wronng"})
    }
  } 
  else if(!isValidUser){
    res.status(400).send({msg:"Username is not valid"})
  } else{
    res.status(400).send({msg:"id is not valid"})
  }
}

exports.deleteCommentOnPost = function(req,res){
  let isNumber = ((String(parseInt(req.params.id))).length == req.params.id.length);
  let isValidUser = req.body.username && !req.body.username.includes(' ')
  if(req.params.id <= db.length && isNumber && isValidUser){
    // removes Comments to db file
    db[req.params.id - 1].comments = db[req.params.id - 1].comments.filter((comment)=>{
      if(req.body.commentId == comment.commentId){
        return false;
      }
      return true
    })
    let strData = JSON.stringify(db)
    try{
      fs.writeFile('db.json',strData,'utf8',()=>{
      res.status(200).send({msg:"Comment removed Successfully"});
      })
    }catch(err){
      console.log(err);
      res.status(500).send({msg:"Something went Wronng"})
    }
  } 
  else if(!isValidUser){
    res.status(400).send({msg:"Username is not valid"})
  } else{
    res.status(400).send({msg:"id is not valid"})
  }
}