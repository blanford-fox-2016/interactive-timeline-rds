import React, {Component, PropTypes} from 'react'

export default class FormAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content || ''
    }
  }
  handleContentChange(e) {
    this.setState({content: e.target.value})
  }
  handleSubmit(e) {
    e.preventDefault()
    let content = this.state.content.trim()
    if (!content) {
      console.log('fail');
      return ;
    } else {
      this.props.onSave(content)
      this.setState({content: ''})
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label>Create new post :</label>
          <input type="text" className="form-control" id="form-content" placeholder="What's on your mind...?" value={this.state.content} onChange={this.handleContentChange.bind(this)} />
        </div>
        <button className="btn btn-primary raised" type="submit"><span className="glyphicon glyphicon-send"></span>   Post it !</button>
      </form>
    )
  }
}

FormAdd.propTypes = {
  content: PropTypes.string,
  onSave: PropTypes.func.isRequired
}
