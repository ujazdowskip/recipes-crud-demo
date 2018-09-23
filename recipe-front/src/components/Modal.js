import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  }
};

const MyModal = ({isOpen, contentLabel, children}) => (
  <Modal
    style={customStyles} 
    isOpen={isOpen}
    contentLabel={contentLabel}>
    {children}   
  </Modal>
)


const ModalHeader = styled.div`
  background-color: #f4f4f4;
  padding: 1rem;
`
export {
  MyModal as Modal,
  ModalHeader,
}