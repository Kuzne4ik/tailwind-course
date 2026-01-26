import type { IDetails } from './App'

// Коллекция для маппинга
const MENU = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Products',
    link: '/products'
  }
]



// Define TypeScript interface for props
interface DetailsProps {
    details: IDetails;
    setDetails: React.Dispatch<React.SetStateAction<IDetails>>;
}

function Details({ details, setDetails }: DetailsProps) {
    return (
        <div className="details-container">
            <h2 className="details-title">{details.title || "Default Title"}</h2>
            <h1 className="details-heading">First component 111</h1>

            <button onClick={() => setDetails((prev: IDetails) => {
                return {
                    ...prev,
                    title: "NEW TITLE"
                }
            })}>Set New Title</button>
            
            {/* Input to update the title */}
            <div className="title-input-container">
                <label htmlFor="title-input">Update Title:</label>
                <input
                    id="title-input"
                    type="text"
                    value={details.title}
                    onChange={(e) => setDetails({...details, title: e.target.value})}
                    className="title-input"
                    placeholder="Enter a title..."
                />
            </div>
            
            {/* Пример маппинга*/}
            <div className="menu-items">
                <h3>Menu Items:</h3>
                {MENU.map(item => (
                    <p key={item.link} className="menu-item">
                        <strong>{item.name}</strong>: {item.link}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Details;