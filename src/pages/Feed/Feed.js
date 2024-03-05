import React, { useEffect, useState } from 'react'
import '../Page.css';
import TweetBox from './TweetBox/TweetBox';
import Post from './Post/Post';
import './Feed.css'
import BACK_URL from '../../helper';


const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   fetch(`${BACK_URL}/post`) 
   .then(res => res.json())
   .then(data =>{
    setPosts(data)
   })
  },[posts])
     return (
    <div>
     
      <TweetBox/>
      {
        posts.map(p=><Post key = {p._id} p={p}/>)
      }
    </div>
  )
}

export default Feed
