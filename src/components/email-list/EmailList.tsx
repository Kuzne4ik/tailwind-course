import { emailService } from '../../services/email.service';
import { useQuery } from '@tanstack/react-query';
import styles from './EmailList.module.scss'

function EmailList() {

    const {data, isError, isLoading} = useQuery({
        queryKey: ['email messages'],
        queryFn: () => emailService.getMessages()
    });


    return (
        <div style={{
        padding: '1rem',
    }}>
            
            <h1>E-mail list</h1>
            <div className={styles.list}>
                {isLoading && <div>Loading messages...</div>}
                {isError && <div>Error loading messages. Please check if the database server is running.</div>}
                {data && data.map((message, index) => (
                    <div id={"message:" + message.id} key={index}>
                        {"ID:" + message.id + " " + message.subject}
                    </div>
                ))}
            </div>
            <div>
                {isError && (
                    <div style={{color: 'red', marginTop: '10px'}}>
                        Failed to fetch messages from http://localhost:3000/messages. Make sure json-server is running.
                    </div>
                )}
            </div>
            {/**<div>components/EmailList.tsx</div>*/}
        </div>
    )
}

export default EmailList