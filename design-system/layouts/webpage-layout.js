import React from 'react'
import styled from 'styled-components'
import { unit, unitType } from '../config'
import Container from './container'

const Centerer = styled.div`
  display: flex;
  justify-content: center;
`

const WebpageLayout = ({ className, children, maxWidth, padding}) => (
  <Centerer className={className}>
    <Container maxWidth={maxWidth} padding={padding}>
      {children}
    </Container>
  </Centerer>
)

export default WebpageLayout
