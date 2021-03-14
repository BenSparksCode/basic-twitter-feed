import { useContext } from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { AppContext } from '../contexts/AppContext'

import { CardContainer } from './Card'
import { Tweet } from './Tweet'

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Feed = () => {

    const { userFeed, userFeedLoaded } = useContext(AppContext)


    return (
        <CardContainer>
            {
                !userFeedLoaded
                    ?
                    <p><Spin className='StatsIndicator' indicator={loadingIcon} /> Loading Tweets</p>
                    :
                    userFeed?.length > 0
                        ?
                        userFeed.map(tweet => <Tweet tweetData={tweet} />)
                        :
                        <p>No tweets yet...</p>
            }
        </CardContainer>
    )
}
