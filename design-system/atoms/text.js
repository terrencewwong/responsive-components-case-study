import styled, { css } from 'styled-components'
import { typeScale } from '../config'
import { media } from '../utils'

const fontStyles = ({ size, breakpoint }) => {
  const [defaultSize, ...sizes] = size instanceof Array
    ? size
    : [size]

  let responsiveStyles = []

  if (sizes.length) {
    const breakpoints = breakpoint instanceof Array
      ? breakpoint
      : [breakpoint]

    // assert responsiveSizes.length === breakpoints.length
    responsiveStyles = breakpoints.map(
      (device, i) => {
        const style = typeScale[sizes[i]]

        // lol why is this join necessary :(
        return media[device]([], style).join('')
      }
    )
  }

  return [typeScale[defaultSize], ...responsiveStyles].join('')
}

const Text = styled.div`
  ${fontStyles}
  ${props => props.bold ? 'font-weight: bold;' : ''}
`
Text.displayName = 'Text'
export default Text
