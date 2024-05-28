import React, { useState } from 'react';
import './communityStyles.css';
import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine';
import Chats from "./chat";

/**
 * CommunityPage Component
 * 
 * This component serves as a container for rendering a specific chat room within the Chat Engine.
 * It wraps the chat functionality using the `ChatEngineWrapper`, establishes a connection to a chat 
 * room using the `ChatSocket`, and displays the chat messages and allows message sending through the `ChatFeed`.
 * 
 * Props:
 * - user: An object containing the username of the currently logged-in user. This information is 
 *   used to connect the user to the chat room as a sender.
 * 
 * State:
 * - showChats: A boolean state to control the display of the `Chats` component.
 * 
 * Usage:
 * ```
 * <CommunityPage user={{ username: 'johndoe' }} />
 * ```
 */

const CommunityPage = (props) => {
    const [showChats, setShowChats] = useState(false); // State to control the display of Chats component

    /**
     * handleIconClick function
     * 
     * This function updates the state to show the Chats component when the house icon is clicked.
     */
    const handleIconClick = () => {
        setShowChats(true);
    };

    // If showChats is true, render the Chats component
    if (showChats) {
        return <Chats user={props.user} />;
    }

    return (
        <div className='community-page'>
            <span
                role="img"
                aria-label="house"
                className="anticon anticon-house ce-custom-header-icon"
                onClick={handleIconClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    focusable="false"
                    data-icon="house"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z" />
                </svg>
            </span>
            <ChatEngineWrapper>
                <ChatSocket
                    offset={-7}
                    projectID='6f431e64-6b7f-4b28-951c-f5d4dcc32068'
                    chatID='253688'
                    chatAccessKey='ca-95c2a9f1-e62a-46a2-bc09-614689f854bd'
                    senderUsername={props.user.username}
                />
                <ChatFeed activeChat='253688' />
            </ChatEngineWrapper>
        </div>
    );
};

export default CommunityPage;