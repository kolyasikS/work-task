import React, {useState} from 'react';
import optionsStyles from "../../styles/options.module.scss";
import AddButton from "../../shared/buttons/AddButton";
import {LinkCoordinate} from "./Category";

type CategoryOptionsProps = {
    setCategoryDialog: (bool: boolean) => void;
    editCategory: (() => void);
    removeCategory: (() => void);
    setEditingChildItems: (func: (number: number) => number) => void;
    isRoot?: boolean;
}
const CategoryOptions = ({setCategoryDialog, editCategory,
                             isRoot,
                             setEditingChildItems, removeCategory}: CategoryOptionsProps) => {
    const [renderAfterEditing, setRenderAfterEditing] = useState<number>(0);
    return (
        <div className={optionsStyles.category__options} style={{right: isRoot ? -35 : -95}}>
            <AddButton addSubCategory={() => {
                setCategoryDialog(true)
            }}/>
            {!isRoot &&
                <button
                    className={`${optionsStyles.category__button}`}
                    onClick={editCategory}
                >
                    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M57.52 21.1111C57.5232 22.1978 57.311 23.2743 56.8956 24.2784C56.4803 25.2825 55.87 26.1943 55.1 26.9611L28.56 53.5111C28.2893 53.7779 27.9501 53.9648 27.58 54.0511L11.08 57.7411C10.7514 57.8123 10.4162 57.8492 10.08 57.8511C9.40545 57.8493 8.73969 57.6981 8.13047 57.4085C7.52125 57.1189 6.98368 56.698 6.55638 56.1761C6.12907 55.6542 5.8226 55.0441 5.65898 54.3897C5.49535 53.7353 5.47863 53.0528 5.61 52.3911L8.79002 36.5111C8.86868 36.1243 9.06003 35.7694 9.34001 35.4911L36.48 8.35113C38.0337 6.79994 40.1395 5.92871 42.335 5.92871C44.5305 5.92871 46.6363 6.79994 48.19 8.35113L55.1 15.2511C55.8694 16.0204 56.4792 16.9341 56.8945 17.9398C57.3098 18.9454 57.5223 20.0231 57.52 21.1111Z" fill="#ffffff"></path> </g>
                    </svg>
                </button>
            }
            {!isRoot &&
                <button
                    className={`${optionsStyles.category__button} ${optionsStyles.category__button_remove}`}
                    onClick={removeCategory}
                >
                    <svg fill="#fff" viewBox="1 1 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="10"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g>
                    </svg>
                </button>
            }
        </div>
    );
};

export default CategoryOptions;