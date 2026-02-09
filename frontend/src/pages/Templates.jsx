import React, { useEffect, useState } from "react";
import { getToken } from "../auth/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import TemplateCard from "../components/templateCard/TemplateCard";

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [templateId, setTemplateId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("/api/user/viewtemplates", config)
      .then((res) => {
        setTemplates(res.data.templates);
      })
      .catch((err) => console.log(err));
  }, [modalIsOpen]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  const handleDelete = (id) => {
    setIsOpen(true);
    setTemplateId(id);
  };

  const onRequestClose = () => {
    setModalClose(true);
    setIsOpen(false);
  };

  const onHandleConfirm = () => {
  const token = getToken();
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  axios
    .post(
      `/api/user/deletetemplate/${templateId}`,
      {},
      config
    )
    .then(() => {
      setTemplates(prev => prev.filter(t => t._id !== templateId));
      setIsOpen(false);
      toast.success("Template deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
      });
    })
    .catch((err) => {
      console.log(err);
      toast.error("Delete failed");
    });
};


  return (
    <div>
      <div className='container'>
        <Sidebar />
        <Navbar />
        <section className='home'>
          <div style={{ marginTop: "100px" }}>
            <button
              className='add-record-btn'
              onClick={() => navigate("/newtemplate")}
            >
              Add Template
            </button>
            <div className='group-grid-container'>
              {templates.map((template) => (
                <TemplateCard
                  name={template.name}
                  //   emails={group.emails.length}
                  handleDelete={handleDelete}
                  id={template._id}
                />
              ))}
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={onRequestClose}
              style={customStyles}
              contentLabel='Example Modal'
              className='modal'
              overlayclassName='modal-overlay'
            >
              <h2 className='modal-title'>Confirm Delete Template</h2>
              <p className='modal-text'>
                Are you sure you want to delete this template?
              </p>
              <div className='modal-buttons'>
                <button
                  className='modal-button cancel'
                  onClick={onRequestClose}
                >
                  Cancel
                </button>
                <button
                  className='modal-button delete'
                  onClick={onHandleConfirm}
                >
                  Delete
                </button>
              </div>
            </Modal>
            <ToastContainer
              position='bottom-right'
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Templates;
