import Highcharts from 'highcharts';

const engagementHelper = {
    engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
        const groupedMessages = messageCountList.reduce((acc, message) => {
            const channelId = message.channelId;
            if (!acc[channelId]) {
                acc[channelId] = [];
            }
            acc[channelId].push(message);
            return acc;
        }, {});

        const channelsWithMultipleDates = Object.values(groupedMessages)
            .filter((messages) => messages.length > 1)
            .map((messages) => messages[0].channelId);

        const relevantChannels = channels.filter((channel) =>
            channelsWithMultipleDates.includes(channel.id)
        );

        const seriesData = relevantChannels.map((channel) => {
            const messages = groupedMessages[channel.id];
            return {
                name: channel.name,
                data: messages.map((message) => ({
                    x: new Date(message.timeBucket).getTime(),
                    y: parseInt(message.count),
                })),
            };
        });

        const options = {
            chart: {
                type: 'line',
            },
            title: {
                text: 'Frontend Assignment',
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Date',
                },
            },
            yAxis: {
                title: {
                    text: 'Message Count',
                },
            },
            tooltip: {
                formatter: function () {
                    return `<strong>${this.series.name}</strong>
                    <br/>
                    ${this.y} messages on ${Highcharts.dateFormat(
                        '%d %b',
                        new Date(this.x)
                    )}`;
                },
            },
            series: seriesData,
        };

        return options;
    },
};

export default engagementHelper;
