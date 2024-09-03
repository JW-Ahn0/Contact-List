import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { Contact } from "../../type/Contact";
import { InputFormProps } from "../../type/Props";
import { asssertType } from "../../util/typeGuard";

type FormFields = "name" | "phone" | "group" | "memo";
//정규식 적용한 필드들
type CheckListFields = Exclude<FormFields, "group" | "memo">;

type Patterns = {
  [key in CheckListFields]?: RegExp;
};
type ErrorMessages = {
  [key in CheckListFields]?: string;
};

const InputForm: React.FC<InputFormProps> = ({
  openModal,
  groupList,
  setContactList,
  contactList,
}) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const patterns: Patterns = {
    //한글로 2글자 이상
    name: /^[가-힣]{2,}\d*$/,
    //010-0000-0000 형식
    phone: /^010-\d{3,4}-\d{4}$/,
  };
  const errorMessages: ErrorMessages = {
    name: "이름은 한글로 두 글자 이상 입력해주세요.",
    phone: "전화번호는 010-0000-0000 형식으로 입력해주세요.",
  };

  // 전화번호 형식에 하이픈 추가하는 함수
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const cleaned = value.replace(/\D/g, "");

    // 전화번호 형식에 맞게 하이픈 추가
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 7) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(
        7,
        11
      )}`;
    }
  };

  const handleInputChange = (event: ChangeEvent) => {
    const Element = event.target as HTMLInputElement;
    if (Element.id === "phone") {
      setPhone(formatPhoneNumber(Element.value));
      vaildInput(Element);
    } else if (Element.id === "name") {
      setName(Element.value);
      vaildInput(Element);
    } else if (Element.id === "memo") {
      setMemo(Element.value);
    }
  };

  const vaildInput = (input: HTMLInputElement): boolean => {
    const id: string = input.id;
    asssertType<CheckListFields>(id);
    const errorElement = document.getElementById(id + "Error");
    asssertType<HTMLSpanElement>(errorElement);
    if (patterns[id]) {
      const isValid: boolean = patterns[id].test(input.value);
      const errorMessage: string = errorMessages[id] ?? "";
      if (isValid) errorElement.textContent = "";
      else errorElement.textContent = errorMessage;
      return isValid;
    }
    return false;
  };
  function vaildateForm(): boolean {
    const checkjList: CheckListFields[] = ["name", "phone"];
    let isValid = true;
    checkjList.forEach((e: string) => {
      const inputElement = document.getElementById(e);
      asssertType<HTMLInputElement>(inputElement);
      if (!vaildInput(inputElement)) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }
  function makeItem(): Contact {
    const contact: Partial<Contact> = {};
    const formFieldsArray: FormFields[] = ["name", "phone", "group", "memo"];
    formFieldsArray.forEach((e: FormFields) => {
      const $element = document.getElementById(e);
      //select
      if (e === "group") {
        asssertType<HTMLSelectElement>($element);
      }
      //input
      else {
        asssertType<HTMLInputElement>($element);
      }
      contact[e] = $element.value;
    });
    return {
      name: contact.name!,
      phone: contact.phone!,
      group: contact.group!,
      memo: contact.memo!,
    };
  }
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault(); // 기본 제출 동작을 막음
    if (vaildateForm()) {
      const item: Contact = makeItem();
      let isDuplicate = false;
      contactList.forEach((e) => {
        if (e.name === item.name) {
          isDuplicate = true;
          return;
        }
      });
      if (isDuplicate) {
        alert("동일한 이름으로 등록 된 리스트가 있어요.");
        return;
      }
      const newList: Contact[] = [...contactList, item];
      setContactList(newList);
      localStorage.setItem("contactList", JSON.stringify(newList));
      //from 리셋
      setName("");
      setPhone("");
      setMemo("");
    } else {
      alert(
        "유효하지 않은 값이 존재합니다.\n이름과 전화번호를 한번더 확인해주세요."
      );
    }
  };
  return (
    <form id="inputForm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleInputChange}
        />
        <span id="nameError" className="error"></span>
      </div>
      <div>
        <label htmlFor="phone">전화번호:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={handleInputChange}
          maxLength={13}
          placeholder="010-0000-0000"
        />
        <span id="phoneError" className="error"></span>
      </div>
      <div>
        <label htmlFor="group">그룹</label>
        <select name="group" id="group">
          {groupList.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
        <button type="button" onClick={openModal}>
          조직추가
        </button>
      </div>
      <div>
        <label htmlFor="memo">간단한기록</label>
        <input
          type="text"
          value={memo}
          onChange={handleInputChange}
          id="memo"
        />
      </div>
      <button type="submit">저장</button>
    </form>
  );
};

export default InputForm;
