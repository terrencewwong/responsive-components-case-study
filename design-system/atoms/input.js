import styled from 'styled-components'
import { unit, unitType } from '../config'

const INPUT_HEIGHT = 4 * unit + unitType
const INPUT_PADDING = 1.5 * unit + unitType

const Input = styled.input`
  height: ${INPUT_HEIGHT};
  width: 100%;

  border: none;
  outline: none;

  padding-left: ${INPUT_PADDING};
  padding-right: ${INPUT_PADDING};
  font-size: 19px;
`
Input.displayName = 'Input'
export default Input
