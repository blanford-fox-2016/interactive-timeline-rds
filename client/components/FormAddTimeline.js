import React, {Component, PropTypes} from 'react'

export default class FormAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content || '',
    }
  }

  handleContentChange(e) {
    this.setState({content: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let content = this.state.content.trim()

    if (!content) {
      return ;
    } else {
      // console.log(this.props.data);
      this.props.onSave(content)
      this.setState({content: ''})
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Name</label>
          <textarea className="form-control" placeholder="Update your status" value={this.state.content} onChange={this.handleContentChange.bind(this)} ></textarea>
        </div>
        <button className="btn btn-default" type="submit"><span className="glyphicon glyphicon-plus"></span>Add Post</button>
      </form>
    )
  }
}

FormAdd.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  onSave: PropTypes.func.isRequired
}
