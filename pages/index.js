import React from 'react'
import styled from 'styled-components'
import { WebpageLayout } from '../design-system/layouts'
import { Text } from '../design-system/atoms'

export default () => (
  <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
    <Text size='size3' bold>My page</Text>
  </WebpageLayout>
)
