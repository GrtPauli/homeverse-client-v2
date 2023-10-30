import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { notification } from 'antd'

export default function useHvNotification() {
  const [api, contextHolder] = notification.useNotification()
  const show = (title: string, message: React.ReactNode, isError?: boolean) => {
    api.info({
      // duration: 1000,
      icon: isError ? (
        <CloseCircleFilled className="text-red-500" />
      ) : (
        <CheckCircleFilled className="text-green-500" />
      ),
      message: title,
      description: (
        <div className="flex gap-3">
          <p className="">{message}</p>
        </div>
      ),
      placement: 'topLeft',
    })
  }

  const successMsg = (title: string, message: React.ReactNode) => {
    show(title, message)
  }

  const errorMsg = (title: string, message: React.ReactNode) => {
    show(title, message, true)
  }

  return { notificationContext: contextHolder, successMsg, errorMsg }
}
