import React, {useEffect, useRef} from 'react';
import optionsStyles from '../../styles/options.module.scss';
import styles from '../../styles/add-category.module.scss';
import linkingStyles from '../../styles/linking.module.scss';
import {LinkCoordinate} from "./Category";
type AddCategoryProps = {
    endAdding: () => void;
    add: (text: string) => void;
    isSingle: boolean
    addLinkCoordinate: ((linkCoordinate: LinkCoordinate) => void) | null;
    position: string | null;
    amountCategories: number;
    defaultText?: string;
    editingItems?: number;
    addEditItem: () => void;
    isEditing?: boolean;
}
const AddCategory = ({endAdding, add, isSingle,
                     isEditing,
                         editingItems, addEditItem,
                         defaultText, amountCategories,
                         position, addLinkCoordinate}: AddCategoryProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const CATEGORIES_MARGIN = 60;
    const cancelCategory = () => {
        endAdding();
    }
    const applyCategory = () => {
        if (inputRef?.current?.value) {
            add(inputRef.current.value);
        }
        endAdding();
    }
    useEffect(() => {
        addEditItem();
        console.log('\n----------------------------------------------\n\n');
        resetLinkCoordinates();
    }, []);
    const resetLinkCoordinates = () => {
        if (linkRef.current &&  categoryRef.current && addLinkCoordinate && position) {
            const rect = linkRef.current.getBoundingClientRect();
            switch (position) {
                case 'first':
                    addLinkCoordinate({
                        first: {
                            leftPadd: (categoryRef.current?.getBoundingClientRect().width ?? 0) / 2 + CATEGORIES_MARGIN * (amountCategories + 1),
                            left: rect.x,
                            top: rect.y
                        }
                    });
                    break;
                case 'last':
                    addLinkCoordinate({
                        last: {
                            left: rect.x,
                            top: rect.y
                        }
                    });
                    break;
                default:
            }
        }
    }
    useEffect(() => {
        resetLinkCoordinates();
    }, [linkRef.current,
        amountCategories,
        editingItems,
        position,
    ]);

    return (
        <div className={`${styles.addCategory__wrapper} ${isEditing ? styles.addCategory__editing : ''}`} ref={categoryRef}>
            <div className={`${linkingStyles.link__vertical}`} ref={linkRef}></div>
            <input ref={inputRef} className={styles.addCategory__input}
                   defaultValue={defaultText}
                   type="text" placeholder={'Category name'}/>
            <div className={optionsStyles.category__options} style={{right: '-65px'}}>
                <button
                    className={`${optionsStyles.category__button} ${optionsStyles.category__button_cancel}`}
                    onClick={cancelCategory}
                >
                    <svg fill="#fff" viewBox="-1 1 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="10"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g>
                    </svg>
                    {/*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M12 4V20" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>*/}
                </button>
                <button
                    className={`${optionsStyles.category__button} ${optionsStyles.category__button_apply}`}
                    onClick={applyCategory}
                >
                    <svg height="30px" width="30px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  fill="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="1"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon className="st0" points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945 "></polygon> </g> </g>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AddCategory;