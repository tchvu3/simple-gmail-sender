import { MailOptions, sendThroughGmail, SendThroughGmailPayload, SentMessageInfo, } from './send-through-gmail'

export class GmailSender {
  constructor (public user: string, public password: string) {}

  sendMail (mailOptions: MailOptions = {}): Promise<SentMessageInfo> {
    const payload: SendThroughGmailPayload = { user: this.user, password: this.password, ...mailOptions }
    return sendThroughGmail(payload)
  }
}
