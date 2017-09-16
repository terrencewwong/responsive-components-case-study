import React from 'react'
import { Container, Spacer } from '../design-system/layouts'
import { Input, Text } from '../design-system/atoms'

const WelcomeSection = ({ className }) => (
  <Container className={className}>
    <Spacer bottom={1.5}>
      <Text size='size2' bold>Welcome to GOV.UK</Text>
    </Spacer>
    <Spacer bottom={2}>
      <Text size='sizen1'>The best place to find government services and information</Text>
      <Text size='sizen1' bold>Simpler, clearer, faster</Text>
    </Spacer>
    <Input placeholder='Search GOV.UK' />
  </Container>
)
export default WelcomeSection
