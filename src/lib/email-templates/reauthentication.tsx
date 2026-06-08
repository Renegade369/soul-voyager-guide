import * as React from 'react'
import { Body, Container, Head, Heading, Html, Img, Preview, Section, Text } from '@react-email/components'
import { main, container, headerStrip, logoImg, LOGO_URL, LOGO_ALT, h1, text, codeStyle, footer} from './_brand'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Soul True verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}><Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} /></Section>
        <Heading style={h1}>Confirm it's you</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code expires shortly. If you didn't request it, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
