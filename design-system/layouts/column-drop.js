import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  castToArray as array,
  media,
  marginCSS,
  paddingCSS,
  widthCSS
} from '../utils'

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

const mapPropsToCSS = ({
  breakpoint,
  size,
  margin,
  padding,
  responsiveCSS
}) => {
  const [ defaultSize, ...sizes ] = array(size)
  const [ defaultMargin, ...margins ] = array(margin)
  const [ defaultPadding, ...paddings ] = array(padding)
  const [ defaultCSS, ...css ] = array(responsiveCSS)
  const breakpoints = array(breakpoint)

  const rules = [
    widthCSS(defaultSize),
    marginCSS(defaultMargin),
    paddingCSS(defaultPadding),
    defaultCSS
  ]

  const responsiveRules = breakpoints.map((device, i) => {
    const mediaQuery = media[device]

    // need a join because of weird tagged template literal behaviour
    return mediaQuery`
      ${widthCSS(sizes[i])}
      ${marginCSS(margins[i])}
      ${paddingCSS(paddings[i])}
      ${css[i]}
    `.join('')
  })

  return [
    ...rules,
    ...responsiveRules
  ].join('')
}

const ColumnWrapper = styled.div`
  ${mapPropsToCSS}
`
export const Column = (props, context) => (
  <ColumnWrapper {...props} {...context} />
)
Column.contextTypes = columnContext

