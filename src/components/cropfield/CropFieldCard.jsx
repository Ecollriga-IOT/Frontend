import React, { useState, useRef } from 'react';
import { usePopper } from 'react-popper';
import { SlOptions } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCropFieldDto, fetchCropFields } from '../../redux/thunks/cropFieldThunks';

const CropFieldCard = ({ name, location, timeSpent, totalTime, progress, id }) => {
  const [showOptions, setShowOptions] = useState(false);
  const referenceElement = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement.current, popperElement, {
    placement: 'bottom-end',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOutside = (event) => {
    if (popperElement && !popperElement.contains(event.target) && !referenceElement.current.contains(event.target)) {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option) => {
    setShowOptions(false);
    if (option === 'edit') {
      navigate(`/dashboard/cultivos/edit-cultivo/${id}`);
    } else if (option === 'delete') {
      dispatch(deleteCropFieldDto(id)).then(() => {
          console.log(`Crop field ${id} deleted successfully`);
          dispatch(fetchCropFields());
        })
        .catch((error) => {
          console.error('Error deleting crop field:', error);
          alert('Ocurrió un error al eliminar el cultivo.');
        });

      console.log('Delete option clicked');
      
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperElement]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <h2 className="text-lg font-semibold">{name}</h2>
      <div className="absolute top-2 right-2" ref={referenceElement} onClick={() => setShowOptions(!showOptions)}>
        <SlOptions className="text-gray-400 cursor-pointer" />
      </div>
      {showOptions && (
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="bg-white border rounded shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-[#c9dcf7] cursor-pointer" onClick={() => handleOptionClick('edit')}>
              Editar
            </li>
            <li className="px-4 py-2 hover:bg-[#c9dcf7] cursor-pointer" onClick={() => handleOptionClick('delete')}>
              Eliminar
            </li>
          </ul>
        </div>
      )}
      <p className="text-gray-500">{location}</p>
      <div className="my-2">
        <span className="text-[#062dd9] text-xl font-bold">{timeSpent}</span>
        <span className="text-gray-400"> / {totalTime}</span>
      </div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#c9dcf7]">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#077eff]"
          ></div>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[#608be1]">--%</span>
      </div>
    </div>
  );
};

export default CropFieldCard;
