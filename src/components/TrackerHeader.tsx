
const TrackerHeader = ({handleFormReveal}: {handleFormReveal: React.MouseEventHandler<HTMLElement>}) => {
    return (
        <ul className="tracker-tabs">
        <li>currently reading</li>
        <li>finished</li>
        <li>want to read</li>
        <button onClick={handleFormReveal}>add new entry</button>
    </ul>
    );
}

export default TrackerHeader;