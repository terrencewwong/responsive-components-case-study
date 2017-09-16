import { css } from 'styled-components'
import { breakpoints } from '../config'

const mediaGenerator = breakpoint => (...args) => css`
  @media screen and (min-width: ${breakpoint}) {
    ${css(...args)}
  }
`

const media = Object.assign(
  ...Object
    .entries(breakpoints)
    .map(([device, breakpoint]) => ({ [device]: mediaGenerator(breakpoint) }))
)

export default media
