import React, {useEffect, useRef, useState} from 'react';
import HeadCategory from "./Category/HeadCategory";
import styles from '../styles/service.module.scss';
import Header from "./Header";
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
        // Return to cursor: grab after the user is no longer pressing
        if (serviceRef.current) {
            serviceRef.current.style.cursor = 'grab';
        }

        // Remove the event listeners since it is not necessary to track the mouse position anymore
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    const onMouseDown = (event: { clientX: number; clientY: number }) => {
        if (serviceRef.current) {
            // Save the position at the moment the user presses down
            initialPositionRef.current = {
                scrollLeft: window.scrollX,
                scrollTop: window.scrollY,
                mouseX: event.clientX,
                mouseY: event.clientY,
            };
         /*   console.log({
                scrollLeft: window.scrollX,
                scrollTop: window.scrollY,
                mouseX: event.clientX,
                mouseY: event.clientY,
            });*/
            // Show a cursor: grabbing style and set user-select: none to avoid highlighting text while dragging
            serviceRef.current.style.cursor = 'grabbing';
            serviceRef.current.style.userSelect = 'none';

            // Add the event listeners that will track the mouse position for the rest of the interaction
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