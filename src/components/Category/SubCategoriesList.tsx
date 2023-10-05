import React, {createContext, Fragment, useContext, useEffect, useState} from 'react';
import styles from "../../styles/category.module.scss";
import linkingStyles from "../../styles/linking.module.scss";
import AddCategory from "./AddCategory";
import Category, {CategoryType, LinkCoordinate} from "./Category";
import category from "./Category";
type SubCategoriesListProps = {
    categoryDialog: boolean;
    setCategoryDialog: (bool: boolean) => void;
    subCategories: CategoryType[];
    setSubCategories: ((func: (categories: CategoryType[]) => CategoryType[]) => void);
    linkRef: React.Ref<HTMLDivElement>;
    editingChildItems: number;
    setEditingChildItems: (func: (num: number) => number) => void;
    editSubCategory: (text: string, id: string) => void;
    addSubCategory: (text: string) => void;
    addLinkCoordinates: (link: LinkCoordinate) => void;
    headCategory: CategoryType;
    addCategory: (category: CategoryType | boolean, id?: string) => void;
    removeCategory: (id: string) => void;
    getChildAmount: (id: string) => number;
    getNearestChildren: (id: string) => CategoryType[];
    nearestChildren: CategoryType[];
}
const SubCategoriesList = ({categoryDialog, setCategoryDialog, setSubCategories,
                               editSubCategory, addSubCategory, addLinkCoordinates,
                               editingChildItems,
                               nearestChildren,
                               getNearestChildren,
                               headCategory, getChildAmount,
                               addCategory, removeCategory,
                               subCategories, linkRef, setEditingChildItems}: SubCategoriesListProps) => {

    const [renderAfterEditing, setRenderAfterEditing] = useState<number>(0);
    useEffect(() => {
        setRenderAfterEditing(prev => prev + 1);
    }, [editingChildItems]);

    const remove = (id: string) => {
        // setSubCategories(prev => []);
        removeCategory(id);
    }
    useEffect(() => {
        addCategory(false);
    }, [categoryDialog]);
    return (
        <div className={`${styles.category__list} ${(categoryDialog && nearestChildren.length > 0) || nearestChildren.length > 1 ? styles.category__list_not_single : ''}`}>
            {nearestChildren.length
                ? <div className={linkingStyles.link__horizontal} ref={linkRef}></div>
                : null
            }
            {nearestChildren.map((item, ind) =>
                /*<Fragment
                        key={item.id}
                    >
                        <AddCategory
                            defaultText={item.text}
                            isSingle={nearestChildren.length === 0}
                            endAdding={() => setSubCategories(prev => {
                                prev[ind].isEditing = false;
                                setEditingChildItems(prev => prev - 1)
                                return [...prev];
                            })}
                            isEditing={true}
                            add={(text) => editSubCategory(text, )}
                            editingItems={editingChildItems}
                            addEditItem={() => setEditingChildItems(prev => prev + 1)}
                            amountCategories={nearestChildren.length}
                            position={ind === 0 ? 'first' : ind === nearestChildren.length - 1 ? 'last' : null }
                            addLinkCoordinate={ind === 0 || ind === nearestChildren.length - 1 ? addLinkCoordinates : null}
                        />*/<Category text={item.text}
                                key={item.id}
                                      isEditing={item.isEditing}
                                isSingle={nearestChildren.length === 1}
                                getNearestChildren={getNearestChildren}
                                level={item.level}
                                remove={() => setSubCategories(prev => prev.filter((prevItem) => {
                                    if (prevItem.id === item.id) {
                                        remove(item.id);
                                        return false;
                                    } else {
                                        return true
                                    }
                                }))}
                                  renderAfterEditing={renderAfterEditing}
                                nearestChildren={nearestChildren}
                                edit={() => {
                                    setEditingChildItems(prev => prev + 1)
                                    setSubCategories(prev => {
                                        prev[ind].isEditing = true;
                                        return [...prev];
                                    })
                                }}
                                      endEditing={(text: string, isSuccess: boolean) => {
                                          setEditingChildItems(prev => prev - 1)
                                          setSubCategories(prev => prev.map(prevItem => {
                                              if (item.id === prevItem.id) {
                                                  if (isSuccess) {
                                                      prevItem.text = text;
                                                  }
                                              }
                                              prevItem.isEditing = false;
                                              return prevItem;
                                          }));
                                      }}
                                id={item.id}
                                getChildAmount={getChildAmount}
                                addCategory={addCategory}
                                headCategory={headCategory}
                                removeCategory={removeCategory}
                                editingItems={editingChildItems}
                                amountCategories={nearestChildren.length + (categoryDialog ? 0.5 : 0)}
                                position={ind === 0 ? 'first' : ind === nearestChildren.length - 1 ? 'last' : null }
                                addLinkCoordinate={ind === 0 || ind === nearestChildren.length - 1 ? addLinkCoordinates : null}
                    />
            )}
            {categoryDialog && <AddCategory
                isSingle={nearestChildren.length === 0}
                endAdding={() => {
                    setCategoryDialog(false)
                }}
                addEditItem={() => setEditingChildItems(prev => prev)}
                add={(text) => addSubCategory(text)}
                editingItems={editingChildItems}
                amountCategories={nearestChildren.length}
                position={'last'}
                addLinkCoordinate={addLinkCoordinates}
            />}
        </div>
    );
};

export default SubCategoriesList;