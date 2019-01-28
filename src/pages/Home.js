import React, { Component, Fragment } from 'react';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import {CopyNotification, AlertNotification} from '../components/Notification';
import Tabs from '../components/Tabs';
import FourZeroFour from '../styles/404';

import 'bulma/css/bulma.css';

import { getDatas, getAllData, getAllPinned, getPinnedDatas, storePinned, removePinned } from '../data/provider';

class Home extends Component {
  state = {
    selected_category: ' - ',
    selectedEmoji: '',
    filter: 'all',
    page: 0,
    totalPage: 0,
    showNotif: false,
    notifMessage: '',
    showAlert: false,
    alertMessage: '',
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
      if (filter === 'pinned') {
        if(!getAllPinned()){
          return this.setState({
            showAlert: true,
            alertMessage: 'You have no pinned kaomoji right now'
          }, () => {
            setTimeout(() => this.setState({showAlert: false}),1500)
          });
        }        
      }      
      this.setState({
        filter,
        selected_category: ' - '
      }, () => this.updateEmojis())
    }
  }

  updateEmojis = () => {    
    const { parentCategory, subCategory } = this.getCategory();    
    const { emojis } = this.state.filter === 'all' ? getDatas(parentCategory, subCategory) : getPinnedDatas(parentCategory, subCategory);    
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

  addToPin = async emoji => {    
    const { parentCategory, subCategory } = this.getCategory();    
    const { success:successPinned } = await storePinned(parentCategory, subCategory, emoji);
    let message = 'Added to pin';
    console.log({successPinned})
    if(!successPinned){    
      message = `Already pinned`;
    }   
    this.setState({
      showNotif: true, 
      notifMessage: message
    }, () => this.closeNotif())
  }

  removeFromPin = async emoji => {
    const { parentCategory, subCategory } = this.getCategory();
    const { success, emojis} = await removePinned(parentCategory, subCategory, emoji);
    if(success){
      let totalPage = 1;
      const canDividedBySix = emojis.length % 6 === 0;
      if (canDividedBySix) {
        totalPage = emojis.length / 6;
      }
      else {
        totalPage = parseInt(emojis.length / 6) + 1;
      }
      console.log({totalPage})
      console.log(this.state.page > totalPage - 1)
      this.setState({
        showNotif: true, 
        notifMessage: 'unpinned the emoji',
        totalPage,
        page: this.state.page > totalPage - 1 ? totalPage - 1 : this.state.page,
        emojis
      }, () => this.closeNotif())
    }
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
                    data && data.map(({ category, sub }) => (
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
              this.state.emojis.length > 0 && this.state.emojis.slice((this.state.page * 6), (this.state.page * 6) + 6).map((emoji, index) => {
                return (
                  <div className="column is-half" key={emoji.emoji}>
                    <Card
                      emoji={emoji}
                      category={this.state.selected_category}
                      index={index + 6 * this.state.page}
                      copyEmoji={this.copyEmoji}
                      filter={this.state.filter}
                      pinEmojiAction={this.state.filter === 'all' ? this.addToPin : this.removeFromPin}
                      status={this.state.filter === 'all' ? 'pin' : 'unpin'}
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
          <AlertNotification 
            showNotif={this.state.showAlert}
            message={this.state.alertMessage}
          />
        </section>
      </Fragment>
    );
  }
}

export default Home;
