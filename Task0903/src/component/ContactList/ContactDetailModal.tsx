import { ContactDetailModalProps } from "../../type/Props";

const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <button onClick={onClose}>닫기</button>
      <div>
        <h2>연락처 상세 정보</h2>
        <div>
          <span>이름:</span>
          <span>{item.name}</span>
        </div>
        <div>
          <span>전화번호:</span>
          <span>{item.phone}</span>
        </div>
        <div>
          <span>그룹:</span>
          <span>{item.group}</span>
        </div>
        <div>
          <span>메모:</span>
          <span>{item.memo}</span>
        </div>
      </div>
    </div>
  );
};
export default ContactDetailModal;
