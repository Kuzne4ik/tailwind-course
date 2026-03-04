import { emailService } from '../../services/email.service';
import { useQuery } from '@tanstack/react-query';
import styles from './EmailList.module.scss'

function EmailList() {

    const {data} = useQuery({
        queryKey: ['email messages'],
        queryFn: () => emailService.getMessages()
    });


    return (
        <div style={{
        padding: '1rem',
    }}>
            
            <h1>E-mail list</h1>
            <div className={styles.list}>
                {data ? data.map((message, index) => (
                    <div id={"message:" + message.id} key={index}>{
                        "ID:" + message.id + " " + message.subject}</div>
                )) 
                : (
                    <>
                        <div>Erorr in request please check DB</div>
                    </>
                )}
            </div>
            {/**<div>components/EmailList.tsx</div>*/}
        </div>
    )
}

export default EmailList