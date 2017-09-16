import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { WebpageLayout } from '../design-system/layouts'
import { Text } from '../design-system/atoms'
import { BaseStyles } from '../design-system/utils'

injectGlobal`
  * {
    margin: 0;
    box-sizing: border-box;
  }
`

export default () => (
  <BaseStyles>
    <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
      <Text size='size3' bold>Welcome to GOV.UK</Text>
    </WebpageLayout>
  </BaseStyles>
)
