import { ChangeEvent, useState } from "react";
import { InputModalProps } from "../../type/Props";
import { setGroupListAtLocalStorage } from "../../util/localStorage";
import "./InputModal.css";
// 모달 컴포넌트
const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  groupList,
  setGroupList,
}) => {
  const [groupName, setGroupName] = useState("");
  if (!isOpen) return null;

  function removeGroupWithIndex(index: number) {
    const newList = groupList.filter((_, i) => i !== index);
    setGroupList(newList);
    setGroupListAtLocalStorage(newList);
  }
  function addGroupWithName(name: string) {
    //중복 그룹 없애기 위해서
    if (groupList.indexOf(name) != -1) {
      alert("중복 그룹이 존재합니다. 추가할 수 없습니다.");
      return;
    }
    const newList = [...groupList, name];
    setGroupList(newList);
    setGroupListAtLocalStorage(newList);
    setGroupName("");
  }
  const handleRemoveBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 클릭된 버튼의 data-index 속성 값 가져옴.
    const index: number = parseInt(
      event.currentTarget.getAttribute("data-index")!,
      10
    );
    removeGroupWithIndex(index);
  };
  const handleAddBtnClick = () => {
    if (!groupName) return;
    addGroupWithName(groupName);
  };

  const handleInputChange = (event: ChangeEvent) => {
    const Element = event.target as HTMLInputElement;
    setGroupName(Element.value);
  };
  return (
    <div className="modal-overlay">
      <button className="btn-orange" onClick={onClose}>
        닫기
      </button>
      <div className="modal-content">
        <h2>그룹 관리</h2>
        <ul>
          {groupList.map((group, index) => (
            <li key={index}>
              <span>{group}</span>
              <button
                className="group-item-delete-btn"
                data-index={index}
                onClick={handleRemoveBtnClick}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="group-modal-input-con">
          <input
            type="text"
            value={groupName}
            onChange={handleInputChange}
            placeholder="새 그룹 이름 "
          />
          <button onClick={handleAddBtnClick}>추가</button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
