import EmailEditor from "./components/email-editor/EmailEditor";
import EmailList from "./components/email-list/EmailList";


function Home(){
    return <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 6fr',
        padding: '1.5rem',
    }}>

    <EmailList />
    <EmailEditor/>
        
    </div>
}

export default Home;