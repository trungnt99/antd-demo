import React, { createContext, useContext, useMemo, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();
export default function AppProvider({ children }) {

    const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
    const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const { user: { uid } } = useContext(AuthContext);

    const roomsCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: uid
        }
    }, [uid]);
    const rooms = useFirestore('rooms', roomsCondition);

    const selectedRoom = useMemo(
        () => rooms.find(room => room.id === selectedRoomId) || {}
        , [rooms, selectedRoomId])

    const usersCodition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareValue: selectedRoom.members,
        }
    }, [selectedRoom.members]);

    const members = useFirestore('users', usersCodition)
    return (
        <AppContext.Provider
            value={{
                rooms,
                members,
                selectedRoom,
                isAddRoomOpen,
                setIsAddRoomOpen,
                selectedRoomId,
                setSelectedRoomId,
                isInviteMemberOpen,
                setIsInviteMemberOpen
            }}>
            {children}
        </AppContext.Provider>
    )
}