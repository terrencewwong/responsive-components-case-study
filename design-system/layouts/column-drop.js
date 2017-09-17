import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  castToArray as array,
  compileResponsiveRules,
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
  const [ defaultCSS, ...cssStrings ] = array(responsiveCSS)
  const breakpoints = array(breakpoint)

  const rules = [
    widthCSS(defaultSize),
    marginCSS(defaultMargin),
    paddingCSS(defaultPadding),
    defaultCSS
  ]

  const responsiveRules = compileResponsiveRules({
    breakpoints,
    margins,
    paddings,
    sizes,
    cssStrings
  })

  return [
    ...rules,
    responsiveRules
  ].join('')
}

const ColumnWrapper = styled.div`
  ${mapPropsToCSS}
`
export const Column = (props, context) => (
  <ColumnWrapper {...props} {...context} />
)
Column.contextTypes = columnContext

