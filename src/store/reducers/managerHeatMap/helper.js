const recursiveSearchAndUpdate = (obj, data) => {
    if (obj.hasOwnProperty(data.parameter)) {
        if (obj[data.parameter].hasOwnProperty('scores') === false)
            obj[data.parameter]['scores'] = {}

        obj[data.parameter]['scores'][data.manager] = data.score
    } else {
        for (const property in obj) {
            if (typeof obj[property] === 'object')
                recursiveSearchAndUpdate(obj[property], data);
        }
    }
}

export const reduceHeatMapData = (data) => {
    let definitions = {}
    data.definitions.forEach((val, idx, arr) => {
        if (definitions.hasOwnProperty(val.index) === false)
            definitions[val.index] = {};
        if (definitions[val.index].hasOwnProperty(val.topic) === false)
            definitions[val.index][val.topic] = {};
        definitions[val.index][val.topic][val.subTopic] = {}
    })

    data.data.forEach((val, idx, arr) => {
        recursiveSearchAndUpdate(definitions, val)
    })
    return definitions
}

export const getTableData = (inputData) => {
    let xAxis = [],
        yAxis = [],
        data = [];

    for (let key in inputData) {
        if (inputData[key]?.scores)
            xAxis.push(...(Object.keys(inputData[key]?.scores ?? [])))
    }

    xAxis = [...new Set(xAxis)]
    yAxis = Object.keys(inputData).filter(ele => ele !== 'scores')

    for (let i = 0; i < xAxis.length; i++) {
        data[i] = [];
        for (let j = 0; j < yAxis.length; j++)
            data[i][j] = inputData[yAxis[j]].scores[xAxis[i]];
    }

    return { xAxis, yAxis, data };
}