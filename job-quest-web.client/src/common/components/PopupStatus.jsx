import closeButtonSvg from '../assets/close-button.svg';
import '../../index.css';
const PopupStatus = ({ status, message, setShowPopup }) => {
  console.log(status, message, setShowPopup);
  return (
    <>
      <div className={`${status == 'failed' ? 'popup-error-header' : 'popup-success-header'}`}>
        {status === 'succeeded' ? 'Success !' : 'Failed !'}
        <button
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <img src={closeButtonSvg} alt="Close"/>
        </button>
      </div>
      <div className={`${status == 'failed' ? 'popup-error-message' : 'popup-success-message'}`}>
        <p>{message}</p>
      </div>
    </>
  );
};

export default PopupStatus;
