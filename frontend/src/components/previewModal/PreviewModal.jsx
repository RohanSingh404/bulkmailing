import Modal from "react-modal";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
  },
};

Modal.setAppElement("#root");

function PreviewModal({ view, closeView, code }) {
  const [modalIsOpen, setModalIsOpen] = useState(view);

  useEffect(() => {
    setModalIsOpen(view);
  }, [view]);

  // 🧼 Sanitize user HTML (removes scripts, JS events, iframes etc.)
  const cleanHtml = DOMPurify.sanitize(code || "<p>Enter any code</p>", {
    USE_PROFILES: { html: true },
  });

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeView(false)}
        style={customStyles}
        contentLabel="Preview Modal"
      >
        <div className="modal-container-preview">
          <h2 style={{ padding: "20px" }}>Preview</h2>

          <div
            className="preview-container"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          <button
            className="preview_md_btn"
            type="button"
            onClick={() => closeView(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default PreviewModal;
