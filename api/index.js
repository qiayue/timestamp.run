// 计算时间戳对应的日期
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
}

// 生成从 start 到 end 的时间戳数组
function generateTimestamps(start, end) {
    const timestamps = [];
    for (let i = start; i <= end; i++) {
        timestamps.push(i);
    }
    return timestamps;
}

module.exports = async (req, res) => {
    // 生成时间戳数组
    const timestamps = generateTimestamps(1711987200, 1711987300);

    // 格式化时间戳并构建 HTML 列表
    const timestampList = timestamps.map(timestamp => {
        const formattedDate = formatDate(timestamp);
        return `<li>Timestamp <a href="/time/${timestamp}">${timestamp}</a> corresponds to ${formattedDate}</li>`;
    });

    // 构建 HTML 响应
    const htmlResponse = `
        <html>
        <head>
            <title>Timestamp List</title>
        </head>
        <body>
            <h1>Timestamp List</h1>
            <ul>
                ${timestampList.join('')}
            </ul>
        </body>
        </html>
    `;

    // 发送 HTML 响应
    res.status(200).send(htmlResponse);
};
