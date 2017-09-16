import styled from 'styled-components'
import { unit, unitType } from '../config'

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.maxWidth};

  ${props => {
    const { padding, top, bottom ,left, right } = props

    if (padding) {
      const padValues = padding
        .map(padScale => padScale * unit + unitType)
        .join(' ')
      return `padding: ${padValues};`
    } else {
      const css = []

      if (top) css.push(`padding-top: ${top * unit + unitType};`)
      if (bottom) css.push(`padding-bottom: ${bottom * unit + unitType};`)
      if (left) css.push(`padding-left: ${left * unit + unitType};`)
      if (right) css.push(`padding-right: ${right * unit + unitType};`)

      return css.join('')
    }
  }}
`
Container.displayName = 'Container'
export default Container
