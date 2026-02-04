import { motion } from 'framer-motion';
import { SoundOutline, AudioOutline } from 'antd-mobile-icons';
import { useState } from 'react';

// 格式化时间戳
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

// 消息进入动画
const messageVariants = {
    hidden: (isMine) => ({
        opacity: 0,
        x: isMine ? 20 : -20,
        scale: 0.95,
    }),
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

// 表情动画
const emojiVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
        }
    }
};

const MessageItem = ({ message, isMine }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playProgress, setPlayProgress] = useState(0);
    const { text, timestamp, type, duration } = message;

    // 检查是否包含表情符号
    const containsEmoji = text && /\p{Emoji}/u.test(text);
    const isOnlyEmoji = text && containsEmoji && text.length <= 4;

    // 处理语音播放
    const togglePlay = () => {
        if (isPlaying) {
            setIsPlaying(false);
            setPlayProgress(0);
        } else {
            setIsPlaying(true);
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setPlayProgress(progress / (duration * 10) * 100);
                if (progress >= duration * 10) {
                    clearInterval(interval);
                    setIsPlaying(false);
                    setPlayProgress(0);
                }
            }, 100);
        }
    };

    return (
        <motion.div
            className={`flex mb-3 ${isMine ? 'justify-end' : 'justify-start'} px-2`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            custom={isMine}
        >
            {!isMine && (
                <div className="avatar mr-2">
                    <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="头像"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className={`max-w-[70%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                <div
                    className={`px-3 py-2 rounded-lg ${isMine
                        ? 'bg-message-mine text-white'
                        : 'bg-message-other text-black'
                        } ${isOnlyEmoji ? 'bg-transparent !p-0 shadow-none' : ''}`}
                >
                    {type === 'voice' ? (
                        <div
                            className="flex items-center gap-2 min-w-[120px] py-3 px-3"
                            style={{
                                height: '40px'
                            }}
                            onClick={togglePlay}
                        >
                            <motion.div
                                animate={isPlaying ? {
                                    scale: [1, 1.2, 1],
                                    transition: { repeat: Infinity, duration: 1 }
                                } : {}}
                            >
                                {isPlaying ? (
                                    <AudioOutline className="text-lg" />
                                ) : (
                                    <SoundOutline className="text-lg" />
                                )}
                            </motion.div>
                            <div className="flex-1 h-10 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full ${isMine ? 'bg-white' : 'bg-blue-500'}`}
                                    style={{ width: `${playProgress}%` }}
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${playProgress}%` }}
                                    transition={{ ease: "linear" }}
                                />
                            </div>
                            <span className="text-xs font-medium">{duration}"</span>
                        </div>
                    ) : isOnlyEmoji ? (
                        <motion.p
                            className="m-0 text-3xl"
                            variants={emojiVariants}
                            initial="initial"
                            animate="animate"
                        >
                            {text}
                        </motion.p>
                    ) : (
                        <p className="m-0 break-words text-sm leading-relaxed">{text}</p>
                    )}
                </div>
                <span className="text-xs text-gray-500 mt-1 px-1">{formatTime(timestamp)}</span>
            </div>

            {isMine && (
                <div className="avatar ml-2">
                    <img
                        src="https://i.pravatar.cc/150?img=57"
                        alt="我的头像"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </motion.div>
    );
};

export default MessageItem;