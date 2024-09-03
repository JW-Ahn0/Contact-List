import { ContactDetailModalProps } from "../../type/Props";
import "./ContactDetailModal.css";
const ContactDetailModal: React.FC<ContactDetailModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <button className="btn-orange" onClick={onClose}>
        닫기
      </button>
      <div className="modal-content">
        <h2>연락처 상세 정보</h2>
        <div className="contact-item">
          <span>이름:</span>
          <span>{item.name}</span>
        </div>
        <div className="contact-item">
          <span>전화번호:</span>
          <span>{item.phone}</span>
        </div>
        <div className="contact-item">
          <span>그룹:</span>
          <span>{item.group}</span>
        </div>
        <div className="contact-item">
          <span>메모:</span>
          <span>{item.memo}</span>
        </div>
      </div>
    </div>
  );
};
export default ContactDetailModal;
