export function toCsv(rows) {
    if (!rows || rows.length === 0) return "";

    const cell = (v) => {
        const s = String(v ?? "");
        // Quote if contains comma, quote, or newline
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const headers = Object.keys(rows[0]);
    const headerRow = headers.map(cell).join(",");

    const bodyRows = rows.map((row) =>
        headers.map((header) => cell(row[header])).join(",")
    );

    return [headerRow, ...bodyRows].join("\n");
}