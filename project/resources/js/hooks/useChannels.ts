import {useContext} from "react";
import ChannelsContext from "../app/contexts/channels-context";

const useChannels = () => useContext(ChannelsContext)

export default useChannels;
