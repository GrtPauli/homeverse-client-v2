import { HvTable } from '@/components'
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { useAgentContext } from '../../context';
import { AgentRequestStatus, IClientRequest } from '../../model';
import { Image } from 'antd';
import moment from 'moment';
import { APP_DATE_FORMAT, APP_DATE_TIME_FORMAT } from '@/constants/Helper';
import {BsPersonCheck, BsPersonX} from "react-icons/bs"
import { HvConfirm } from '@/components/modal/confirm';

export const ClientRequestsTable = () => {
    const { clientRequests, updateClientRequest, loading } = useAgentContext()

    const handleUpdateStatus = (clientRequest: IClientRequest, message: string, type: "accept" | "reject") => {
      HvConfirm({
        message,
        callback: (confirmed: boolean) => {
          if (confirmed) {
            updateClientRequest(clientRequest, type)
          }
        },
      });
    };

    const columns: ColumnsType<IClientRequest> = [
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Client</p>,
          render: (_, record) => (
            <div className='flex items-center gap-2'>     
              <Image
                alt="brand"
                className="object-cover"
                src={record.client.photo}
                width={35}
                height={35}
              />

              <p>{record.client.displayName}</p>
            </div>
          ),
        },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Status</p>,
          dataIndex: "status",
          key: "status",
          render: (value) => (
            <p className={`lg:text-sm text-xs font-extrabold
              ${value == AgentRequestStatus.PENDING && "text-yellow-400"}
              ${value == AgentRequestStatus.ACCEPTED && "text-green-400"}
              ${value == AgentRequestStatus.REJECTED && "text-red-400"}
            `}>
              {AgentRequestStatus[value]}
            </p>
          ),
        },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Message</p>,
          dataIndex: "message",
          render: (value) => <p className="lg:text-sm text-xs">{value}</p>,
        },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Sent At</p>,
          dataIndex: "createdAt",
          key: "createdAt",
          render: (_, record) => <p className="lg:text-sm text-xs">{moment(record.createdAt).format(APP_DATE_FORMAT)}</p>,
        },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Actions</p>,
          key: "actions",
          render: (_, record) => (
            <div className="flex items-center gap-3">
              <BsPersonCheck
                onClick={() => handleUpdateStatus(
                  record, 
                  `Are you sure you want to accept ${record.client.displayName} as a client`,
                  "accept"
                )} 
                className='text-[28px] text-colors-cadet hover:text-primary duration-150 ease-in cursor-pointer'
              />
              <BsPersonX
                onClick={() => handleUpdateStatus(
                  record, 
                  `Are you sure you want to reject ${record.client.displayName} as a client`,
                  "reject"
                )}  
                className='text-[28px] text-colors-cadet hover:text-primary duration-150 ease-in cursor-pointer'
              />
            </div>
          ),
        },
    ];

  return (
    <div className="pb-5 h-full w-full">
        <HvTable
            pagination={false}
            columns={columns}
            dataSource={clientRequests}
            // loading={loading}
        />
    </div>
  )
}

