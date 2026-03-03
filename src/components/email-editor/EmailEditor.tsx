import { LucideBold, LucideEraser, LucideItalic, LucideUnderline } from 'lucide-react'
import styles from './EmailEditor.module.scss'
import { useState, useRef} from 'react'

function EmailEditor() {
    const [text, setText] = useState(`Hello, Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quisquam doloremque architecto ducimus quos ut distinctio accusamus molestias
                     sint inventore deleniti atque quia deserunt aliquid, 
                     numquam quod impedit perspiciatis eligendi earum.`);
    
    /** Ссылка на поле ввода */
    const editorRef = useRef<HTMLDivElement>(null);
    
    /** перхват события ввода с клавиатуры */
    const handleInputChange = () => {
        if (editorRef.current) {
            setText(editorRef.current.innerHTML);
        }
    };
    
    /** Выполнить команду очистик поля ввода*/
    const clearText = () => {
        setText('');
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
        }
    };
    
    /** Выполнить команду форматирование текста */
    const formatText = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        handleInputChange();
    };
    
    /** Выполнить команду отправи соббщения */
    const sendEmail = () => {
        alert('Email sent: ' + text);
    };
    
    return (
        <div>
            <h1>E-mail editor</h1>
            <div className={styles.card}>
                <div 
                    ref={editorRef}
                    contentEditable
                    className={styles.editor}
                    onInput={handleInputChange}
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <div className={styles.actions}>
                    <div className={styles.tools}>
                        <button onClick={clearText}><LucideEraser size={17}/></button>
                        <button onClick={() => formatText('bold')}><LucideBold size={17}/></button>
                        <button onClick={() => formatText('italic')}><LucideItalic size={17}/></button>
                        <button onClick={() => formatText('underline')}><LucideUnderline size={17}/></button>
                    </div>
                    <button onClick={sendEmail}>Send now</button>
                </div>
            </div>
            {/**<div className={styles.card}>components/EmailEditor.tsx</div>*/}
        </div>
    )
}

export default EmailEditor