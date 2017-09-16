import React from 'react'
import styled from 'styled-components'

import { BaseStyles } from '../design-system/utils'
import { Spacer, WebpageLayout } from '../design-system/layouts'

import WelcomeSection from '../components/welcome-section'
import PopularLinks from '../components/popular-links'

export default () => (
  <BaseStyles>
    <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
      <Spacer bottom={3}>
        <WelcomeSection />
      </Spacer>
      <PopularLinks />
    </WebpageLayout>
  </BaseStyles>
)
