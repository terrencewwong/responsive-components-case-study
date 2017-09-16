import styled from 'styled-components'
import { unit, unitType } from '../config'

const Spacer = styled.div`
  ${props => {
    const { spacing, top, bottom ,left, right } = props

    if (spacing) {
      const marginValues = spacing
        .map(spaceScale => spaceScale * unit + unitType)
        .join(' ')
      return `margin: ${marginValues};`
    } else {
      const css = []

      if (top) css.push(`margin-top: ${top * unit + unitType};`)
      if (bottom) css.push(`margin-bottom: ${bottom * unit + unitType};`)
      if (left) css.push(`margin-left: ${left * unit + unitType};`)
      if (right) css.push(`margin-right: ${right * unit + unitType};`)

      return css.join('')
    }
  }}
`
Spacer.displayName = 'Spacer'
export default Spacer
