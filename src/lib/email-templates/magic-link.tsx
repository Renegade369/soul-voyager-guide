import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Text } from '@react-email/components'
import { main, container, headerStrip, logoImg, innerPadding, LOGO_URL, LOGO_ALT, h1, text, button, footer} from './_brand'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Soul True sign-in link</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}><Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} /></Section>
        <Section style={innerPadding}>
        <Heading style={h1}>Your sign-in link</Heading>
        <Text style={text}>
          Tap below to enter Soul True. This link expires shortly for your security.
        </Text>
        <Button style={button} href={confirmationUrl}>Sign In</Button>
        <Text style={footer}>If you didn't request this link, you can safely ignore this email.</Text>
      </Section>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
