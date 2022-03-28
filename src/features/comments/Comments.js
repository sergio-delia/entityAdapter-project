import React, { useEffect } from 'react'
import {fetchComments, commentsSelectors} from './commentsSlice'
import {useDispatch, useSelector} from 'react-redux'
import Comment from '../../components/Comment';

function Comments() {

    const dispatch = useDispatch();
    //const total = useSelector(commentsSelectors.selectTotal);
    const allComments = useSelector(commentsSelectors.selectAll);
    //dimostrazione const commentWithId5 = useSelector(state => commentsSelectors.selectById(state,5));

    //console.log( {total: total, all: allComments} )

    useEffect(() => {
        dispatch(fetchComments());
      }, []);
      



  return( 
      <>
  {allComments.map((comment)=> <Comment key={comment.id} comment={comment} />)}
    </>
) 

}

export default Comments