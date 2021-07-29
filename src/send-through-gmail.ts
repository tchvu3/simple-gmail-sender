import * as nodemailer from 'nodemailer'
import * as smtpTransport from 'nodemailer-smtp-transport'
import * as Mail from 'nodemailer/lib/mailer'
import * as SMTPTransport from 'nodemailer/lib/smtp-transport'

export type MailOptions = Mail.Options

export interface SendThroughGmailPayload extends MailOptions {
  user: string
  password: string
}

export type SentMessageInfo = SMTPTransport.SentMessageInfo

export function sendThroughGmail (payload: SendThroughGmailPayload): Promise<SentMessageInfo> {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: { user: payload.user, pass: payload.password },
    })
  )

  const defaultMailOptions: MailOptions = { from: payload.user, to: payload.user, subject: '', text: '' }
  const mailOptions: MailOptions = { ...defaultMailOptions, ...payload }

  return new Promise<SentMessageInfo>((resolve, error) => {
    transporter.sendMail(mailOptions, (errorResult: Error, valueResult: SentMessageInfo) => {
        if (errorResult) {
          error(errorResult)
        } else {
          resolve(valueResult)
        }
      }
    )
  })
}
