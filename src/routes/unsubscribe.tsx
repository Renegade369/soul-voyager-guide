import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/unsubscribe')({
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === 'string' ? search.token : '',
  }),
  component: UnsubscribePage,
})

type Status = 'loading' | 'ready' | 'already' | 'invalid' | 'done' | 'error'

function UnsubscribePage() {
  const { token } = useSearch({ from: '/unsubscribe' })
  const [status, setStatus] = useState<Status>('loading')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      return
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(token)}`)
      .then(async (res) => {
        const body = await res.json().catch(() => ({}))
        if (!res.ok) return setStatus('invalid')
        if (body.valid === false && body.reason === 'already_unsubscribed') return setStatus('already')
        if (body.valid === true) return setStatus('ready')
        setStatus('invalid')
      })
      .catch(() => setStatus('error'))
  }, [token])

  const confirm = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.success) setStatus('done')
      else if (body?.reason === 'already_unsubscribed') setStatus('already')
      else setStatus('error')
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full bg-card border border-primary/20 rounded p-10 text-center">
        <p className="text-primary tracking-[0.22em] uppercase text-xs mb-6 font-light">Soul True</p>
        {status === 'loading' && <p className="text-foreground/80 font-light">Validating your request…</p>}
        {status === 'ready' && (
          <>
            <h1 className="font-serif italic text-3xl text-foreground mb-4">Unsubscribe?</h1>
            <p className="text-foreground/70 font-light mb-8 leading-relaxed">
              Confirm to stop receiving emails from Soul True. You can resubscribe anytime by contacting us.
            </p>
            <button
              onClick={confirm}
              disabled={submitting}
              className="bg-primary text-background uppercase tracking-[0.22em] text-[11px] font-bold px-8 py-4 rounded hover:shadow-[0_0_24px_rgba(232,130,26,0.5)] transition-shadow disabled:opacity-60"
            >
              {submitting ? 'Processing…' : 'Confirm Unsubscribe'}
            </button>
          </>
        )}
        {status === 'done' && (
          <>
            <h1 className="font-serif italic text-3xl text-foreground mb-4">You're unsubscribed</h1>
            <p className="text-foreground/70 font-light">You will no longer receive emails from Soul True.</p>
          </>
        )}
        {status === 'already' && (
          <>
            <h1 className="font-serif italic text-3xl text-foreground mb-4">Already unsubscribed</h1>
            <p className="text-foreground/70 font-light">This email address has already been removed from our list.</p>
          </>
        )}
        {status === 'invalid' && (
          <>
            <h1 className="font-serif italic text-3xl text-foreground mb-4">Invalid link</h1>
            <p className="text-foreground/70 font-light">This unsubscribe link is invalid or has expired.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="font-serif italic text-3xl text-foreground mb-4">Something went wrong</h1>
            <p className="text-foreground/70 font-light">Please try again in a moment.</p>
          </>
        )}
      </div>
    </main>
  )
}
