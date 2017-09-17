import media from './media'
import {
  marginCSS,
  paddingCSS,
  widthCSS
} from './props-to-css'

export default ({
  breakpoints,
  margins = [],
  paddings = [],
  sizes = [],
  cssStrings = []
}) => {
  const marginRules = margins.map(margin => margin ? marginCSS(margin) : '')
  const paddingRules = paddings.map(padding => padding ? paddingCSS(padding) : '')
  const cssRules = cssStrings.map(cssString => cssString ? cssString  : '')
  const widthRules = sizes.map(size => size ? widthCSS(size) : '')

  const responsiveRules = breakpoints.map((device, i) => {
    const mediaQuery = media[device]
    const margin = marginRules[i]
    const padding = paddingRules[i]
    const css = cssRules[i]
    const width = widthRules[i]

    // need a join because of weird tagged template literal behaviour
    return mediaQuery`
      ${margin}
      ${padding}
      ${css}
      ${width}
    `.join('')
  })

  return responsiveRules.join('')
}
