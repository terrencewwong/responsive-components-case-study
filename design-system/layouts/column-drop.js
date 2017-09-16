import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media } from '../utils'

const columnContext = {
  breakpoint: PropTypes.string.isRequired
}

const ColumnDropWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`

export default class ColumnDrop extends Component {
  static childContextTypes = columnContext

  getChildContext () {
    return {
      breakpoint: this.props.breakpoint
    }
  }

  render () {
    const { className, children } = this.props
    return (
      <ColumnDropWrapper className={className}>{children}</ColumnDropWrapper>
    )
  }
}

const ColumnWrapper = styled.div`
  width: 100%;

  ${props => {
    const { breakpoint, width } = props
    return media[breakpoint]`
      width: ${width};
    `
  }}
`
export const Column = (props, context) => (
  <ColumnWrapper {...props} {...context} />
)
Column.contextTypes = columnContext

