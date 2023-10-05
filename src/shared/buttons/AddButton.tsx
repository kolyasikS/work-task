import React from 'react';
import optionsStyles from '../../styles/options.module.scss';
type AddButtonProps = {
    addSubCategory:  React.MouseEventHandler
}
const AddButton = (addButtonProps: AddButtonProps) => {
    return (
        <button
            className={`${optionsStyles.category__button}`}
            onClick={addButtonProps.addSubCategory}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M12 4V20" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
};

export default AddButton;