import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { CopyNotification } from '../../components/Notification';
import FourZeroFour from '../../styles/404';
import KaomojiDisplay from '../../styles/KaomojiDisplay';

import { getEmoji, getPinnedDatas, getPinnedEmoji, storePinned, removePinned } from '../../data/provider';

class EmojiDetails extends Component {
  state = {
    emoji: '',
    showNotif: false,
    notifMessage: '',
    selectedEmoji: '',
    isPinned: false
  }
  closeNotif = () => {
    setTimeout(() => {
      this.setState({
        showNotif: false
      })
    }, 1500)
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

  removeFromPin = async emoji => {
    const confirmUnpin = window.confirm('Unpin this emoji ?');
    if (!confirmUnpin) {
      return null;
    }
    const { parentCategory, subCategory } = this.props.match.params;
    const { success } = await removePinned(parentCategory, subCategory, emoji);
    if (success) {
      this.setState({
        showNotif: true,
        notifMessage: 'unpinned the emoji',
        isPinned: false
      }, () => this.closeNotif())
    }
  }

  addToPin = async emoji => {
    const { parentCategory, subCategory } = this.props.match.params;
    const { success: successPinned } = await storePinned(parentCategory, subCategory, emoji);
    let message = 'Added to pin';
    console.log({ successPinned })
    if (!successPinned) {
      message = `Already pinned`;
    }
    this.setState({
      showNotif: true,
      notifMessage: message,
      isPinned: true
    }, () => this.closeNotif())
  }

  componentDidMount() {
    const { match } = this.props;
    const emoji = match.params.filter === 'all' ? getEmoji(match.params.parentCategory, match.params.subCategory, match.params.index) : getPinnedEmoji(match.params.parentCategory, match.params.subCategory, match.params.index)
    let isPinned = false;
    if (match.params.filter === 'pinned') {
      const pinnedEmojis = getPinnedDatas(match.params.parentCategory, match.params.subCategory);
      if (pinnedEmojis.length === 0) {
        return null;
      }
      const emojiIndex = pinnedEmojis.emojis.findIndex(e => e.emoji === emoji.emoji);
      if (emojiIndex !== -1) {
        isPinned = true;
      }
    }
    this.setState({
      isPinned,
      emoji
    })
  }

  render() {
    const { match } = this.props;
    const { emoji } = this.state;
    return (
      <React.Fragment>
        <Header           
          pathname={this.props.location.pathname}
          current={this.props.location.state.current}
        />
        <section className="section" style={{ margin: '25px auto' }}>
          <nav className="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li><Link to='/'>Kaomoji</Link></li>
              <li><span style={{ padding: '0 .75em' }}>{match.params.parentCategory}</span></li>
              <li><span style={{ padding: '0 .75em' }}>{match.params.subCategory}</span></li>
              <li className="is-active"><span style={{ pading: '0 .75em' }}>{match.params.index}</span></li>
            </ul>
          </nav>
          <div className="columns is-mobile is-multiline">
            {
              !emoji
              && (
                <div className="column">
                  <FourZeroFour>
                    <p className="emoji">
                      ¯\_(ツ)_/¯
                    </p>
                    <p className="emoji__text">Feeling lost ?</p>
                  </FourZeroFour>
                </div>
              )
            }
            {
              emoji
              && (
                <div className="column" style={{ padding: '25px 0' }}>
                  <KaomojiDisplay
                    dangerouslySetInnerHTML={{ __html: emoji.emoji }}
                  />
                </div>
              )
            }
          </div>
          {
            emoji
            && (
              <React.Fragment>
                <div className="column">
                  <div className="buttons are-medium">
                    <button
                      className="button is-fullwidth is-primary"
                      onClick={() => this.copyEmoji(emoji.emoji)}
                    >
                      Copy to clipboard
                  </button>
                    <button
                      className="button is-fullwidth"
                      onClick={() => {
                        if (this.state.isPinned) {
                          return this.removeFromPin(emoji)
                        }
                        return this.addToPin(emoji)
                      }}
                    >
                      {this.state.isPinned ? 'Unpin' : 'Pin'}
                    </button>
                  </div>
                </div>
                <CopyNotification
                  showNotif={this.state.showNotif}
                  message={this.state.notifMessage}
                />
              </React.Fragment>
            )
          }
        </section>
      </React.Fragment>
    );
  }
}

export default EmojiDetails;
