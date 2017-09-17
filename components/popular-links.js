import React from 'react'
import { Container, Spacer } from '../design-system/layouts'
import { Text, Link, LinkMenu } from '../design-system/atoms'

const PopularLinks = ({ className }) => (
  <Container className={className}>
    <Spacer bottom={0.5}>
      <Text breakpoint='tablet' size={['sizen3', 'sizen2']}>
        Popular on GOV.UK
      </Text>
    </Spacer>
    <LinkMenu breakpoint='tablet' size={['sizen2', 'size0']} bold>
      <Link href='#'>Universal Jobmatch job search</Link>
      <Link href='#'>Renew vehicle tax</Link>
      <Link href='#'>Log in to student finance</Link>
      <Link href='#'>Book your theory test</Link>
      <Link href='#'>Personal tax account</Link>
    </LinkMenu>
  </Container>
)
export default PopularLinks
