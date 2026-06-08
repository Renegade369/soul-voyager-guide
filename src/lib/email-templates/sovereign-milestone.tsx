import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  firstName?: string;
  milestone?: string;
  moduleTitle?: string;
  nextHref?: string;
  nextLabel?: string;
}

const Email = ({
  firstName,
  milestone = "Awakened",
  moduleTitle = "Module 1",
  nextHref = "https://soul-true.com/sovereign/portal/dashboard",
  nextLabel = "Continue the work",
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You are {milestone}. — Let's Go Deeper.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={kicker}>The Sovereignty Code</Text>
        <Heading style={h1}>{milestone}.</Heading>
        <Text style={body}>
          {firstName ? `${firstName}, ` : ""}you've completed {moduleTitle}.
        </Text>
        <Text style={body}>
          A year ago, you couldn't have. Most never will. You did.
        </Text>
        <Text style={body}>
          The version of you that didn't start is still waiting. The version
          that did is already becoming. Don't break the chain.
        </Text>
        <Section style={{ marginTop: 32, marginBottom: 32 }}>
          <Link href={nextHref} style={cta}>
            {nextLabel}
          </Link>
        </Section>
        <Text style={tagline}>Let's Go Deeper.</Text>
        <Text style={footer}>Soul True · soul-true.com</Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `Let's Go Deeper. — You are ${d?.milestone ?? "Awakened"}.`,
  displayName: "Sovereignty Code — Milestone",
  previewData: {
    firstName: "Friend",
    milestone: "Awakened",
    moduleTitle: "Module 1 — Awakening",
    nextHref: "https://soul-true.com/sovereign/portal/modules",
    nextLabel: "Continue to Stripping",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "Georgia, 'Cormorant Garamond', serif" };
const container = { padding: "40px 32px", maxWidth: "560px", margin: "0 auto" };
const kicker = {
  fontFamily: "Arial, sans-serif",
  fontSize: "11px",
  letterSpacing: "0.32em",
  textTransform: "uppercase" as const,
  color: "#C9A84C",
  margin: "0 0 12px",
};
const h1 = {
  fontFamily: "Georgia, 'Cormorant Garamond', serif",
  fontSize: "48px",
  fontWeight: 300,
  color: "#0A0A0A",
  margin: "0 0 24px",
  lineHeight: "1.1",
};
const body = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  color: "#1A1209",
  lineHeight: "1.65",
  margin: "0 0 16px",
};
const cta = {
  display: "inline-block",
  backgroundColor: "#C9A84C",
  color: "#0A0A0A",
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  fontWeight: "bold" as const,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  textDecoration: "none",
  padding: "14px 28px",
};
const tagline = {
  fontFamily: "Georgia, 'Cormorant Garamond', serif",
  fontStyle: "italic" as const,
  fontSize: "20px",
  color: "#C9A84C",
  margin: "32px 0 8px",
};
const footer = {
  fontFamily: "Arial, sans-serif",
  fontSize: "12px",
  color: "#888888",
  margin: 0,
};
