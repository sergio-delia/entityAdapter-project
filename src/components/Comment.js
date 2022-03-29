import React, {memo} from 'react'
import PropTypes from 'prop-types'
import { Panel, Button, ButtonToolbar } from 'rsuite'

const Comment = ({id, body, onDelete, onPatch, onUpdate}) => {
  return (
    <Panel header={<h1>{id}</h1>} bordered style={{margin:"20px"}}>
        {body}
        <br />
        <ButtonToolbar style={{marginTop:"10px"}}>
      <Button appearance="primary" size="lg" color="red" onClick={()=> onDelete(id)}>Delete</Button>
      <Button appearance="primary" size="lg" color="cyan" onClick={
        //()=> onPatch(id, {body:'ekekekek'})
        ()=> onUpdate(id, {body:'New Text'})
        } >Patch</Button>
    </ButtonToolbar>
    </Panel>
  )
}

Comment.propTypes = {
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    onPatch: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
}

export default memo(Comment)