import './ModalWindow.css'


interface ModalWindowProps {
    isOpen: boolean;
    // onClose: () => void;
    children: JSX.Element;
  }

const ModalWindow = (props: ModalWindowProps) => {

    return (
        <div className={`madal-window ${props.isOpen ? 'active-modal' : ''}`}>

            {props.children}

        </div>
    )
}

export default ModalWindow