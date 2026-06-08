import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { main, container, headerStrip, logoImg, LOGO_URL, LOGO_ALT, h1, text, link, button, footer} from './_brand'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You've been invited to Soul True</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}><Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} /></Section>
        <Heading style={h1}>You've been invited</Heading>
        <Text style={text}>
          You've been invited to join <Link href={siteUrl} style={link}><strong>Soul True</strong></Link>. Accept below to create your sanctuary.
        </Text>
        <Button style={button} href={confirmationUrl}>Accept Invitation</Button>
        <Text style={footer}>If you weren't expecting this, you can safely ignore this email.</Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
