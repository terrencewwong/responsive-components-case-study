import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Spacer, WebpageLayout } from '../design-system/layouts'
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
      <Spacer bottom={1.5}>
        <Text size='size3' bold>Welcome to GOV.UK</Text>
      </Spacer>
    </WebpageLayout>
  </BaseStyles>
)
