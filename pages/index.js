import React from 'react'
import styled from 'styled-components'
import { Spacer, WebpageLayout } from '../design-system/layouts'
import { Input, Text } from '../design-system/atoms'
import { BaseStyles } from '../design-system/utils'

export default () => (
  <BaseStyles>
    <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
      <Spacer bottom={1.5}>
        <Text size='size2' bold>Welcome to GOV.UK</Text>
      </Spacer>
      <Spacer bottom={2}>
        <Text size='sizen1'>The best place to find government services and information</Text>
        <Text size='sizen1' bold>Simpler, clearer, faster</Text>
      </Spacer>
      <Spacer bottom={3}>
        <Input placeholder='Search GOV.UK' />
      </Spacer>

      <Spacer bottom={0.5}>
        <Text size='sizen3'>Popular on GOV.UK</Text>
      </Spacer>
    </WebpageLayout>
  </BaseStyles>
)
