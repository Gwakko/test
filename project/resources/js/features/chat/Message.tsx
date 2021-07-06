import React from 'react';
import {ChatMessage} from '../../types';

type Props = {
    isSender: boolean;
} & ChatMessage;

const Message = ({ isSender, message, id}: Props) => {
    return (
        <>
            {isSender ? (
                <div className="d-flex flex-row p-3" key={id}>
                    <img className="avatar" src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                    <div className="chat ml-2 p-3">
                        {message}
                    </div>
                </div>
            ) : (
                <div className="d-flex flex-row p-3 justify-content-end" key={id}>
                    <div className="bg-white mr-2 p-3">
                        <span className="text-muted">{message}</span>
                    </div>
                    <img className="avatar" src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                         width="30" height="30"/>
                </div>
            )}
        </>
    );
};

export default Message;
