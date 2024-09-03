import { Contact } from "./Contact";

export interface InputFormProps {
  openModal: () => void;
  groupList: string[];
  setContactList: React.Dispatch<React.SetStateAction<Contact[]>>;
  contactList: Contact[];
}

export interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>; // setGroupList 타입
}

export interface ContactListProps {
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  contactList: Contact[];
  setContactList: React.Dispatch<React.SetStateAction<Contact[]>>;
  openContactDetailModal: () => void;
}

export interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Contact;
}
