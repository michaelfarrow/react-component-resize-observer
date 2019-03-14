import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ResizeObserver extends Component {

  static propTypes = {
    tag: PropTypes.string,
    onResize: PropTypes.func
  }

  static defaultProps = {
    tag: 'div'
  }

  size = {
    width: 0,
    height: 0
  }

  mounted = false

  monitorHeight = () => {
    const { container } = this
    const { onResize } = this.props
    const { width, height } = this.size
    if (container) {
      const { clientWidth, clientHeight } = container
      if (clientWidth !== width || clientHeight !== height) {
        this.size = {
          width: clientWidth,
          height: clientHeight
        }
        onResize && onResize(this.size)
      }
    }
    if (this.mounted) requestAnimationFrame(this.monitorHeight)
  }

  componentDidMount () {
    this.mounted = true
    requestAnimationFrame(this.monitorHeight)
  }

  componentWillUnmount () {
    this.mounted = false
  }

  render () {
    const { tag: Tag, children, onResize, ...props } = this.props
    return (
      <Tag {...props} ref={ref => this.container = ref}>
        {children}
      </Tag>
    )
  }

}
