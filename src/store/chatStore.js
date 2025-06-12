import { create } from 'zustand';
import { nanoid } from 'nanoid';

// 使用固定的历史时间戳，而不是基于当前时间计算
// 创建一个基准时间：2023年12月15日
const baseTime = new Date(2023, 11, 15).getTime(); // 月份是0-11，所以12月是11

// 模拟数据 - 使用固定的时间戳
const initialMessages = [{
    id: '1',
    text: '你好！欢迎使用我的聊天应用 👋',
    sender: 'other',
    timestamp: new Date(baseTime).toISOString(),
    status: 'read'
},
{
    id: '2',
    text: '这是一个使用React、Tailwind CSS和现代前端技术构建的聊天界面',
    sender: 'other',
    timestamp: new Date(baseTime + 2 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '3',
    text: '你好！这个界面设计得很漂亮 😊',
    sender: 'me',
    timestamp: new Date(baseTime + 5 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '4',
    text: '谢谢！我使用了最新的设计趋势，让界面更加直观友好',
    sender: 'other',
    timestamp: new Date(baseTime + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '5',
    type: 'voice',
    duration: 12, // 语音时长（秒）
    sender: 'me',
    timestamp: new Date(baseTime + 1 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '6',
    text: '我还支持表情和语音消息，让沟通更加丰富多彩 🎉',
    sender: 'other',
    timestamp: new Date(baseTime + 1 * 24 * 60 * 60 * 1000 + 35 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '7',
    text: '太棒了！我很喜欢这个功能 👍',
    sender: 'me',
    timestamp: new Date(baseTime + 1 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '8',
    text: '如果你有任何问题或建议，随时告诉我',
    sender: 'other',
    timestamp: new Date(baseTime + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '9',
    text: '好的，谢谢！',
    sender: 'me',
    timestamp: new Date(baseTime + 2 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '10',
    text: '😀',
    sender: 'other',
    timestamp: new Date(baseTime + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '11',
    text: '🤣',
    sender: 'me',
    timestamp: new Date(baseTime + 3 * 24 * 60 * 60 * 1000 + 1 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '12',
    text: '👻',
    sender: 'other',
    timestamp: new Date(baseTime + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '13',
    text: '今天天气真不错，你那边怎么样？',
    sender: 'other',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '14',
    text: '这里也是晴天，阳光明媚 ☀️',
    sender: 'me',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '15',
    type: 'voice',
    duration: 8,
    sender: 'other',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '16',
    text: '听起来不错，待会我们去公园散步吧',
    sender: 'me',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '17',
    text: '好主意！我们4点在老地方见面？',
    sender: 'other',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '18',
    text: '没问题，到时见 👋',
    sender: 'me',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '19',
    type: 'voice',
    duration: 15,
    sender: 'me',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '20',
    text: '我已经到了，你在哪里？',
    sender: 'other',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 40 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '21',
    text: '马上到，再等我5分钟 😅',
    sender: 'me',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '22',
    text: '❤️',
    sender: 'other',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(),
    status: 'read'
},
{
    id: '23',
    text: '🏃‍♂️💨',
    sender: 'me',
    timestamp: new Date(baseTime + 4 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 + 55 * 60 * 1000).toISOString(),
    status: 'read'
}
];

const useChatStore = create((set) => ({
    messages: initialMessages,
    loading: false,
    error: null,
    hasMore: true, // 是否有更多历史消息可加载

    sendMessage: (message) => {
        const newMessage = {
            id: nanoid(),
            ...message,
            sender: 'me',
            timestamp: new Date().toISOString(),
            status: 'sent'
        };

        set((state) => ({
            messages: [...state.messages, newMessage]
        }));

        // 模拟自动回复
        setTimeout(() => {
            const replies = ['收到了你的消息！',
                '了解，我会尽快回复你',
                '好的，没问题',
                '这个想法很不错 👍',
                '谢谢你的反馈',
                '我正在处理这个问题',
                '需要更多信息吗？',
                '👌',
                '😊',
                '稍等，我查一下'
            ];

            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const autoReply = {
                id: nanoid(),
                text: randomReply,
                sender: 'other',
                timestamp: new Date().toISOString(),
                status: 'sent'
            };

            set((state) => ({
                messages: [...state.messages, autoReply]
            }));
        }, 1000);
    },

    sendVoiceMessage: (duration) => {
        const newMessage = {
            id: nanoid(),
            type: 'voice',
            duration,
            sender: 'me',
            timestamp: new Date().toISOString(),
            status: 'sent'
        };

        set((state) => ({
            messages: [...state.messages, newMessage]
        }));

        // 模拟自动回复
        setTimeout(() => {
            const replies = ['我收到了你的语音消息，稍后会听',
                '语音收到，马上听',
                '👂',
                '好的，我听一下'
            ];

            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const autoReply = {
                id: nanoid(),
                text: randomReply,
                sender: 'other',
                timestamp: new Date().toISOString(),
                status: 'sent'
            };

            set((state) => ({
                messages: [...state.messages, autoReply]
            }));
        }, 1500);
    },

    // 加载更多历史消息
    loadMoreMessages: () => {
        set((state) => {
            // 如果已经没有更多消息可加载，直接返回当前状态
            if (!state.hasMore) {
                return state;
            }

            // 否则设置loading状态
            return { ...state, loading: true };
        });

        // 模拟API请求延迟
        setTimeout(() => {
            const oldMessages = [{
                id: nanoid(),
                text: '欢迎加入我的聊天社区！',
                sender: 'other',
                timestamp: new Date(baseTime - 3 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: nanoid(),
                text: '谢谢邀请，很高兴认识大家',
                sender: 'me',
                timestamp: new Date(baseTime - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: nanoid(),
                text: '这里有很多有趣的话题可以讨论',
                sender: 'other',
                timestamp: new Date(baseTime - 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: nanoid(),
                text: '🎮',
                sender: 'me',
                timestamp: new Date(baseTime - 2 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: nanoid(),
                text: '你也喜欢游戏吗？我们可以一起玩！',
                sender: 'other',
                timestamp: new Date(baseTime - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: nanoid(),
                type: 'voice',
                duration: 20,
                sender: 'me',
                timestamp: new Date(baseTime - 1 * 24 * 60 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: nanoid(),
                text: '听起来很棒！我们周末约一场',
                sender: 'other',
                timestamp: new Date(baseTime - 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
                status: 'read'
            }
            ];

            set((state) => {
                // 如果已经没有更多消息可加载，直接返回当前状态
                if (!state.hasMore) {
                    return { ...state, loading: false };
                }

                return {
                    messages: [...oldMessages, ...state.messages],
                    loading: false,
                    hasMore: false // 设置为false表示没有更多历史消息了
                };
            });
        }, 1000);
    }
}));

export default useChatStore;