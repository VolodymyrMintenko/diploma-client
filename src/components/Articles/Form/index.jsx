import "./form.scss";
import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import "./form.scss";
class Form extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        title: '',
        body: '',
        author: '',
      }
  
      this.handleChangeField = this.handleChangeField.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    componentWillReceiveProps(nextProps) {
      if(nextProps.articleToEdit) {
        this.setState({
          title: nextProps.articleToEdit.title,
          body: nextProps.articleToEdit.body,
          author: nextProps.articleToEdit.author,
        });
      }
    }
  
    handleSubmit(){
      const { onSubmit, articleToEdit, onEdit } = this.props;
      const { title, body, author } = this.state;
  
      if(!articleToEdit) {
        return axios.post('https://diplomamintenko.herokuapp.com/articles', {
          title,
          body,
          author,
        })
          .then((res) => onSubmit(res.data))
          .then(() => this.setState({ title: '', body: '', author: '' }));
      } else {
        return axios.patch(`https://diplomamintenko.herokuapp.com/articles/${articleToEdit._id}`, {
          title,
          body,
          author,
        })
          .then((res) => onEdit(res.data))
          .then(() => this.setState({ title: '', body: '', author: '' }));
      }
    }
  
    handleChangeField(key, event) {
      this.setState({
        [key]: event.target.value,
      });
    }
  
    render() {
      const { articleToEdit } = this.props;
      const { title, body, author } = this.state;
  
      return (
        <div className="flex">
            <div>
          <input
            onChange={(ev) => this.handleChangeField('title', ev)}
            value={title}
            className="author"
            placeholder="Title"
          /><br />
          <textarea
            onChange={(ev) => this.handleChangeField('body', ev)}
            className="description"
            placeholder="Description"
            value={body}>
          </textarea><br />
          <input
            onChange={(ev) => this.handleChangeField('author', ev)}
            value={author}
            className="author"
            placeholder=" Author"
          /><br />
          <button onClick={this.handleSubmit} className="but">{articleToEdit ? 'Update' : 'Submit'}</button>
        </div>
        </div>
      )
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
    onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
  });
  
  const mapStateToProps = state => ({
    articleToEdit: state.campaigns.articleToEdit,
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Form);