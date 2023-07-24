import "./Modal.css";

function Modal({ cardName, cardImage, handleCloseModalClick }) {
  return (
    <div>
      <div id="modal-bg" onClick={handleCloseModalClick}></div>
      <div id="modal" onClick={handleCloseModalClick}>
        <img src={cardImage} alt={cardName} />
      </div>
    </div>
  );
}

export default Modal;
