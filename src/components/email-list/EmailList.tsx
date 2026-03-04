import styles from './EmailList.module.scss'

function EmaiList() {
    return (
        <div style={{
        padding: '1rem',
    }}>
            
            <h1>E-mail list</h1>
            <div className={styles.list}>
                <div>Message 1</div>
                <div>Message 2</div>
                <div>Message 3</div>
            </div>
            {/**<div>components/EmailList.tsx</div>*/}
        </div>
    )
}

export default EmaiList