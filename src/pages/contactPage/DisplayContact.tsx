import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultContacts } from "@/lib/conversation";
import { setCurrentConversation } from "@/state/currentConversation/currentConversationSlice";
import { RootState } from "@/state/store";
import { Contact } from "@/types/Message";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function DisplayContact() {
  const currentContact = useSelector(
    (state: RootState) => state.currentConversation
  );
  const dispatch = useDispatch();
  const { tag } = useParams();

  const initialValue = window.localStorage.getItem("ContactList");

  const [contacts, setContacts] = useState(
    initialValue ? JSON.parse(initialValue) : defaultContacts
  );

  useEffect(() => {
    window.localStorage.setItem("ContactList", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    function nameExists(): boolean {
      return contacts.some((contact: Contact) => contact.name === tag);
    }

    if (!nameExists() && tag !== undefined) {
      const newContact: Contact = {
        id: contacts.length + 1,
        name: tag,
        avatar: "placeholder.svg?height=32&width=32",
        link: `/message/${tag}`,
      };

      setContacts((prevContacts: Contact[]) => [...prevContacts, newContact]);
      dispatch(setCurrentConversation(newContact.id));
    }
  }, [tag]);

  return (
    <>
      <div className="absolute top-0 left-0 w-60 bg-background border-l border-border shadow-2xl h-screen">
        <div className="p-4 pt-24">
          <h2 className="text-lg font-semibold mb-4">Contacts</h2>
          <ul className="space-y-2">
            {contacts.map((contact: Contact) => (
              <Link to={contact.link} key={contact.id}>
                <li
                  className={`flex items-center p-2 hover:bg-secondary rounded cursor-pointer ${
                    currentContact === contact.id &&
                    "bg-primary text-white hover:bg-slate-800"
                  }`}
                  onClick={() => dispatch(setCurrentConversation(contact.id))}
                >
                  <Avatar className="w-8 h-8 mr-21">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback
                      className={`${
                        currentContact === contact.id && "bg-slate-800"
                      }`}
                    >
                      {contact.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm ml-2">{contact.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
