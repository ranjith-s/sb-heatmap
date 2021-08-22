import { configureStore } from '@reduxjs/toolkit'
import heatMapReducer from './reducers/managerHeatMap/heatMapSlice'

export default configureStore({
    reducer: {
        heatMap: heatMapReducer
    },
})