import React from 'react'
import styles from './HowTo.module.scss'

function HowTo() {
    return (
        <div className={styles.howTo}>
            <span>Guess the score of the player.</span>
            <span>Use their overall score as well as the par on each hole to estimate the correct score.</span>
            <span>After you guess one complete row, the row will be colour-coded.</span>
            <span>Red means that the score was not achieved on any hole with the specified par.</span>
            <span>Yellow means that the score was achieved on another hole with the same par.</span>
            <span>Green means that your guess on that hole was correct.</span>
        </div>
    )
}

export default HowTo;