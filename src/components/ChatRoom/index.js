import { Col, Row } from "antd";
import React from "react";
import ChatWindow from "./ChatWindow";
import SideBar from "./SideBar";

export default function ChatRoom() {
    return (
        <div>
            <Row>
                <Col span={6}><SideBar /> </Col>
                <Col span={18}><ChatWindow /> </Col>
            </Row>
        </div>
    )
}