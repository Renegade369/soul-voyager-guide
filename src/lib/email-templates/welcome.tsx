import * as React from 'react'
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from '@react-email/components'
import { main, container, headerStrip, logoImg, LOGO_URL, LOGO_ALT, h1, text, link, button, footer} from './_brand'
import type { TemplateEntry } from './registry'

interface WelcomeProps {
  name?: string
  siteUrl?: string
}

export const WelcomeEmail = ({ name, siteUrl = 'https://soul-true.com' }: WelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to Soul True — your sanctuary awaits</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brandMark}>{SITE_NAME_DISPLAY}</Text>
        <Heading style={h1}>{name ? `Welcome, ${name}` : 'Welcome, traveler'}</Heading>
        <Text style={text}>
          You've stepped into Soul True — a quiet space for frequency, reflection, and the practices that help you return to yourself.
        </Text>
        <Text style={text}>
          Begin where you feel called: the readings, the meditations, or the sacred journey.
        </Text>
        <Button style={button} href={siteUrl}>Enter Soul True</Button>
        <Text style={footer}>
          Soul True content is for educational and inspirational purposes only.{' '}
          <Link href={siteUrl} style={link}>soul-true.com</Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeEmail,
  subject: 'Welcome to Soul True',
  displayName: 'Welcome',
  previewData: { name: 'Traveler', siteUrl: 'https://soul-true.com' },
} satisfies TemplateEntry

export default WelcomeEmail
