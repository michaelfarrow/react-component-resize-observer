import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import ResizeObserver from '../src'
import './index.css'

class ResizableTest extends Component {

  state = {
    expanded: false,
    updated: false,
    width: 0,
    height: 0
  }

  onResize = size => {
    this.setState(state => ({...state, ...size}))
  }

  onClick = () => {
    this.setState(state => ({...state, expanded: !this.state.expanded}))
  }

  componentWillUpdate (nextProps, nextState) {
    const { width, height } = this.state
    if (nextState.width !== width || nextState.height !== height) {
      this.setState(state => {
        if (this.updateTimeout) clearTimeout(this.updateTimeout)
        this.updateTimeout = setTimeout(() => {
          this.setState(state => ({...state, updated: false}))
        }, 1000)
        return {...state, updated: true}
      })
    }
  }

  componentWillUnmount () {
    if (this.updateTimeout) clearTimeout(this.updateTimeout)
  }

  render () {
    const { expanded, updated, width, height } = this.state
    const sizeClasses = ['size']
    if (updated) sizeClasses.push('size--updated')
    return (
      <div className='wrapper'>
        <div className={sizeClasses.join(' ')}>
          Width:
          {' '}
          {width}px,
          {' '}Height:
          {' '}
          {height}px
        </div>
        <ResizeObserver className='resizable' onResize={this.onResize}>
          <p>
            Donec <i>porttitor erat <b>tincidunt</b> tempor</i> venenatis. Sed interdum pharetra bibendum. Cras auctor lorem lacus, non convallis lectus iaculis vel. Ut
            fermentum felis a mauris pulvinar, nec laoreet tellus porttitor. Nulla nunc quam, porttitor vel ipsum eget, luctus congue nunc. Ut lectus leo, malesuada et
            porta nec, luctus vel risus. Integer porttitor cursus massa id gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae
            Cras ac suscipit risus, a pharetra turpis. Nunc lectus dolor, suscipit non tellus vel, facilisis posuere nunc. Maecenas vestibulum a nibh vitae mollis. Etiam
            condimentum sit amet turpis at congue. Nulla ac fringilla tellus. Nulla a justo sed lorem elementum feugiat. Mauris sollicitudin lacus vitae posuere imperdiet.
            Curabitur in metus ut quam facilisis maximus.
          </p>
          <div className={expanded ? 'expandable expandable--expanded' : 'expandable'} onClick={this.onClick} />
        </ResizeObserver>
      </div>
    )
  }

}

storiesOf('ResizeObserver', module)
  .add('Usage', () => (
    <ResizableTest/>
  ))
