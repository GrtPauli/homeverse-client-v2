import { AgoraChat } from 'agora-chat'

interface IProps {
  conn: AgoraChat.Connection
  onConnectedListener: Function[]
  onTextMessageListener: (msg: any) => void
}

export const agoraEventHandler = ({
  conn,
  onConnectedListener,
  onTextMessageListener,
}: IProps) => {
  conn.addEventHandler('AgoraEventHandler', {
    onConnected: () => {
      console.log('Connected To App')
      onConnectedListener.forEach((item, i) => {
        item()
      })
    },
    onDisconnected: () => {
      console.log('Disconnected from App')
    },
    // Occurs when the contact invitation is received
    onContactInvited: (msg) => {
      console.log('New Contact Request')
      console.log(msg)
    },
    // Occurs when the contact is deleted
    onContactDeleted: function (msg) {},
    // Occurs when a contact is added
    onContactAdded: (msg) => {
      console.log('Contact Request Sent')
      console.log(msg)
    },
    // Occurs when the contact invitation is declined
    onContactRefuse: function (msg) {},
    // Occurs when the contact invitation is approved
    onContactAgreed: (msg) => {
      console.log('Contact Request Accepted')
      console.log(msg)
    },
    // Occurs when the text message is received.
    onTextMessage: (msg) => {
      // onTextMessageListener(msg)
    },
    // // Occurs when the emoji message is received.
    // onEmojiMessage: function (message) {},
    // Occurs when the image message is received.
    onImageMessage: function (message) {},
    // Occurs when the CMD message is received.
    onCmdMessage: function (message) {},
    // Occurs when the audio message is received.
    onAudioMessage: function (message) {},
    // Occurs when the location message is received.
    onLocationMessage: function (message) {},
    // Occurs when the file message is received.
    onFileMessage: function (message) {},
    // Occurs when the custom message is received.
    onCustomMessage: function (message) {},
    // Occurs when the video message is received.
    onVideoMessage: function (message) {},
    // Occurs when the presence state is updated.
    onPresence: function (message) {},
    // // Occurs when a contact invitation is received.
    // onRoster: function (message) {},
    // Occurs when a group invitation is received.
    // onInviteMessage: function (message) {},
    // // Occurs when the local network is connected.
    onOnline: function () {},
    // Occurs when the local network is disconnected.
    onOffline: function () {},
    // Occurs when an error occurs.
    onError: function (message) {},
    // // Occurs when the block list is updated, for example, if you add a contact to the block list. list contains all the usernames on the block list.
    // onBlacklistUpdate: function (list) {
    // },
    // Occurs when the message is recalled.
    onRecallMessage: function (message) {},
    // Occurs when the message is received.
    onReceivedMessage: function (message) {},
    // Occurs when the message delevery receipt is received.
    onDeliveredMessage: function (message) {},
    // Occurs when the message read receipt is received.
    onReadMessage: function (message) {},
    // Occurs when the local user is muted and still attempts to send a group message. This callback is triggered only on the local client, not on other clients in the group.
    // onMutedMessage: function (message) {},
    // Occurs when the conversation read receipt is received.
    onChannelMessage: function (message) {},
  })
}
