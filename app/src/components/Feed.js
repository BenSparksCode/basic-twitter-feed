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
        <CardContainer className='Feed'>
            {
                !userFeedLoaded
                    ?
                    <div><Spin className='StatsIndicator' indicator={loadingIcon} /> Loading Tweets</div>
                    :
                    userFeed?.length > 0
                        ?
                        <div>
                            {userFeed.map((tweet, index) =>
                                <Tweet key={index} user={tweet.user} text={tweet.text} />)}
                            <hr />
                        </div>
                        :
                        <p>No tweets yet...</p>
            }
        </CardContainer>
    )
}
