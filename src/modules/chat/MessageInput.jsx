import { useState, useRef, useEffect } from 'react';
import { Button, Input, Toast } from 'antd-mobile';
import { SmileOutline, SoundOutline, CloseOutline } from 'antd-mobile-icons';
import { AnimatePresence } from 'framer-motion';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import useChatStore from '../store/chatStore';

const MessageInput = () => {
    const [text, setText] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const timerRef = useRef(null);
    const inputRef = useRef(null);
    const { sendMessage, sendVoiceMessage } = useChatStore();

    // 添加键盘事件监听
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey && text.trim()) {
                e.preventDefault();
                handleSend();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [text]);

    // 处理发送消息
    const handleSend = () => {
        if (!text.trim() && !isRecording) return;

        if (isRecording) {
            // 停止录制并发送
            clearInterval(timerRef.current);
            sendVoiceMessage(recordingTime);
            setRecordingTime(0);
            setIsRecording(false);
            Toast.show({
                content: '语音发送成功',
                duration: 1000,
            });
        } else {
            // 发送文本
            sendMessage({ text: text.trim() });
            setText('');
            Toast.show({
                content: '消息已发送',
                duration: 500,
            });
        }

        setShowEmoji(false);
    };

    // 处理表情选择
    const handleEmojiSelect = (emoji) => {
        setText((prev) => prev + emoji.native);
        // 添加表情选择的反馈
        Toast.show({
            content: emoji.native,
            duration: 500,
            position: 'center',
            icon: null,
        });
    };

    // 处理语音录制
    const handleVoiceRecord = () => {
        if (isRecording) {
            // 停止录制
            clearInterval(timerRef.current);
            sendVoiceMessage(recordingTime);
            setRecordingTime(0);
            Toast.show({
                content: '语音发送成功',
                duration: 1000,
            });
        } else {
            // 开始录制
            timerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
            Toast.show({
                content: '开始录音',
                duration: 1000,
            });
        }
        setIsRecording(!isRecording);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 input-area pb-safe">
            {/* 输入工具栏 */}
            <div className="flex justify-between items-center px-2 py-1">
                <div className="flex gap-2">
                    <div
                        className="input-toolbar-button"
                        onClick={() => setShowEmoji(!showEmoji)}
                    >
                        {showEmoji ? <CloseOutline /> : <SmileOutline />}
                    </div>
                    <div
                        className={`input-toolbar-button ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
                        onClick={handleVoiceRecord}
                    >
                        <SoundOutline />
                    </div>
                </div>
            </div>

            {/* 消息输入区域 */}
            <div className="px-2 py-1">
                <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                        {isRecording ? (
                            <div className="flex items-center justify-center h-10 bg-gray-100 rounded-full px-4">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                    }}
                                    className="w-2 h-2 rounded-full bg-red-500 mr-2"
                                />
                                <span className="text-sm">录音中 {recordingTime}s (点击发送)</span>
                            </div>
                        ) : (
                            <Input
                                placeholder="输入消息..."
                                value={text}
                                onChange={(val) => setText(val)}
                                onEnterPress={handleSend}
                                className="rounded-full"
                                ref={inputRef}
                            />
                        )}
                    </div>

                    <Button
                        className="flex-none text-sm px-3"
                        color="primary"
                        disabled={!text.trim() && !isRecording}
                        onClick={handleSend}
                    >
                        发送
                    </Button>
                </div>
            </div>

            <AnimatePresence>
                {showEmoji && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 320, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-white"
                        style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}
                    >
                        <div className="p-2">
                            <Picker
                                data={data}
                                onEmojiSelect={handleEmojiSelect}
                                theme="light"
                                set="windows"
                                locale="zh"
                                previewPosition="none"
                                skinTonePosition="none"
                                navPosition="bottom"
                                perLine={8}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MessageInput; 