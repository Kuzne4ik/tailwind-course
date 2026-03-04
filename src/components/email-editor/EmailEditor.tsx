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
    const formatText = (tagName: string) => {
        // Validate tagName
        const validTags = [
            'strong', // Bold text
            'em',     // Italic text
            'u',      // Underlined text
            's',      // Strikethrough text
            'mark',   // Highlighted text
            'small',  // Smaller text
            'sub',    // Subscript
            'sup',    // Superscript
            'code',   // Code formatting
            'pre',    // Preformatted text
            'blockquote', // Block quotation
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6' // Headings
        ];
        if (!validTags.includes(tagName)) {
            console.error(`Invalid tagName: ${tagName}. Must be one of: ${validTags.join(', ')}`);
            return;
        }
        
        // Какой элемент выделен
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const selectedText = range.toString();
            
            if (selectedText.length > 0) {
                // Check if the selection is already wrapped in the specified tag
                let parentElement = range.commonAncestorContainer;
                if (parentElement.nodeType === Node.TEXT_NODE && parentElement.parentElement) {
                    parentElement = parentElement.parentElement;
                }
                
                // Check if any parent element has the specified tag (see `validTags`)
                let elementToRemove = null;
                let currentElement: HTMLElement | null = parentElement as HTMLElement;
                while (currentElement && currentElement !== editorRef.current) {
                    if (currentElement.tagName && currentElement.tagName.toLowerCase() === tagName.toLowerCase()) {
                        elementToRemove = currentElement;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }
                
                try {
                    if (elementToRemove) {
                        // Remove formatting: unwrap the content
                        const parent = elementToRemove.parentNode;
                        if (parent) {
                            while (elementToRemove.firstChild) {
                                parent.insertBefore(elementToRemove.firstChild, elementToRemove);
                            }
                            parent.removeChild(elementToRemove);
                        }
                    } else {
                        // Add formatting: wrap the content
                        const element = document.createElement(tagName);
                        range.surroundContents(element);
                    }
                    
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
    
    /** Выполнить команду отправить собщение */
    const sendEmail = () => {
        alert('Email sent: ' + text);
    };
    
    return (
        <div style={{
        padding: '1rem',
    }}>
            <h1>E-mail editor</h1>
            <div className={styles.preview} dangerouslySetInnerHTML={{ __html: text }}></div>
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
                        <button onClick={() => formatText('strong')}><LucideBold size={17}/></button>
                        <button onClick={() => formatText('em')}><LucideItalic size={17}/></button>
                        <button onClick={() => formatText('u')}><LucideUnderline size={17}/></button>
                    </div>
                    <button onClick={sendEmail}>Send now</button>
                </div>
            </div>

            
            {/**<div className={styles.card}>components/EmailEditor.tsx</div>*/}
        </div>
    )
}

export default EmailEditor