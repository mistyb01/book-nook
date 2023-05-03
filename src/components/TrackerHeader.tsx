type Props = {
    displayedList: string,
    handleFormReveal: React.MouseEventHandler<HTMLElement>,
    handleSetDisplayedList: Function
}
const TrackerHeader = ({displayedList, handleFormReveal, handleSetDisplayedList}: Props) => {
    return (
        <ul className="tracker-tabs">
        <li onClick={()=>handleSetDisplayedList('current')} className={`${ displayedList === 'current' ? 'active-tab' : ''}`}>currently reading</li>
        <li onClick={()=>handleSetDisplayedList('finished')} className={`${ displayedList === 'finished' ? 'active-tab' : ''}`}>finished</li>
        <li onClick={()=>handleSetDisplayedList('tbr')} className={`${ displayedList === 'tbr' ? 'active-tab' : ''}`}>want to read</li>
        <button onClick={handleFormReveal}>add new entry</button>
    </ul>
    );
}

export default TrackerHeader;