import React from 'react'
import { Container, Spacer } from '../design-system/layouts'
import { Input, Text } from '../design-system/atoms'

const WelcomeSection = ({ className }) => (
  <Container className={className}>
    <Spacer bottom={1.5}>
      <Text breakpoint='tablet' size={['size2', 'size3']} bold>
        Welcome to GOV.UK
      </Text>
    </Spacer>
    <Spacer bottom={2}>
      <Text breakpoint='tablet' size={['sizen1', 'size1']}>
        The best place to find government services and information
      </Text>
      <Text breakpoint='tablet' size={['sizen1', 'size1']} bold>
        Simpler, clearer, faster
      </Text>
    </Spacer>
    <Input placeholder='Search GOV.UK' />
  </Container>
)
export default WelcomeSection
