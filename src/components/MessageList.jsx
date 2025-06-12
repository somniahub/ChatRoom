import { useRef, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DotLoading, Empty } from 'antd-mobile';
import MessageItem from './MessageItem';
import useChatStore from '../store/chatStore';

const MessageList = () => {
    const { messages, loading, hasMore, loadMoreMessages } = useChatStore();
    const scrollRef = useRef(null);
    const messagesEndRef = useRef(null);

    // 新消息到达时滚动到底部
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages.length]);

    // 处理加载更多消息的函数
    const handleLoadMore = () => {
        if (hasMore && !loading) {
            loadMoreMessages();
        }
    };

    // 按日期分组消息，并确保每组内的消息按时间戳排序（从早到晚）
    const groupMessagesByDate = () => {
        // 先对所有消息按时间戳排序（从早到晚）
        const sortedMessages = [...messages].sort((a, b) => {
            return new Date(a.timestamp) - new Date(b.timestamp);
        });

        const groups = {};
        sortedMessages.forEach(message => {
            const date = new Date(message.timestamp);
            const dateStr = date.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            if (!groups[dateStr]) {
                groups[dateStr] = [];
            }
            groups[dateStr].push(message);
        });

        // 将日期组按照日期排序（从早到晚）
        const sortedDateEntries = Object.entries(groups).sort((a, b) => {
            const dateA = new Date(a[1][0].timestamp);
            const dateB = new Date(b[1][0].timestamp);
            return dateA - dateB;
        });

        return Object.fromEntries(sortedDateEntries);
    };

    const messageGroups = groupMessagesByDate();

    return (
        <div
            id="scrollableDiv"
            className="flex-1 overflow-y-auto"
            style={{
                height: 'calc(100vh - 120px)',
                marginTop: '56px',
                marginBottom: '64px',
                paddingBottom: '12px',
            }}
        >
            {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                    <Empty
                        description="暂无消息"
                        imageStyle={{ width: 128 }}
                    />
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={messages.length}
                    next={handleLoadMore}
                    hasMore={hasMore}
                    loader={
                        <div className="text-center py-3">
                            {loading ? (
                                <>
                                    <DotLoading color='primary' />
                                    <div className="text-xs text-gray-500 mt-1">加载更多消息...</div>
                                </>
                            ) : null}
                        </div>
                    }
                    scrollableTarget="scrollableDiv"
                    inverse={false}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    pullDownToRefresh={false}
                    endMessage={
                        <div className="flex justify-center my-4">
                            <div className="px-3 py-1 date-divider">
                                已加载全部消息
                            </div>
                        </div>
                    }
                    scrollThreshold="200px"
                >
                    <div className="flex flex-col">
                        {Object.entries(messageGroups).map(([dateStr, msgs], groupIndex) => (
                            <div key={dateStr} className="mb-4">
                                <div className="flex justify-center mb-4">
                                    <div className="px-3 py-1 date-divider">
                                        {dateStr}
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    {msgs.map((message) => (
                                        <MessageItem
                                            key={message.id}
                                            message={message}
                                            isMine={message.sender === 'me'}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/* 消息列表底部引用，用于自动滚动 */}
                        <div ref={messagesEndRef} />
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default MessageList; 