import EmailEditor from "./components/email-editor/EmailEditor";
import EmailList from "./components/email-list/EmailList";


function Home(){
    return <div>
        <EmailEditor/>
        <EmailList />
    </div>
}

export default Home;