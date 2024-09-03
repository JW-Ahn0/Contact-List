import { ChangeEvent, useState } from "react";

// InputModal의 Props 인터페이스 정의
interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupList: string[];
  setGroupList: React.Dispatch<React.SetStateAction<string[]>>; // setGroupList 타입
}

// 모달 컴포넌트
const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  groupList,
  setGroupList,
}) => {
  const [groupName, setGroupName] = useState("");
  if (!isOpen) return null;

  function setGroupListAtLocalStorage(groupList: string[]): void {
    localStorage.setItem("group", JSON.stringify(groupList));
  }

  function removeGroupWithIndex(index: number) {
    const newList = groupList.filter((_, i) => i !== index);
    setGroupList(newList);
    setGroupListAtLocalStorage(newList);
  }
  function addGroupWithName(name: string) {
    //중복 그룹 없애기 위해서
    if (groupList.indexOf(name) != -1) return;
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
    <div>
      <button onClick={onClose}>닫기</button>
      <div>
        <h2>그룹 관리</h2>
        <ul>
          {groupList.map((group, index) => (
            <li key={index}>
              <span>{group}</span>
              <button data-index={index} onClick={handleRemoveBtnClick}>
                X
              </button>
            </li>
          ))}
        </ul>
        <input type="text" value={groupName} onChange={handleInputChange} />
        <button onClick={handleAddBtnClick}>추가</button>
      </div>
    </div>
  );
};

export default InputModal;
