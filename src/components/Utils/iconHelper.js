import InboxIcon from "@material-ui/icons/MoveToInbox";
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HowToVoteRoundedIcon from '@material-ui/icons/HowToVoteRounded';
import {CommonTypes} from "../../Types/Common";
import React from "react";


export default function GetIcon(iconKey) {
    switch (iconKey) {
        case CommonTypes.Iconkeys.inbox:
            return (<InboxIcon/>)
        case CommonTypes.Iconkeys.viewlist:
            return (<ViewListRoundedIcon/>)
        case CommonTypes.Iconkeys.personadd:
            return (<PersonAddIcon/>)
        case CommonTypes.Iconkeys.howtovote:
            return (<HowToVoteRoundedIcon/>)
        default:
            return (<InboxIcon/>)
        
    }
}