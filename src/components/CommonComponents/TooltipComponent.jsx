import { Tooltip } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import {
    InfoCircleOutlined
  } from '@ant-design/icons';
export default function TooltipComponent({
    title = "",
}) {
    return (
        <>
            <Tooltip title={title}>
                <InfoCircleOutlined
                    style={{
                        color: 'rgba(0,0,0,.45)',
                    }}
                />
            </Tooltip>
        </>
    )
}