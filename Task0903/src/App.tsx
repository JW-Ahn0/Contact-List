import { useState } from "react";
import InputForm from "./component/InputForm/InputForm";
import InputModal from "./component/InputForm/InputModal";
interface Contact {
  name: string;
  phone: string;
  group: string;
  memo: string;
}

function App() {
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [groupList, setGroupList] = useState(getGroupFromLocalStorage());
  const [contactList, setContactList] = useState(
    getContactListFromLocalStorage()
  );
  const openGroupModal = () => {
    setIsGroupModalOpen(true);
  };

  const closeGroupModal = () => {
    setIsGroupModalOpen(false);
  };
  function getGroupFromLocalStorage(): string[] {
    const str = localStorage.getItem("group");
    if (str) return JSON.parse(str) as string[];
    else return ["가족", "친구", "직장", "스터디"];
  }

  function getContactListFromLocalStorage(): Contact[] {
    const str = localStorage.getItem("contactList");
    if (str) return JSON.parse(str) as Contact[];
    else return [];
  }
  // function setContactListAtLocalStorage(list: Contact[], item: Contact): void {
  //   list.unshift(item);
  //   localStorage.setItem("contactList", JSON.stringify(list));
  // }
  return (
    <>
      <InputForm
        openModal={openGroupModal}
        groupList={groupList}
        contactList={contactList}
        setContactList={setContactList}
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
