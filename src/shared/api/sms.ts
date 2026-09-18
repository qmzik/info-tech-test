import { SMS_ENDPOINT } from '@/shared/config'

export interface SmsResult {
  sent: boolean
  text: string
}

export async function sendSms(phone: string, text: string): Promise<SmsResult> {
  const apiKey = import.meta.env.VITE_SMSPILOT_API_KEY
  if (!apiKey) {
    return { sent: false, text }
  }

  const url = new URL(SMS_ENDPOINT)
  url.searchParams.set('send', text)
  url.searchParams.set('to', phone)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('format', 'json')

  try {
    const response = await fetch(url.toString())
    if (!response.ok) {
      return { sent: false, text }
    }
    const payload = (await response.json()) as { send?: unknown; error?: unknown }
    return { sent: Array.isArray(payload.send) && !payload.error, text }
  } catch {
    return { sent: false, text }
  }
}
