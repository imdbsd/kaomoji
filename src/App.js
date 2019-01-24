import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Pagination from './components/Pagination';
import FourZeroFour from './styles/404';

import 'bulma/css/bulma.css';

import kaomojis from './data/kaomoji.json'
import { getDatas, getAllData } from './data/provider';

class App extends Component {
  state = {
    selected_category: ' - ',
    page: 0,
    totalPage: 0,
    emojis: []
  }

  changeCategory = ({ target }) => {
    const { value, name } = target;    
    this.setState({
      [name]: value,
      page: 0,      
    }, () => {
      const { parentCategory, subCategory } = this.getCategory();
      const { emojis } = getDatas(parentCategory, subCategory);
      if(!emojis){
        return this.setState({
          totalPage: 0,
          emojis: []
        })
      }
      let totalPage = 1;
      //update pagination
      const canDividedBySix = emojis.length % 6 === 0;
      if(canDividedBySix){
        totalPage = emojis.length / 6;
      }
      else{
        totalPage = parseInt(emojis.length / 6) + 1;
      }
      this.setState({
        totalPage,
        emojis
      })
    })
  }

  componentDidMount() {
    console.log(kaomojis)
  }

  getCategory = () => {
    const [parentCategory, subCategory] = this.state.selected_category.split("-");        
    return {
      parentCategory,
      subCategory
    };
  }

  handlePagination = status => {
    console.log({status})
    const {page, totalPage} = this.state;
    if(status === 'up'){
      if((page + 1) < totalPage){
        this.setState({
          page: page + 1
        })
      }
    }
    else{
      if((page - 1) >= 0){
        this.setState({
          page: page - 1
        })
      }
    }
  }

  render() {        
    return (
      <Fragment>
        <Header />
        <section className="section">
          <form style={{ margin: '10px auto' }}>
            <div className="control">
              <div className="select is-primary" style={{ width: "100%" }}>
                <select
                  className="input is-rounded"
                  style={{ width: "100%" }}
                  value={this.state.selected_category}
                  name="selected_category"
                  onChange={this.changeCategory}
                >
                  <option value=" - " >- Category -</option>
                  {
                    getAllData().map(({ category, sub }) => (
                      <optgroup label={category} key={category}>
                        {
                          sub.map(s => (
                            <option
                              key={category + s.category}
                              value={`${category}-${s.category}`}
                            >{s.category}</option>
                          ))
                        }
                      </optgroup>
                    ))
                  }
                </select>
              </div>
            </div>
          </form>
          <div className="columns is-mobile is-multiline">
            {
              this.state.emojis.length === 0 && (
                <div className="column">
                  <FourZeroFour>
                    <p className="emoji">
                      ¯\_(ツ)_/¯
                    </p>
                    <p className="emoji__text">HHmmm, what did u want?</p>
                  </FourZeroFour>
                </div>
              )
            }
            {
              this.state.emojis.length > 0 && this.state.emojis.slice((this.state.page * 6), (this.state.page * 6) + 6).map(emoji => {
                return (
                  <div className="column is-half">
                    <Card
                      emoji={emoji}
                    />
                  </div>
                )
              })
            }
          </div>
          {
            this.state.totalPage >= 1
            && <Pagination
                  totalPage={this.state.totalPage}
                  currentPage={this.state.page + 1}
                  handlePagination={this.handlePagination}
                />
          }
        </section>
      </Fragment>
    );
  }
}

export default App;
