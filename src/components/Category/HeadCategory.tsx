import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/category.module.scss';
import optionsStyles from '../../styles/options.module.scss';
import linkingStyles from '../../styles/linking.module.scss';

import AddButton from "../../shared/buttons/AddButton";
import AddCategory from "./AddCategory";
import Category, {CategoryType, LinkCoordinate} from "./Category";
import category from "./Category";
type HeadCategoryProps = {
    scale: number;
}
const HeadCategory = ({scale}: HeadCategoryProps) => {
    const [headCategory, setHeadCategory] = useState<CategoryType>({
        id: new Date().getTime().toString(),
        isEditing: false,
        subCategories: [],
        level: 0,
        text: 'Categories',
    });

    const addCategory = (category: CategoryType | boolean, parentId?: string) => {
        if (category === false) {
            setHeadCategory(prev => ({...prev}));
        }
        if (typeof category !== 'boolean' && parentId) {
            addRecursCategory(category, parentId, headCategory);
            /*setCategories(state => state.map(item => {
                if (item.id === parentId) {
                    item.subCategories?.push(category);
                }
                return item;
            }))*/
            setHeadCategory(prev => ({...prev}));
        }
    }
    const addRecursCategory = (newCategory: CategoryType, id: string, category: CategoryType): unknown => {
        if (category.id === id) {
            category.subCategories.push(newCategory);
            return;
        }
        if (category.subCategories) {
            for (let i = 0; i < category.subCategories.length; i++) {
                addRecursCategory(newCategory, id, category.subCategories[i]);
            }
            return;
        }
    }
    const removeCategory = (id: string) => {
        removeRecursCategory(id, headCategory);
        setHeadCategory(prev => ({...prev}));
    }

    const removeRecursCategory = (id: string, category: CategoryType): unknown => {
        if (category.subCategories.find(item => item.id === id)) {
            category.subCategories = category.subCategories.filter(item => item.id !== id);
            return;
        }
        if (category.subCategories) {
            for (let i = 0; i < category.subCategories.length; i++) {
                removeRecursCategory(id, category.subCategories[i]);
            }
            return;
        }
    }

    const getChildAmount = (id: string, category = headCategory, counting = false): number => {
        if (category.id === id || counting) {
            let amount = 0;
            amount += category.subCategories.length;
            for (let i = 0; i < category.subCategories.length; i++) {
                amount += getChildAmount(id, category.subCategories[i], true);
            }
            return amount;
        } else {
            let amount = 0;
            for (let i = 0; i < category.subCategories.length; i++) {
                amount = getChildAmount(id, category.subCategories[i]);
                if (amount > 0) {
                    return amount;
                }
            }
        }
        return 0;
    }
    /*const editCategory = (text: string, id: string, category = headCategory) => {
        if (id === category.id) {
            category.text = text;
            category.isEditing
        }
    }*/
    const getNearestChildren = (id: string, category = headCategory, counting = false): CategoryType[] => {
        if (category.id === id || counting) {
            return category.subCategories;
        } else {
            let children: CategoryType[] = [];
            for (let i = 0; i < category.subCategories.length; i++) {
                children = getNearestChildren(id, category.subCategories[i]);
                if (children.length > 0) {
                    return children;
                }
            }
        }
        return [];
    }
    useEffect(() => {
    }, [scale]);
    /*const [categoryDialog, setCategoryDialog] = useState(false);
    const [subCategories, setSubCategories] = useState<CategoryType[]>([]);
    const [linkCoordinates, setLinkCoordinates] = useState<LinkCoordinate>({});
    const isNotSingleChild = subCategories.length > 1 || (subCategories.length === 1 && categoryDialog);
    const linkRef = useRef<HTMLDivElement>(null);
    const [editingChildItems, setEditingChildItems] = useState<number>(0);
    const addSubCategory = (text: string) => {
        setSubCategories(prev => [...prev, {
            text,
            level: 1,
            isEditing: false,
        }]);
    }
    const editSubCategory = (text: string, ind: number) => {
        setEditingChildItems(prev => prev - 1);
        setSubCategories(prev => {
            prev[ind].text = text;
            prev[ind].isEditing = false;
            return [...prev];
        });
    }
    const addLinkCoordinates = (linkCoordinate: LinkCoordinate) => {
        setLinkCoordinates(prev => ({...prev, ...linkCoordinate}));
    }
    useEffect(() => {
        if (!isNotSingleChild) {
            linkRef.current?.style.setProperty('width', '0px');
        } else if (linkCoordinates.first && linkCoordinates.last && linkCoordinates.first.left !== linkCoordinates.last.left) {
            console.log(1, linkCoordinates);
            linkRef.current?.style.setProperty('width', (linkCoordinates.last.left - linkCoordinates.first.left) + 'px')
            linkRef.current?.style.setProperty('left', linkCoordinates.first.leftPadd + 'px');
        }
     }, [linkCoordinates]);*/
    return (
        <Category isRoot={true} text={'Categories'} level={0}
                  headCategory={headCategory}
                  addCategory={addCategory}
                  isEditing={false}
                  removeCategory={removeCategory}
                  getChildAmount={getChildAmount}
                  id={headCategory.id}
                  nearestChildren={getNearestChildren(headCategory.id)}
                  getNearestChildren={getNearestChildren}
        />
/*        <div className={`${styles.category} ${styles.category__head} ${(categoryDialog && subCategories.length > 0) || subCategories.length > 1 ? linkingStyles.link__vertical__bottom : ''}`}>
            <p className={styles.category__text}>Categories</p>
            <div className={`${optionsStyles.category__options}`} >
                <AddButton addSubCategory={() => {
                    setEditingChildItems(prev => prev + 1);
                    setCategoryDialog(true)
                }}/>
            </div>
            <div className={`${styles.category__list} ${(categoryDialog && subCategories.length > 0) || subCategories.length > 1 ? styles.category__list_not_single : ''}`}>
                <div className={linkingStyles.link__horizontal} ref={linkRef}></div>
                {subCategories.map((item, ind) =>
                    item.isEditing
                        ? <AddCategory
                            key={ind}
                            defaultText={item.text}
                            isSingle={subCategories.length === 0}
                            endAdding={() => setSubCategories(prev => {
                                setEditingChildItems(prev => prev - 1);
                                prev[ind].isEditing = false;
                                return [...prev];
                            })}
                            add={(text) => editSubCategory(text, ind)}
                            editingItems={editingChildItems}
                            amountCategories={subCategories.length}
                            position={ind === 0 ? 'first' : ind === subCategories.length - 1 ? 'last' : null }
                            addLinkCoordinate={ind === 0 || ind === subCategories.length - 1 ? addLinkCoordinates : null}
                        />
                        : <Category text={item.text}
                                    key={ind}
                                    isSingle={subCategories.length === 1}
                                    level={item.level}
                                    remove={() => setSubCategories(subCategories.filter((item, filterInd) => {
                                        return filterInd !== ind;
                                    }))}
                                    edit={() => {
                                        setEditingChildItems(prev => prev + 1)
                                        setSubCategories(prev => {
                                            prev[ind].isEditing = true;
                                            return [...prev];
                                        })
                                    }}
                                    editingItems={editingChildItems}
                                    amountCategories={subCategories.length + (categoryDialog ? 0.5 : 0)}
                                    position={ind === 0 ? 'first' : ind === subCategories.length - 1 ? 'last' : null }
                                    addLinkCoordinate={ind === 0 || ind === subCategories.length - 1 ? addLinkCoordinates : null}
                    />
                )}
                {categoryDialog && <AddCategory
                    isSingle={subCategories.length === 0}
                    endAdding={() => {
                        setEditingChildItems(prev => prev - 1);
                        setCategoryDialog(false)
                    }}
                    add={(text) => addSubCategory(text)}
                    editingItems={editingChildItems}
                    amountCategories={subCategories.length}
                    position={'last'}
                    addLinkCoordinate={addLinkCoordinates}
                />}
            </div>
        </div>*/
    );
};

export default HeadCategory;