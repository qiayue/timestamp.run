// 计算时间戳对应的日期
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
}

module.exports = async (req, res) => {
    const { timestamp } = req.query;
    
    if (!timestamp) {
        return res.status(400).send('Timestamp parameter is missing');
    }

    const formattedDate = formatDate(parseInt(timestamp, 10));
    res.status(200).send(`Timestamp ${timestamp} corresponds to ${formattedDate}`);
};
