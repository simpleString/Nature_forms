import React from "react";
import styles from '../styles/nav.module.css';

export const Nav = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.nav}>

            <div className={styles.navElement}><a href="">Main</a></div>
            <div className={styles.navElement}><a href="">Not main</a></div>
            </div>
            <div className={styles.backNav}>
                Login
            </div>
        </div>
        );
};
