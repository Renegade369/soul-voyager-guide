import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import {
  main,
  container,
  headerStrip,
  logoImg,
  innerPadding,
  LOGO_URL,
  LOGO_ALT,
  h1,
  text,
  link,
  button,
  footer,
  BRAND,
} from './_brand'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  siteUrl?: string
  portalUrl?: string
  membershipUrl?: string
  williamSessionUrl?: string
  higherVibesUrl?: string
}

export const SovereignWelcomeTimeMachine = ({
  name,
  siteUrl = 'https://soul-true.com',
  portalUrl = 'https://soul-true.com/sovereign/portal',
  membershipUrl = 'https://soul-true.com/begin-here',
  williamSessionUrl = 'https://soul-true.com/book-session',
  higherVibesUrl = 'https://soul-true.com/higher-vibes',
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Let's Go Deeper. — One year from now.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerStrip}>
          <Img src={LOGO_URL} alt={LOGO_ALT} style={logoImg} />
        </Section>
        <Section style={innerPadding}>
          <Heading style={h1}>
            {name ? `${name},` : 'Initiate,'} one year from now.
          </Heading>
          <Text style={text}>
            A year from now, you'll either be the person who bought this program
            and did the work, or the person who bought this program and didn't.
          </Text>
          <Text style={text}>
            The first version is a person your past self wouldn't recognize. The
            second is the person you are right now.
          </Text>
          <Text style={text}>
            The door is open. Step through.
          </Text>
          <Button style={button} href={portalUrl}>
            Begin Module One
          </Button>

          <Text style={{ ...text, marginTop: '32px', color: BRAND.gold, fontStyle: 'italic' }}>
            When you're ready to go deeper still:
          </Text>
          <Text style={text}>
            ✦ <Link href={membershipUrl} style={link}>Soul True Membership</Link> — $36/mo.
            Daily practices and the full sanctuary.
          </Text>
          <Text style={text}>
            ✦ <Link href={williamSessionUrl} style={link}>1-on-1 with William</Link> — for
            when the work asks for a witness.
          </Text>
          <Text style={text}>
            ✦ <Link href={higherVibesUrl} style={link}>Higher Vibes with Kim Alfano</Link> —
            sister-circle coaching for the extended path.
          </Text>

          <Text style={footer}>
            Soul True — Field notes for the awakening mind. You're receiving this
            because you enrolled in The Sovereignty Code.{' '}
            <Link href={siteUrl} style={link}>soul-true.com</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SovereignWelcomeTimeMachine,
  subject: "Let's Go Deeper. — One year from now.",
  displayName: 'Sovereign Welcome — Time Machine',
  previewData: { name: 'Traveler' },
} satisfies TemplateEntry

export default SovereignWelcomeTimeMachine
