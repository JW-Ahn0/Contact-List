import { useState } from "react";
import InputForm from "./component/InputForm/InputForm";
import InputModal from "./component/InputForm/InputModal";
import ContactList from "./component/ContactList/ContactList";
import ContactDetailModal from "./component/ContactList/ContactDetailModal";
import {
  getContactListFromLocalStorage,
  getGroupFromLocalStorage,
} from "./util/localStorage";

function App() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isContactDetailModalOpen, setIsContactDetailModalOpen] =
    useState(false);
  const [groupList, setGroupList] = useState(getGroupFromLocalStorage());
  const [contactList, setContactList] = useState(
    getContactListFromLocalStorage()
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setIsGroupModalOpen(false);
  };
  const openContactDetailModal = () => {
    setIsContactDetailModalOpen(true);
  };

  const closeContactDetailModal = () => {
    setIsContactDetailModalOpen(false);
  };

  return (
    <>
      <InputForm
        openModal={openGroupModal}
        groupList={groupList}
        contactList={contactList}
        setContactList={setContactList}
      />
      <ContactList
        setSelectedIndex={setSelectedIndex}
        contactList={contactList}
        setContactList={setContactList}
        openContactDetailModal={openContactDetailModal}
      />
      <ContactDetailModal
        isOpen={isContactDetailModalOpen}
        onClose={closeContactDetailModal}
        item={contactList[selectedIndex]}
      />
      <InputModal
        isOpen={isGroupModalOpen}
        onClose={closeGroupModal}
        groupList={groupList}
        setGroupList={setGroupList}
      />
    </>
  );
}

export default App;
