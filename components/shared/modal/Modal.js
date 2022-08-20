import React from 'react';
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        color: 'darkblue'
    },
};

Modal.setAppElement('div')

const ContractModal = ({modalIsOpen}) => {
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
            >
                <div>Your transaction is been processed</div>
                <h4>Please wait</h4>
            </Modal>
        </div>
    )
}
export default ContractModal