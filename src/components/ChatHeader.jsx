import { NavBar } from 'antd-mobile';
import { LeftOutline, MoreOutline } from 'antd-mobile-icons';

const ChatHeader = ({ title = '聊天', onBack }) => {
    return (
        <div className="fixed top-0 left-0 right-0 z-10 chat-header">
            <NavBar
                back={<LeftOutline />}
                right={<MoreOutline />}
                onBack={onBack || (() => { })}
                className="h-11"
            >
                <div className="flex flex-col items-center">
                    <span className="text-base font-medium">{title}</span>
                    <div className="flex items-center text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                        在线
                    </div>
                </div>
            </NavBar>
        </div>
    );
};

export default ChatHeader;
