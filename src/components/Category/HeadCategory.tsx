import React, {useEffect, useState} from 'react';
import Category, {CategoryType} from "./Category";
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
    );
};

export default HeadCategory;