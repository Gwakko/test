import {useMemo} from "react";
import useChannels from "./useChannels";

const usePrivateChannels = (authUserId: any) => {
    const channels = useChannels();
    return useMemo(() => {
        return channels && channels.private(`users.${authUserId}`);
    }, [channels, authUserId]);
};

export default usePrivateChannels;
