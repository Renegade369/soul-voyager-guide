import * as React from 'react'
import {
  Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text,
} from '@react-email/components'
import { main, container, headerStrip, logoImg, LOGO_URL, LOGO_ALT, h1, text, link, button, footer} from './_brand'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ siteUrl, recipient, confirmationUrl }: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Confirm your email to begin your Soul True journey</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}><Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} /></Section>
        <Heading style={h1}>Welcome, traveler</Heading>
        <Text style={text}>
          Thank you for stepping into <Link href={siteUrl} style={link}>Soul True</Link>. Please confirm{' '}
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link> to activate your sanctuary.
        </Text>
        <Button style={button} href={confirmationUrl}>Confirm Email</Button>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this message. Soul True content is for educational and inspirational purposes only.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
