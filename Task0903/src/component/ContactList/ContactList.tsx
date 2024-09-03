import { useState } from "react";
import { Contact } from "../../type/Contact";
import { ContactListProps } from "../../type/Props";
import "./ContactList.css";
const ContactList: React.FC<ContactListProps> = ({
  setSelectedIndex,
  contactList,
  setContactList,
  openContactDetailModal,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleRemoveBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 클릭된 버튼의 data-index 속성 값 가져옴.
    const index: number = parseInt(
      event.currentTarget.getAttribute("data-index")!,
      10
    );
    removeContactWithIndex(index);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchKeyword(value);
  };
  const handleAllListBtnClick = () => {
    searchWithKeyword("");
    setSearchKeyword("");
  };
  const handleKeyboardInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      searchWithKeyword(searchKeyword);
      setSearchKeyword("");
    }
  };
  function getContactListFromLocalStorage(): Contact[] {
    const str = localStorage.getItem("contactList");
    if (str) return JSON.parse(str) as Contact[];
    else return [];
  }
  function searchWithKeyword(keyword: string) {
    const newList: Contact[] = [];
    const allList: Contact[] = getContactListFromLocalStorage();
    allList.forEach((e) => {
      if (isKeywordContain(e, keyword)) {
        newList.push(e);
      }
    });
    setContactList(newList);
  }
  function isKeywordContain(contact: Contact, keyword: string): boolean {
    if (
      contact.group.includes(keyword) ||
      contact.memo.includes(keyword) ||
      contact.name.includes(keyword) ||
      contact.phone.includes(keyword)
    )
      return true;
    else return false;
  }
  const handleDetailBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 클릭된 버튼의 data-index 속성 값 가져옴.
    const index: number = parseInt(
      event.currentTarget.getAttribute("data-index")!,
      10
    );
    setSelectedIndex(index);
    openContactDetailModal();
  };
  function removeContactWithIndex(index: number) {
    const newList = contactList.filter((_, i) => i !== index);
    setContactList(newList);
    localStorage.setItem("contactList", JSON.stringify(newList));
  }
  return (
    <div className="cotact-list-con">
      <div className="search-con">
        <input
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyUp={handleKeyboardInput}
          placeholder="검색어를 입력 후 엔터를 누르세요"
        ></input>
        <button className="btn-blue" onClick={handleAllListBtnClick}>
          전체리스트 보기
        </button>
      </div>
      <ul className="contact-list">
        {contactList.length === 0 ? (
          <h1>검색 결과가 존재하지 않습니다.</h1>
        ) : (
          contactList.map((contact, index) => (
            <li key={index}>
              <div className="contact-item-info">
                <span>{contact.name}</span>
                <span>{contact.phone}</span>
                <span>{contact.group}</span>
              </div>

              <div className="contact-item-bnts">
                <button data-index={index} onClick={handleDetailBtnClick}>
                  세부사항
                </button>
                <button data-index={index} onClick={handleRemoveBtnClick}>
                  삭제
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default ContactList;
