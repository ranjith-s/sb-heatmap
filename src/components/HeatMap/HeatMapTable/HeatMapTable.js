import { Table } from 'react-bootstrap';
import "./HeatMapTable.css"

function HeatMapTable({
    tableData,
    id
}) {

    const getBackgroundStyle = (val) => {
        let styles = {
            backgroundColor: "",
            borderColor: "",
        }
        if (val < 2) {
            styles.backgroundColor = "#FF5252"
            styles.border = "solid #C62828 3px"

        } else if (val >= 4) {
            styles.backgroundColor = "#4DB6AC"
            styles.border = "solid #2E7D32 3px"

        } else {
            styles.backgroundColor = "#FFFF8D"
            styles.border = "solid #F57F17 3px"

        }
        return styles
    }
    return (
        <Table striped bordered hover id={id} className="heat-map-table">
            <thead>
                <tr>
                    <th>#</th>
                    {tableData.yAxis.map((ele, idx) =>
                        <th key={id + 'th' + idx}>{ele}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tableData.xAxis.map((ele, idx) =>
                    <tr key={id + 'tr' + idx}>
                        <td>{ele}</td>
                        {tableData.data[idx].map((item, itemIdx) => {
                            return (
                                <td key={id + 'tr' + idx + 'td' + itemIdx}>
                                    <div style={getBackgroundStyle(item)}>
                                        {item}
                                    </div>
                                </td>
                            )
                        }
                        )}
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default HeatMapTable