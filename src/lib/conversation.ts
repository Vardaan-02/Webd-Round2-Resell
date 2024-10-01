import { Contact, Message } from "@/types/Message";

export const dummyConversation: Message[] = [
  { id: 1, text: "Hello! How can I assist you today?", sender: "seller" },
  {
    id: 2,
    text: "Hi there! I have a question about my account.",
    sender: "user",
  },
  {
    id: 3,
    text: "Of course! I'd be happy to help. What specific question do you have about your account?",
    sender: "seller",
  },
];

export const defaultContacts: Contact[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    link: "/message/Alice Johnson",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/placeholder.svg?height=32&width=32",
    link: "/message/Bob Smith",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    link: "/message/Charlie Brown",
  },
  {
    id: 4,
    name: "Diana Prince",
    avatar: "/placeholder.svg?height=32&width=32",
    link: "/message/Diana Prince",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    avatar: "/placeholder.svg?height=32&width=32",
    link: "/message/Ethan Hunt",
  },
];
