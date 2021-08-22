import {
    useCallback,/*, useEffect*/
    useEffect,
    useState
} from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { selectHeatMapIndex, selectHeatMapIndexList, selectHeatMapTopic, selectHeatMapTopicList, setSelectedIndexAsync, setSelectedTopicAsync } from '../../../store/reducers/managerHeatMap/heatMapSlice';
import './HeatMapControls.css'

function HeatMapControls() {
    const dispatch = useDispatch()
    const indexes = useSelector(selectHeatMapIndexList)
    const selectedIndex = useSelector(selectHeatMapIndex);
    const topics = useSelector(selectHeatMapTopicList);
    const selectedTopic = useSelector(selectHeatMapTopic);

    const [isTopicDropdownDisabled, setTopicDropdownDisabled] = useState(false)

    // useEffect(() => {
    //     console.log(indexes, selectedIndex, topics, selectedTopic)
    // }, [indexes, selectedIndex, topics, selectedTopic])

    const selectIndexHandler = useCallback((eventKey, event) => {
        // console.log(eventKey)
        dispatch(setSelectedIndexAsync(eventKey))
    }, [dispatch]);

    const selectTopicHandler = useCallback((eventKey, event) => {
        // console.log(eventKey)
        dispatch(setSelectedTopicAsync(eventKey))
    }, [dispatch]);

    useEffect(() => {
        setTopicDropdownDisabled((!selectedIndex ?? !topics.length))
    }, [selectedIndex, topics])

    return (
        <div className="d-flex flex-row justify-content-start p-2 heat-map-controls">
            <Dropdown className="mx-2" id="indexes-dropdown" selectText={"Select Index"} selectedItem={selectedIndex} onSelect={selectIndexHandler} values={indexes} />
            <Dropdown className="mx-2" variant={isTopicDropdownDisabled ? "secondary" : "outline-primary"} id="topics-dropdown" selectText={"Select Topic"} selectedItem={selectedTopic} onSelect={selectTopicHandler} values={topics} disabled={isTopicDropdownDisabled} />
        </div>
    )
}

export default HeatMapControls
