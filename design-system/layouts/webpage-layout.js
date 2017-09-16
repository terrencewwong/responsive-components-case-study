import React from 'react'
import styled from 'styled-components'
import { unit, unitType } from '../config'

const Centerer = styled.div`
  display: flex;
  justify-content: center;
`

const ContentContainer = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth};
  padding: ${props => {
    return props.padding
      .map(padScale => padScale * unit + unitType)
      .join(' ')
  }};
`

const WebpageLayout = ({ className, children, maxWidth, padding}) => (
  <Centerer className={className}>
    <ContentContainer maxWidth={maxWidth} padding={padding}>
      {children}
    </ContentContainer>
  </Centerer>
)

export default WebpageLayout
