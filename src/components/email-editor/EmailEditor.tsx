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
    
    /** Выполнить команду ввод текста  */
    const handleInputChange = () => {
        if (editorRef.current) {
            // Save cursor position
            const selection = window.getSelection();
            // Cursor postion in text 
            let cursorPosition = 0;
            
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(editorRef.current);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                cursorPosition = preCaretRange.toString().length;
            }
            
            setText(editorRef.current.innerHTML);
            
            // Restore cursor position after React re-render
            setTimeout(() => {
                if (editorRef.current && cursorPosition > 0) {
                    const range = document.createRange();
                    const selection = window.getSelection();
                    
                    const walker = document.createTreeWalker(
                        editorRef.current,
                        NodeFilter.SHOW_TEXT,
                        null
                    );
                    
                    let currentPos = 0;
                    let foundNode = null;
                    let offset = 0;
                    
                    while (walker.nextNode()) {
                        const nodeLength = walker.currentNode.textContent?.length || 0;
                        if (currentPos + nodeLength >= cursorPosition) {
                            foundNode = walker.currentNode;
                            offset = cursorPosition - currentPos;
                            break;
                        }
                        currentPos += nodeLength;
                    }
                    
                    if (foundNode && selection) {
                        range.setStart(foundNode, offset);
                        range.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            }, 0);
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
    const formatText = (command: string) => {
        // Какой элемент выделен
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            
            if (selectedText.length > 0) {
                let element;
                
                switch (command) {
                    case 'bold':
                        element = document.createElement('strong');
                        break;
                    case 'italic':
                        element = document.createElement('em');
                        break;
                    case 'underline':
                        element = document.createElement('u');
                        break;
                    default:
                        return;
                }
                
                try {
                    range.surroundContents(element);
                    
                    // Update the text state without losing cursor position
                    if (editorRef.current) {
                        setText(editorRef.current.innerHTML);
                    }
                } catch (error) {
                    // Fallback for complex selections
                    console.error('Could not format text:', error);
                }
            }
        }
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
                    className={styles.editor}
                    contentEditable
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