import "./ChartDataTable.css";

export default function ChartDataTable({ data }) {
    if (!data || data.length === 0) return null;

    const keys = Object.keys(data[0]);
    const isNumeric = (key) => typeof data[0][key] === "number";

    return (
        <table className="chart-data-table">
            <caption className="sr-only">Data table for the chart above</caption>
            <thead>
                <tr>
                    {keys.map((key) => (
                        <th
                            key={key}
                            scope="col"
                            className={isNumeric(key) ? "numeric-cell" : ""}
                        >
                            {key}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={i}>
                        {keys.map((key) => (
                            <td
                                key={key}
                                className={typeof row[key] === "number" ? "numeric-cell" : ""}
                            >
                                {row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}