import { Form, Select, Modal, Spin, Avatar } from "antd";
import { debounce } from "lodash";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { db } from "../../firebase/config";

function DeboundSelect({ fetchOptions, deboundTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const deboundFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then(newOptions => {
                setOptions(newOptions);
                setFetching(false);
            })
        }
        return debounce(loadOptions, deboundTimeout);
    }, [deboundTimeout, fetchOptions]);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={deboundFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props} >
            {
                //[{label: , value: , photoURL}]
                options.map(option => (
                    <Select.Option key={option.value} value={option.value} title={option.label}>
                        <Avatar size={"small"} src={option.photoURL}>
                            {option.photoURL ? '' : option.displayName?.charAt(0)?.toUpperCase()}
                        </Avatar>
                        {`${option.label}`}
                    </Select.Option>))
            }
        </Select>

    )
}

export default function InviteMemberModal() {
    const [value, setValue] = useState([]);
    const { isInviteMemberOpen, setIsInviteMemberOpen, selectedRoom, selectedRoomId } = useContext(AppContext);
    const [form] = Form.useForm();

    const handleOk = () => {

        //reset form 
        form.resetFields();
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectedRoom.members, ...value.map(val => val.value)]
        })
        setIsInviteMemberOpen(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberOpen(false);
    }
    const fetchUserList = async (search, curMembers) => {
        return db.collection('users')
            .where('keywords', 'array-contains', search)
            .orderBy('displayName')
            .limit(20)
            .get()
            .then(snapshot => {
                return snapshot.docs.map(doc => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL
                })).filter(opt => !curMembers.includes(opt.value));
            })
    }
    return (
        <div>
            <Modal
                title="Mời thêm thành viên"
                open={isInviteMemberOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <DeboundSelect
                        mode="multiple"
                        label="Tên các thành viên"
                        value={value}
                        placeholder="Nhập tên thành viên"
                        fetchOptions={fetchUserList}
                        onChange={newValue => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom.members} />
                </Form>
            </Modal>
        </div>
    )
}