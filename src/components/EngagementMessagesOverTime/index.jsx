import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { ChannelData } from '../../data/ChannelData';
import { MessageData } from '../../data/MessageData';
import engagementHelper from './EngagementHelper';

const EngagementMessagesOverTime = () => {
    const options = engagementHelper.engagementMessageOverTimeChartOptions(
        MessageData.messageCountList,
        ChannelData.channels
    );

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
