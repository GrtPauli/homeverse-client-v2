import { HvTable } from '@/components'
import { ColumnsType } from 'antd/es/table';
import React from 'react'
import { useAgentContext } from '../../context';
import { AgentRequestStatus, IClient, IClientRequest } from '../../model';
import { Image } from 'antd';
import moment from 'moment';
import { APP_DATE_FORMAT, APP_DATE_TIME_FORMAT } from '@/constants/Helper';
import {BsFillHouseAddFill, BsArrowRight} from "react-icons/bs"
import { HvConfirm } from '@/components/modal/confirm';
import Link from 'next/link';

export const ClientsTable = () => {
    const { clients, updateClientRequest, loading } = useAgentContext()

    // const handleUpdateStatus = (clientRequest: IClientRequest, message: string, type: "accept" | "reject") => {
    //   HvConfirm({
    //     message,
    //     callback: (confirmed: boolean) => {
    //       if (confirmed) {
    //         updateClientRequest(clientRequest, type)
    //       }
    //     },
    //   });
    // };

    const columns: ColumnsType<IClient> = [
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
        // {
        //   title: <p className="lg:text-sm text-xs font-extrabold">Status</p>,
        //   dataIndex: "status",
        //   key: "status",
        //   render: (value) => (
        //     <p className={`lg:text-sm text-xs font-extrabold
        //       ${value == AgentRequestStatus.PENDING && "text-yellow-400"}
        //       ${value == AgentRequestStatus.ACCEPTED && "text-green-400"}
        //       ${value == AgentRequestStatus.REJECTED && "text-red-400"}
        //     `}>
        //       {AgentRequestStatus[value]}
        //     </p>
        //   ),
        // },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Email</p>,
          dataIndex: "email",
          render: (_, record) => <p className="lg:text-sm text-xs">{record.client.email}</p>,
        },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Created At</p>,
          dataIndex: "createdAt",
          key: "createdAt",
          render: (_, record) => <p className="lg:text-sm text-xs">{moment(record.createdAt).format(APP_DATE_FORMAT)}</p>,
        },
        {
          title: <p className="lg:text-sm text-xs font-extrabold">Actions</p>,
          key: "actions",
          render: (_, record) => (
            <div className="flex items-center gap-3">
              <Link href={`/hub/listings/create/${record.id}`} className='flex items-center gap-2 text-primary hover:text-primary duration-200 ease-in'>
                New Listing
                <BsArrowRight className='text-lg'/>
              </Link>
            </div>
          ),
        },
    ];

  return (
    <div className="pb-5 h-full w-full">
        <HvTable
            pagination={false}
            columns={columns}
            dataSource={clients}
            // loading={loading}
        />
    </div>
  )
}

