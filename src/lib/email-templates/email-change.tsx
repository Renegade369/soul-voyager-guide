import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { main, container, headerStrip, logoImg, innerPadding, LOGO_URL, LOGO_ALT, h1, text, link, button, footer} from './_brand'

interface EmailChangeEmailProps {
  siteName: string
  oldEmail: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({ oldEmail, newEmail, confirmationUrl }: EmailChangeEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email change for Soul True</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}><Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} /></Section>
        <Section style={innerPadding}>
        <Heading style={h1}>Confirm your email change</Heading>
        <Text style={text}>
          You requested to change your Soul True email from{' '}
          <Link href={`mailto:${oldEmail}`} style={link}>{oldEmail}</Link> to{' '}
          <Link href={`mailto:${newEmail}`} style={link}>{newEmail}</Link>.
        </Text>
        <Button style={button} href={confirmationUrl}>Confirm Change</Button>
        <Text style={footer}>
          If you didn't request this, please secure your account immediately.
        </Text>
      </Section>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
