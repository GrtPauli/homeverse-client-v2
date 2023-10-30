import { InboxOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import { ConfigProvider, Image, Upload } from 'antd'
import React, { memo, useState } from 'react'
import { fileSvc } from '../../services/file'
import Camera from '../../assets/images/camera.png'

const { Dragger } = Upload

interface IProps {
  label?: string
  inputId?: string
  className?: string
  accept?: string
  multiple?: boolean
  title?: string
  maxCount?: number
  ignoreResize?: boolean
  defaultFileList?: UploadFile<any>[] | undefined
  onSelected: (files: Array<any>) => void
  onRemove?: (file: UploadFile) => void
}

export const ApFileInput: React.FC<IProps> = (props: IProps) => {
  const { label, onSelected, multiple, maxCount, className, accept, onRemove, defaultFileList } =
    props
  let timeout: any = null
  const handleOnChange = async (fls: any) => {
    if (timeout) clearTimeout(timeout)

    if (fls && fls.length > 0) {
      let files: any = []
      for await (const f of fls) {
        files.push({
          uri: await fileSvc.fileToBase64(f),

          // props?.ignoreResize
          //   ? await fileSvc.fileToBase64(f)
          //   : await fileSvc.imageThumbnail(await fileSvc.fileToBase64(f)),
          file: f,
          uid: f.uid,
        })
      }

      timeout = setTimeout(() => {
        onSelected(files)
      }, 1000)
    }
  }

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: multiple,
    accept: accept,
    defaultFileList: defaultFileList,
    listType: 'picture',
    maxCount: maxCount || 5,

    async onChange(info: any) {
      await handleOnChange(
        info.fileList.filter((f: any) => f.originFileObj).map((f: any) => f.originFileObj),
      )
    },
    async onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    async onRemove(file) {
      onRemove && onRemove(file)
    },
  }

  return (
    <>
      {label && <p className="text-dark-prussian-blue font-semibold mb-2 text-[15px]">{label}</p>}
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '',
            colorPrimary: '#FF7D01',
          },
        }}
      >
        <Dragger {...uploadProps}>
          {/* <p className="ant-upload-drag-icon">
            <InboxOutlined rev={undefined} />
          </p> */}
          <div className="pb-3">
            <div className="flex items-center justify-center">
              <Image
                preview={false}
                className="object-cover"
                width="50px"
                height="50px"
                src={Camera.src}
              />
            </div>

            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support are {accept}.</p>
          </div>
        </Dragger>
      </ConfigProvider>
    </>
  )
}
