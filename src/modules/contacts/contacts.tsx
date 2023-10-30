import React from 'react'
import { ContactItem, NoContacts } from './components'
import { useContactContext } from './context'

export const Contacts = () => {
  const { contacts } = useContactContext()
  console.log(contacts)

  return (
    <div>
      {contacts.length == 0 && <NoContacts />}
      {contacts.length > 0 &&
        contacts.map((contact, i) => <ContactItem contact={contact} key={i} index={i} />)}
    </div>
  )
}
