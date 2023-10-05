import React, {useState} from 'react';
import styles from '../styles/services.module.scss';
import Service from "./Service";
import Header from "./Header";

const Services = () => {
    const [scale, setScale] = useState(1);
    return (
        <section className={styles.services__section}>
            <Header setScale={(scale) => setScale(scale)}
                    scale={scale}/>
                <Service scale={scale}/>
        </section>
    );
};

export default Services;