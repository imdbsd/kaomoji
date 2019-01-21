import React, { Component, Fragment } from 'react';
import Header from './components/Header';
import Card from './components/Card';

import 'bulma/css/bulma.css';

import kaomojis from './data/kaomoji.json'

class App extends Component {
  componentDidMount() {
    console.log(kaomojis)
  }
  render() {
    return (
      <Fragment>
        <Header />
        <section className="section">
          <form>
          <div className="control">
            <div className="select">
              <select>
                <option>Select dropdown</option>
                <option>With options</option>
              </select>
            </div>
          </div>
          </form>
        </section>
        <section className="section">
          <div className="columns is-mobile is-multiline">
            {
              kaomojis.data[1].sub[0].emojis.map(emoji => {
                return (
                  <div class="column is-half">
                    <Card 
                      emoji={emoji}
                    />
                  </div>
                )
              })
            }
          </div>
        </section>
      </Fragment>
    );
  }
}

export default App;
