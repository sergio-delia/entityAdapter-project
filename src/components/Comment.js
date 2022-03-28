import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Button, ButtonToolbar } from 'rsuite'

const Comment = ({comment}) => {
  return (
    <Panel header={comment.name} bordered style={{margin:"20px"}}>
        {comment.body}
        <br />
        <ButtonToolbar style={{marginTop:"10px"}}>
      <Button appearance="primary" size="lg" color="red">Delete</Button>
      <Button appearance="primary" size="lg" color="cyan">Patch</Button>
    </ButtonToolbar>
    </Panel>
  )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment