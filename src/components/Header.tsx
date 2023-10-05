import React, {useState} from 'react';
import styles from '../styles/header.module.scss';
type HeaderProps = {
    scale: number;
    setScale: (scale: number) => void;
}
const Header = ({scale, setScale}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__block}>
                <h1 className={styles.header__title}>Services</h1>
                <span className={styles.header__services_amount}>{0}</span>
            </div>
            <div className={styles.header__block}>
                <button className={styles.header__listView_btn}>list view</button>
                <button className={styles.header__gray_block} onClick={() => {
                    window.scrollTo(1600, 600);
                }}>
                    <svg viewBox="0 0 15 15" width={12} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0.696974 0.0404421C0.509053 -0.0400956 0.291031 0.00189163 0.146461 0.146461C0.00189163 0.291031 -0.0400956 0.509053 0.0404421 0.696974L6.04044 14.697C6.12222 14.8878 6.31338 15.0082 6.52079 14.9996C6.7282 14.991 6.90871 14.8551 6.97436 14.6581L8.8953 8.8953L14.6581 6.97436C14.8551 6.90871 14.991 6.7282 14.9996 6.52079C15.0082 6.31338 14.8878 6.12222 14.697 6.04044L0.696974 0.0404421Z" fill="#969696"></path> </g></svg>
                </button>
                <button className={styles.header__gray_block}
                        onClick={() => setScale(scale - 0.1)}>&minus;</button>
                <span className={styles.header__gray_block} style={{width: 70}}>{Math.round(scale * 100)}%</span>
                <button className={styles.header__gray_block}
                        onClick={() => setScale(scale + 0.1)}>+</button>
            </div>
        </header>
    );
};

export default Header;