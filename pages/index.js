import React from 'react'
import styled from 'styled-components'

import { BaseStyles } from '../design-system/utils'
import { Column, ColumnDrop, Spacer, WebpageLayout } from '../design-system/layouts'

import WelcomeSection from '../components/welcome-section'
import PopularLinks from '../components/popular-links'

export default () => (
  <BaseStyles>
    <WebpageLayout maxWidth='1020px' padding={[2.5, 2, 0, 2]}>
      <ColumnDrop breakpoint='tablet'>
        <Column width='66.66%'>
          <Spacer bottom={3}>
            <WelcomeSection />
          </Spacer>
        </Column>
        <Column width='33.33%'>
          <PopularLinks />
        </Column>
      </ColumnDrop>
    </WebpageLayout>
  </BaseStyles>
)
