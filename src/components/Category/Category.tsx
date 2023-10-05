import React, { useEffect, useRef, useState} from 'react';
import styles from '../../styles/category.module.scss';
import optionsStyles from '../../styles/options.module.scss';
import linkingStyles from '../../styles/linking.module.scss';
import addCategoryStyles from '../../styles/add-category.module.scss';

import CategoryOptions from "./CategoryOptions";
import SubCategoriesList from "./SubCategoriesList";
type CategoryProps = {
    isRoot?: boolean;
    text: string;
    level: number;
    isSingle?: boolean;
    addLinkCoordinate?: ((linkCoordinate: LinkCoordinate) => void) | null;
    remove?: () => void;
    edit?: () => void;
    position?: string | null;
    amountCategories?: number;
    editingItems?: number;
    headCategory: CategoryType;
    isEditing: boolean;
    id: string;
    getChildAmount: (id: string) => number;
    addCategory: (category: CategoryType | boolean, id?: string) => void;
    removeCategory: (id: string) => void;
    nearestChildren: CategoryType[];
    getNearestChildren: (id: string) => CategoryType[];
    endEditing?: (text: string, isSuccess: boolean) => void;
    renderAfterEditing?: number;
}
export type LinkCoordinate = {
    first?: {
        leftPadd: number,
        left: number,
        top: number,
    }
    last?: {
        left: number,
        top: number,
    }
}
export type CategoryType = {
    id: string;
    text: string;
    level: number;
    isEditing: boolean;
    subCategories: CategoryType[];
}
const LEVEL_COLORS = ['#f7a985', '#3fb5e6', '#b9bdbf'];
const Category = (category: CategoryProps) => {
    const CATEGORIES_MARGIN = 80;
    const [text, setText] = useState(category.text);
    const linkRef = useRef<HTMLDivElement>(null);
    const horizLinkRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const addCategoryRef = useRef<HTMLDivElement>(null);

    const [categoryDialog, setCategoryDialog] = useState(false);
    const [subCategories, setSubCategories] = useState<CategoryType[]>(category.nearestChildren);
    const [linkCoordinates, setLinkCoordinates] = useState<LinkCoordinate>({});
    const isNotSingleChild = subCategories.length > 1 || (subCategories.length === 1 && categoryDialog);
    const [editingChildItems, setEditingChildItems] = useState<number>(0);

    useEffect(() => {
        setSubCategories(category.getNearestChildren(category.id));
    }, [category.headCategory]);
    const addSubCategory = (text: string) => {
        const newCategory = {
            id: new Date().getTime().toString(),
            text,
            level: category.level + 1,
            isEditing: false,
            subCategories: []
        }
        category.addCategory(newCategory, category.id);
        setSubCategories(prev => [...prev, newCategory]);
    }

    const editCategory = () =>  {
        if (category.edit) {
            category.edit();
        }
    }
    const editSubCategory = (text: string, id: string) => {
        setSubCategories(prev => prev.map(item => {
            if (item.id === id) {
               item.text = text;
               item.isEditing = false;
            }
            return item;
        }));
    }
    const removeCategory = () => {
        if (category.remove) {
            category.remove();
        }
    }

    const addLinkCoordinates = (linkCoordinate: LinkCoordinate) => {
        setLinkCoordinates(prev => ({...prev, ...linkCoordinate}));
    }
    useEffect(() => {
        if (!isNotSingleChild) {
            horizLinkRef.current?.style.setProperty('width', '0px');
        } else if (categoryRef.current && linkCoordinates.first && linkCoordinates.last && linkCoordinates.first.left !== linkCoordinates.last.left) {
            horizLinkRef.current?.style.setProperty('width', (linkCoordinates.last.left - linkCoordinates.first.left) + 'px')
            horizLinkRef.current?.style.setProperty('left', linkCoordinates.first.leftPadd + 'px');
        }
    }, [linkCoordinates, category.isEditing]);

    useEffect(() => {
        setText(category.text);
    }, [category.text]);

    const resetLinkCoordinates = () => {
        if (linkRef.current && (categoryRef.current || addCategoryRef.current) && category.addLinkCoordinate && category.position) {
            const width = addCategoryRef.current ? addCategoryRef.current.getBoundingClientRect().width : categoryRef.current?.getBoundingClientRect().width;
            const rect = linkRef.current.getBoundingClientRect();
            switch (category.position) {
                case 'first':
                    category.addLinkCoordinate({
                        first: {
                            leftPadd: (width ?? 0) / 2 + CATEGORIES_MARGIN * (category.getChildAmount(category.id) + (categoryDialog ? 1 : 0)),
                            left: rect.x,
                            top: rect.y
                        }
                    });
                    break;
                case 'last':
                    category.addLinkCoordinate({
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
    }, [
        category.headCategory,
        category.editingItems,
        categoryDialog,
        category.isEditing,
        category.renderAfterEditing
    ]);

    const inputRef = useRef<HTMLInputElement>(null);

    const cancelCategory = () => {
        if (category.endEditing) {
            category.endEditing('', false);
        }
    }
    const applyCategory = () => {
        if (inputRef?.current?.value) {
            if (category.endEditing) {
                category.endEditing(inputRef.current.value, true);
            }
        }
    }

    return (
        !category.isEditing ? <div
                className={`${styles.category} ${category.isRoot ? styles.category__head : ''} ${(categoryDialog && subCategories.length > 0) || subCategories.length > 1 ? linkingStyles.link__vertical__bottom : ''}`}
             style={{
                 background: LEVEL_COLORS[category.level - 1],
                 marginRight: !category.isRoot ? CATEGORIES_MARGIN * (category.getChildAmount(category.id) + (categoryDialog ? 1 : 0)) : 0,
                 marginLeft: !category.isRoot ? CATEGORIES_MARGIN * (category.getChildAmount(category.id) + (categoryDialog ? 1 : 0)) : 0
             }}
             ref={categoryRef}
        >
            {!category.isRoot && <div className={`${linkingStyles.link__vertical}`} ref={linkRef}></div>}
            <p className={styles.category__text}>{text}</p>
            <CategoryOptions
                isRoot={category.isRoot}
                setCategoryDialog={setCategoryDialog}
                setEditingChildItems={setEditingChildItems}
                editCategory={editCategory}
                removeCategory={removeCategory}
            />
            <SubCategoriesList
                getNearestChildren={category.getNearestChildren}
                editingChildItems={editingChildItems}
                editSubCategory={editSubCategory}
                setEditingChildItems={setEditingChildItems}
                setCategoryDialog={setCategoryDialog}
                setSubCategories={setSubCategories}
                subCategories={subCategories}
                addSubCategory={addSubCategory}
                nearestChildren={category.getNearestChildren(category.id)}
                categoryDialog={categoryDialog}
                addLinkCoordinates={addLinkCoordinates}
                linkRef={horizLinkRef}
                getChildAmount={category.getChildAmount}
                removeCategory={category.removeCategory}
                addCategory={category.addCategory}
                headCategory={category.headCategory}
            />
        </div>
            :
            <div className={`${addCategoryStyles.addCategory__wrapper} ${(categoryDialog && subCategories.length > 0) || subCategories.length > 1 ? linkingStyles.link__vertical__bottom : ''}`}
                 ref={addCategoryRef}
                 style={{
                     marginRight: !category.isRoot ? CATEGORIES_MARGIN * (category.getChildAmount(category.id) + (categoryDialog ? 1 : 0)) : 0,
                     marginLeft: !category.isRoot ? CATEGORIES_MARGIN * (category.getChildAmount(category.id) + (categoryDialog ? 1 : 0)) : 0
                 }}
            >
                <div className={`${linkingStyles.link__vertical}`} ref={linkRef}></div>
                <input ref={inputRef} className={addCategoryStyles.addCategory__input}
                       defaultValue={category.text}
                       type="text" placeholder={'Category name'}/>
                <div className={optionsStyles.category__options} style={{right: '-65px'}}>
                    <button
                        className={`${optionsStyles.category__button} ${optionsStyles.category__button_cancel}`}
                        onClick={cancelCategory}
                    >
                        <svg fill="#fff" viewBox="-1 1 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="10"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel2</title> <path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path> </g>
                        </svg>
                    </button>
                    <button
                        className={`${optionsStyles.category__button} ${optionsStyles.category__button_apply}`}
                        onClick={applyCategory}
                    >
                        <svg height="30px" width="30px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  fill="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="1"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <polygon className="st0" points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945 "></polygon> </g> </g>
                        </svg>
                    </button>
                </div>
                <SubCategoriesList
                    getNearestChildren={category.getNearestChildren}
                    editingChildItems={editingChildItems}
                    editSubCategory={editSubCategory}
                    setEditingChildItems={setEditingChildItems}
                    setCategoryDialog={setCategoryDialog}
                    setSubCategories={setSubCategories}
                    subCategories={subCategories}
                    addSubCategory={addSubCategory}
                    nearestChildren={category.getNearestChildren(category.id)}
                    categoryDialog={categoryDialog}
                    addLinkCoordinates={addLinkCoordinates}
                    linkRef={horizLinkRef}
                    getChildAmount={category.getChildAmount}
                    removeCategory={category.removeCategory}
                    addCategory={category.addCategory}
                    headCategory={category.headCategory}
                />
            </div>
    );
};

export default Category;