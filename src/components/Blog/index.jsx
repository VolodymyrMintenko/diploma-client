import React from 'react';
import Form from "../Articles/Form";
import axios from 'axios';
import moment from 'moment';
import { connect } from "react-redux";
import "./form.scss";
import {BLOG_PAGE_LOADED , DELETE_ARTICLE,SET_EDIT} from "pages/campaigns/reducer/actions"
class Blog extends React.Component {
    constructor(props) {
        super(props);
    
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
      }
    
      componentDidMount() {
        const { onLoad } = this.props;
    
        axios('https://diplomamintenko.herokuapp.com/articles')
          .then((res) => onLoad(res.data.payload));
      }
    
      handleDelete(id) {
        const { onDelete } = this.props;
    
        return axios.delete(`https://diplomamintenko.herokuapp.com/articles/${id}`)
          .then(() => onDelete(id));
      }
    
      handleEdit(article) {
        const { setEdit } = this.props;

        setEdit(article);
      }

      render() {
        const { articles } = this.props;
        console.log(articles)
        return (
          <div className="container">


              <div className="flex">
                <h1 className="text-center">Forum</h1>
              </div>
              <div>
              <Form />
                </div>
            <div className="flex">
              <div>
                {articles.map((article) => {
                  return (
                    <div className="card">
                      <div className="title">
                        {article.title}
                      </div>
                      <div className="description">
                        {article.body}
                        <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                      </div>
                      <div className="author">
                        <div className="row">
                          <button onClick={() => this.handleEdit(article)} className="but">
                            Edit
                          </button>
                          <button onClick={() => this.handleDelete(article._id)} className="btn btn-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
 
          </div>
        );
      }
    }
    
    const mapStateToProps = state => console.log(state.campaigns) || ({
      articles: state.campaigns.articles,
    });
    
    const mapDispatchToProps = dispatch => ({
      onLoad: data => dispatch({ type: BLOG_PAGE_LOADED, payload:data }),
      onDelete: id => dispatch({ type: DELETE_ARTICLE, payload:id }),
      setEdit: article => dispatch({ type: SET_EDIT, payload:article }),
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(Blog);