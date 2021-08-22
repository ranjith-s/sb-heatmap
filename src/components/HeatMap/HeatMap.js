import {
    useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStateAsync } from '../../store/reducers/managerHeatMap/heatMapSlice';
import { selectTableData } from '../../store/reducers/managerHeatMap/heatMapSlice';
import HeatMapTable from './HeatMapTable/HeatMapTable';
import HeatMapControls from './HeatMapControls/HeatMapControls';

function HeatMap() {
    const dispatch = useDispatch()

    const tableData = useSelector(selectTableData);

    useEffect(() => {
        dispatch(setStateAsync())
    }, [dispatch])

    return (
        <div className="">
            <HeatMapControls />
            <HeatMapTable id={'managerHeatMapTable'} tableData={tableData} />
        </div>
    )
}

export default HeatMap