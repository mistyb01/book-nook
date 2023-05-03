type Props = {
    display: string,
    handleSetDisplay: Function
}
const TrackerHeader = ({display, handleSetDisplay}: Props) => {
    return (
        <ul className="tracker-tabs">
        <li onClick={()=>handleSetDisplay('current')} className={`${ display === 'current' ? 'active-tab' : ''}`}>currently reading</li>
        <li onClick={()=>handleSetDisplay('finished')} className={`${ display === 'finished' ? 'active-tab' : ''}`}>finished</li>
        <li onClick={()=>handleSetDisplay('tbr')} className={`${ display === 'tbr' ? 'active-tab' : ''}`}>want to read</li>
        <button onClick={()=>handleSetDisplay('add')}>add new entry</button>
    </ul>
    );
}

export default TrackerHeader;