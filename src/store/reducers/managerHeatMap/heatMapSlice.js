import { createSlice, current } from '@reduxjs/toolkit';
import { getTableData, reduceHeatMapData } from './helper';
import { getHeatMapData } from '../../../services';

export const heatMapSlice = createSlice({
  name: 'heatMap',
  initialState: {
    heatMap: {},
    tableData: {
      xAxis: [],
      yAxis: [],
      data: [],
    },
    indexes: [],
    topics: [],
    selectedIndex: null,
    selectedTopic: null,
  },
  reducers: {
    setHeatMap: (state, action) => {
      state.heatMap = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setIndexes: (state, action) => {
      state.indexes = action.payload;
    },
    setTopics: (state, action) => {
      const { heatMap } = current(state)
      state.topics = Object.keys(heatMap[action.payload]).filter(ele => ele !== 'scores') ?? [];
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setDefaultTopic: (state, action) => {
      state.selectedTopic = null;
    },
    setTableDataForSelectedIndex: (state, action) => {
      const { heatMap } = current(state)
      state.tableData = getTableData(heatMap[action.payload]);
    },
    setTableDataForSelectedTopic: (state, action) => {
      const { heatMap, selectedIndex } = current(state)
      state.tableData = getTableData(heatMap[selectedIndex][action.payload]);
    },
  },
});

export const { setHeatMap, setTableData, setIndexes, setTopics, setSelectedIndex, setSelectedTopic, setDefaultTopic, setTableDataForSelectedIndex, setTableDataForSelectedTopic } = heatMapSlice.actions;

export const setStateAsync = () => async (dispatch) => {
  let data = await getHeatMapData();
  if (data) {
    let heatMapData = reduceHeatMapData(data)
    dispatch(setHeatMap(heatMapData))
    dispatch(setTableData(getTableData(heatMapData)))
    dispatch(setIndexes(Object.keys(heatMapData).filter(ele => ele !== 'scores') ?? []))
  }
};

export const setSelectedIndexAsync = (index) => async (dispatch) => {
  await dispatch(setSelectedIndex(index))
  await dispatch(setTopics(index))
  await dispatch(setTableDataForSelectedIndex(index))
  await dispatch(setDefaultTopic())
};

export const setSelectedTopicAsync = (topic) => async (dispatch) => {
  await dispatch(setSelectedTopic(topic))
  await dispatch(setTableDataForSelectedTopic(topic))
};

export const selectTableData = state => state.heatMap.tableData;

export const selectHeatMap = state => state.heatMap.heatMap;

export const selectHeatMapIndexList = state => state.heatMap.indexes;

export const selectHeatMapIndex = state => state.heatMap.selectedIndex;

export const selectHeatMapTopicList = state => state.heatMap.topics;

export const selectHeatMapTopic = state => state.heatMap.selectedTopic;

export default heatMapSlice.reducer;
