# Simple Gmail Sender

This library allows you to send emails through your gmail account from node.  
nodemailer is used behind the scenes as it's simply an abstraction over nodemailer for gmail.  

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021" />
  <a href="https://www.npmjs.com/package/simple-gmail-sender"><img src="https://img.shields.io/npm/l/simple-gmail-sender" /></a>
<br>
  <a href="https://www.npmjs.com/package/simple-gmail-sender"><img src="https://img.shields.io/npm/dw/simple-gmail-sender" /></a>
  <a href="https://www.npmjs.com/package/simple-gmail-sender"><img src="https://img.shields.io/npm/v/simple-gmail-sender" /></a>
</p>

## Installation

Simply run the following command:

```
npm install simple-gmail-sender
```
This library includes Typescript typing.

## Usage

the usage of the library is fairly straightforward:

```
import { GmailSender } from 'simple-gmail-sender'

const gmail = new GmailSender('your-mail@gmail.com', 'your-password')

// you can call sendMail function without any params.
// an empty mail will be sent your own address.
gmail.sendMail()

// you can set the destination of the mail.
gmail.sendMail({ to: 'dest@someplace.com' })

// you might send a given mail to multiple destinations.
gmail.sendMail({ to: ['dest1@someplace.com', 'dest2@someplace.com'] })

// all params are optionals (only a subset is displayed in this example).
gmail.sendMail({to: 'dest@someplace.com', text: 'Some Text', subject: 'Nice Subject', from: 'from@domain.com'})
```


in cases where you want to send mails without creating a new GmailSender instance  
you might use the function ```sendThroughGmail``` as such:

```
import { sendThroughGmail } from 'simple-gmail-sender'

// this functions takes the same params as the "GmailSender.sendMail" function,
// except that you have to supply the "user" and "password" params.
sendThroughGmail({user: 'your-mail@gmail.com', password: 'your-password', to: 'dest@someplace.com', text: 'Some Text'})
```


you will get back a promise from calling either ```sendThroughGmail```
or ```GmailSender.sendMail``` (which resolves to the same response):

```
import { sendThroughGmail, SentMessageInfo } from 'simple-gmail-sender'

sendThroughGmail({ user: 'your-mail@gmail.com', password: 'your-password' })
  .then((result: SentMessageInfo) => {
    console.log(result.response)
  })
  .catch((error: Error) => {
    console.log(error)
  })
```


## Security

It is not advised to use your own password for sending emails.
since gmail will block by default any plain-text password
that you'll send to it.  
you have 2 options to resolve this issue:

1. (Less Recommended) You might allow gmail to accept your plain-text password (called less secure apps):
   https://myaccount.google.com/lesssecureapps  
   NOTE: this setting is not available for accounts with 2-Step Verification enabled.
   
   
2. (Recommended) You might create a single-use password for your node app (called app passwords) through:  
   https://myaccount.google.com/apppasswords  
   after generating a single use password, use it instead of your own real password.  
   NOTE: app passwords can only be used with accounts that have 2-Step Verification turned on.