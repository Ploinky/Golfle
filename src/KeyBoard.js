import styles from './KeyBoard.module.scss'

function KeyBoard({keyPressed}) {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <button className={styles.numBtn} onClick={() => keyPressed('1')}>1</button>
                <button className={styles.numBtn} onClick={() => keyPressed('2')}>2</button>
                <button className={styles.numBtn} onClick={() => keyPressed('3')}>3</button>
            </div>
            <div className={styles.row}>
                <button className={styles.numBtn} onClick={() => keyPressed('4')}>4</button>
                <button className={styles.numBtn} onClick={() => keyPressed('5')}>5</button>
                <button className={styles.numBtn} onClick={() => keyPressed('6')}>6</button>
            </div>
            <div className={styles.row}>
                <button className={styles.numBtn} onClick={() => keyPressed('7')}>7</button>
                <button className={styles.numBtn} onClick={() => keyPressed('8')}>8</button>
                <button className={styles.numBtn} onClick={() => keyPressed('9')}>9</button>
            </div>
            <div className={styles.row}>
                <button className={styles.numBtn} onClick={() => keyPressed('0')}>0</button>
                <button className={styles.numBtn} onClick={() => keyPressed('Enter')}>{String.fromCodePoint('0x21A9')}</button>
                <button className={styles.numBtn} onClick={() => keyPressed('Backspace')}>{String.fromCodePoint('0x232B')}</button>
            </div>
        </div>
    )
}

export default KeyBoard