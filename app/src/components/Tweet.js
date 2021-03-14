export const Tweet = (props) => {
    return (
        <div className='Tweet'>
            <p className='TweetUser'>@{props.user}</p>
            <p className='TweetText'>{props.text}</p>
        </div>
    )
}