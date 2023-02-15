import { Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { AuthContext } from "../../context/AuthProvider";
import { addDocument } from "../../firebase/service";

export default function AddRoomModal() {
    const { isAddRoomOpen, setIsAddRoomOpen } = useContext(AppContext);
    const { user: { uid } } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        //reset form 
        form.resetFields();
        setIsAddRoomOpen(false);
    }

    const handleCancel = () => {
        form.resetFields();
        setIsAddRoomOpen(false);
    }
    return (
        <div>
            <Modal
                title="Tạo phòng"
                open={isAddRoomOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng..." />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input placeholder="Nhập mô tả..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}