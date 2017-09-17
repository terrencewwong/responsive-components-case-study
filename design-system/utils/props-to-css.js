import { unit, unitType } from '../config'

export const widthCSS = size => {
  // TODO create a mapping in config.js for this
  if (size === 'remaining') return 'flex: 1;'
  if (size === 'full') return 'width: 100%;'

  return `width: ${size};`
}

const spaceCSSGenerator = property => coefficients => {
  if (!coefficients) return ''

  const stringified = coefficients
    .map(coefficient => coefficient * unit + unitType)
    .join(' ')

  return `${property} ${stringified};`
}

export const marginCSS = spaceCSSGenerator('margin')
export const paddingCSS = spaceCSSGenerator('padding')
