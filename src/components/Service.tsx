import React, {useEffect, useRef, useState} from 'react';
import HeadCategory from "./Category/HeadCategory";
import styles from '../styles/service.module.scss';
type ServiceProps = {
    scale: number
}
const Service = ({scale}: ServiceProps) => {
    const serviceRef = useRef<HTMLDivElement>(null);
    const initialPositionRef = useRef<{ scrollTop: number, scrollLeft: number, mouseX: number, mouseY: number }>();
    const mouseMoveHandler = (event: { clientX: number; clientY: number }) => {
        if (serviceRef.current && initialPositionRef.current) {

            const initialPosition = initialPositionRef.current;
            const dx = -(event.clientX - initialPosition.mouseX) + initialPosition.scrollLeft;
            const dy = -(event.clientY - initialPosition.mouseY) + initialPosition.scrollTop;

            window.scrollTo({left: dx, top: dy})
        }
    };

    const mouseUpHandler = () => {
        if (serviceRef.current) {
            serviceRef.current.style.cursor = 'grab';
        }

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    const onMouseDown = (event: { clientX: number; clientY: number }) => {
        if (serviceRef.current) {
            initialPositionRef.current = {
                scrollLeft: window.scrollX,
                scrollTop: window.scrollY,
                mouseX: event.clientX,
                mouseY: event.clientY,
            };

            serviceRef.current.style.cursor = 'grabbing';
            serviceRef.current.style.userSelect = 'none';

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        }
    };
    return (
        <div className={styles.service}
             ref={serviceRef} onMouseDown={onMouseDown}>
            <div className={''}
                 style={{scale: scale.toString()}}
            >
                <HeadCategory scale={scale}/>
            </div>
        </div>
    );
};

export default Service;