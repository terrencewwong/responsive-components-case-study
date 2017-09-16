import React from 'react'
import styled from 'styled-components'
import { Container, Spacer, WebpageLayout } from '../design-system/layouts'
import { Input, Text, Link, LinkMenu } from '../design-system/atoms'
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

      <Container bottom={2}>
        <Spacer bottom={0.5}>
          <Text size='sizen3'>Popular on GOV.UK</Text>
        </Spacer>
        <LinkMenu size='sizen2' bold>
          <Link href='#'>Universal Jobmatch job search</Link>
          <Link href='#'>Renew vehicle tax</Link>
          <Link href='#'>Log in to student finance</Link>
          <Link href='#'>Book your theory test</Link>
          <Link href='#'>Personal tax account</Link>
        </LinkMenu>
      </Container>
    </WebpageLayout>
  </BaseStyles>
)
