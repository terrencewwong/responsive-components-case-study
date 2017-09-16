import styled from 'styled-components'
import { typeScale } from '../config'

const Text = styled.div`
  ${props => typeScale[props.size]}
  ${props => props.bold ? 'font-weight: bold;' : ''}
`
Text.displayName = 'Text'
export default Text
