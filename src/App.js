import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Pagination from './components/Pagination';
import {CopyNotification, AlertNotification} from './components/Notification';
import Tabs from './components/Tabs';
import FourZeroFour from './styles/404';

import 'bulma/css/bulma.css';

import kaomojis from './data/kaomoji.json'
import { getDatas, getAllData, getAllPinned, getPinnedDatas } from './data/provider';

class App extends Component {
  state = {
    selected_category: ' - ',
    selectedEmoji: '',
    filter: 'all',
    page: 0,
    totalPage: 0,
    showNotif: false,
    emojis: []
  }

  changeCategory = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
      page: 0,
    }, () => {
      this.updateEmojis();
    })
  }

  changeFilter = filter => {
    if (this.state.filter !== filter) {
      console.log(!getAllPinned())
      if (filter === 'pinned') {
        if(!getAllPinned()){
          return null;
        }        
      }      
      this.setState({
        filter,
        selected_category: ' - '
      }, () => this.updateEmojis())
    }
  }

  updateEmojis = () => {
    console.log("updateEMojis")
    const { parentCategory, subCategory } = this.getCategory();
    console.log({filter: this.state.filter})
    const { emojis } = this.state.filter === 'all' ? getDatas(parentCategory, subCategory) : getPinnedDatas(parentCategory, subCategory);
    console.log({emojis})
    if (!emojis) {
      return this.setState({
        totalPage: 0,
        emojis: []
      })
    }
    let totalPage = 1;
    //update pagination
    const canDividedBySix = emojis.length % 6 === 0;
    if (canDividedBySix) {
      totalPage = emojis.length / 6;
    }
    else {
      totalPage = parseInt(emojis.length / 6) + 1;
    }
    this.setState({
      totalPage,
      emojis
    })
  }

  getCategory = () => {
    const [parentCategory, subCategory] = this.state.selected_category.split("-");
    return {
      parentCategory,
      subCategory
    };
  }

  handlePagination = status => {
    console.log({ status })
    const { page, totalPage } = this.state;
    if (status === 'up') {
      if ((page + 1) < totalPage) {
        this.setState({
          page: page + 1
        })
      }
    }
    else {
      if ((page - 1) >= 0) {
        this.setState({
          page: page - 1
        })
      }
    }
  }

  copyEmoji = emoji => {
    const hidden = document.createElement('textarea');
    const hiddenInput = document.createElement('input');
    hidden.innerHTML = emoji;
    hiddenInput.setAttribute("value", hidden.innerHTML);
    document.body.appendChild(hiddenInput);
    hiddenInput.select();
    document.execCommand("copy");
    document.body.removeChild(hiddenInput);
    this.setState({
      showNotif: true,
      notifMessage: `Coppied ${hidden.innerHTML} to clipboard`,
      selectedEmoji: hidden.innerHTML,
    }, () => {
      this.closeNotif()
    })
  }

  addToPin = emoji => {
    const { localStorage } = window;
    let pinned = localStorage.getItem('pin');
    if (!pinned) {
      pinned = [];
    }
    else {
      pinned = JSON.parse(pinned);
    }
    // console.log({pinned});
    const { parentCategory, subCategory } = this.getCategory();
    const parentCategoryIndex = pinned.findIndex(pin => pin.category === parentCategory);
    if (parentCategoryIndex === -1) {
      pinned.push({
        category: parentCategory,
        sub: [
          {
            category: subCategory,
            emojis: [
              emoji
            ]
          }
        ]
      })
    }
    else {
      const subCategoryIndex = pinned[parentCategoryIndex].sub.findIndex(pin => pin.category === subCategory);
      if (subCategoryIndex === -1) {
        pinned[parentCategoryIndex].sub.push({
          category: subCategory,
          emojis: [
            emoji
          ]
        })
      }
      else {
        const status = pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.findIndex(pin => pin.emoji === emoji.emoji);
        if (status === -1) {
          pinned[parentCategoryIndex].sub[subCategoryIndex].emojis.push({
            ...emoji
          })
        }
        else{
          return this.setState({
            showNotif: true, 
            notifMessage: `Already pinned`
          }, () => this.closeNotif())            
        }
      }
    }
    this.setState({
      showNotif: true, 
      notifMessage: `Added to pin`
    }, () => this.closeNotif())
    localStorage.setItem('pin', JSON.stringify(pinned));
  }

  closeNotif = () => {
    setTimeout(() => {
      this.setState({
        showNotif: false
      })
    }, 1500)
  }

  componentDidMount() {
    const { localStorage } = window;
    console.log({
      pin: localStorage.getItem('pin')
    })
  }

  render() {
    const data = this.state.filter === 'all' ? getAllData() : getAllPinned()
    return (
      <Fragment>
        <Header />
        <section className="section">
          <Tabs
            filter={this.state.filter}
            changeFilter={this.changeFilter}
          />
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
                    data.map(({ category, sub }) => (
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
                  <div className="column is-half" key={emoji.emoji}>
                    <Card
                      emoji={emoji}
                      copyEmoji={this.copyEmoji}
                      pinEmoji={this.addToPin}
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
          <CopyNotification
            showNotif={this.state.showNotif}            
            message={this.state.notifMessage}
          />
        </section>
      </Fragment>
    );
  }
}

export default App;
