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
        <Column
          size={['full', '66.66%']}
          margin={[
            [0],
            [0, 3, 0, 0]
          ]}
        >
          <Spacer bottom={3}>
            <WelcomeSection />
          </Spacer>
        </Column>
        <Column
          size={['full', 'remaining']}
          padding={[
            [0, 0, 2, 0],
            [2]
          ]}
          margin={[
            [0],
            [0.5, 0, 0, 0]
          ]}
          responsiveCSS={['', 'background-color: black;']}
        >
          <PopularLinks />
        </Column>
      </ColumnDrop>
    </WebpageLayout>
  </BaseStyles>
)
