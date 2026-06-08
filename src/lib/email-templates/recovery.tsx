import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Text } from '@react-email/components'
import { main, container, headerStrip, logoImg, LOGO_URL, LOGO_ALT, h1, text, button, footer} from './_brand'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({ confirmationUrl }: RecoveryEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Reset your Soul True password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}><Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} /></Section>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>
          We received a request to reset your Soul True password. Choose a new one with the button below.
        </Text>
        <Button style={button} href={confirmationUrl}>Reset Password</Button>
        <Text style={footer}>
          Didn't request this? You can safely ignore this email — your password will not change.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
