import React, { useEffect, useCallback } from 'react'
import {fetchComments, commentsSelectors, deleteComment, patchComment, removeAllLikes, updateOneComment, removeTagById} from './commentsSlice'
import {useDispatch, useSelector} from 'react-redux'
import Comment from '../../components/Comment';
import { Panel, Button, ButtonToolbar } from 'rsuite'

function Comments() {

    const dispatch = useDispatch();
    //const total = useSelector(commentsSelectors.selectTotal);
    const allComments = useSelector(commentsSelectors.selectAll);
    //dimostrazione const commentWithId5 = useSelector(state => commentsSelectors.selectById(state,5));

    //console.log( {total: total, all: allComments} )

    const onUpdate = useCallback(
        (id, newObj)=>{
            dispatch(updateOneComment({id, changes: newObj}))
        }, [])

    useEffect(() => {
        dispatch(fetchComments());
      }, []);
      

    //lo useCallback è inutile serve solo per evitare di ricreare la funzione ad ogni aggiornamento del componente
      const onDelete = useCallback((id) =>{
          dispatch(deleteComment(id))
      }, [])


      const onPatch = useCallback((id, newObj) =>{
        dispatch(patchComment({id: id, newObj: newObj}))
    }, [])



  return( 
      <>
  {allComments.map(({id, body})=> (
    <Comment key={id} id={id} body={body} 
        onDelete={onDelete}
        onPatch={onPatch}
        onUpdate={onUpdate} 
    />
    ) )}
    <Button size="lg" color="cyan" appearance="primary" onClick={()=>dispatch(removeAllLikes())} >RIMUOVI TUTTI I LIKES</Button>
    <Button size="lg" color="red" appearance='primary' onClick={()=> dispatch(removeTagById('1105ba8b-aa81-4d84-9098-4d187fa2499f'))} >RIMUOVI TAG</Button>
    </>
) 

}

export default Comments