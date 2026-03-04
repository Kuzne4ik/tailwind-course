import axios from "axios";
import type { IMessage } from "../pages/home/types";

class EmailService {


    BASE_URL = "http://localhost:3000/";  // npx json-server db.json
    MESSAGES_URL = this.BASE_URL + "messages";

    async getMessages(): Promise<IMessage[]>{
        try {
            const { data } = await axios.get<IMessage[]>(this.MESSAGES_URL)
            return data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    async sendEmail(subject: string, text: string): Promise<IMessage> {
        // Validate parameters
        if (!subject || subject.trim() === '') {
            throw new Error('Subject cannot be empty');
        }
        if (!text || text.trim() === '') {
            throw new Error('Message text cannot be empty');
        }
        
        try {
            const {data} = await axios.post<IMessage>(
                this.MESSAGES_URL, 
                {
                    subject,
                    text,
                })
            return data;
        } catch (error) {
            console.error('Error sending email: ', error);
            throw error;
        }
    }

}

export const emailService = new EmailService();