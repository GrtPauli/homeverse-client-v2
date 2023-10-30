import { HvAddIcon, HvHomeIcon } from '@/assets/icons'
import { HvButton, HvLoader, HvModal } from '@/components'
import { RentalManagerLayout } from '@/components/layout/rental-manager'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CreateInitModal } from '../manage/components'
import { NoRentals, RentalFilter, RentalItem } from './components'
import { HvCircleAddIcon } from '../../../assets/icons'
import { useRentalContext } from '../context'
import { useAuthContext } from '@/modules/auth/context'

const RentalPropertiesPage = () => {
  const [createModal, setCreateModal] = useState(false)
  const { initLoading, getUserRentals, userRentals } = useRentalContext()
  const { firebaseInitLoading } = useAuthContext()

  useEffect(() => {
    if (firebaseInitLoading == false) {
      getUserRentals()
    }
  }, [firebaseInitLoading])

  return (
    <>
      {initLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <HvLoader loading={initLoading} size="lg" />
        </div>
      )}

      {!initLoading && (
        <RentalManagerLayout>
          <div className="w-full">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="font-black text-3xl mb-1">Properties</h1>
                <p className="text-sm text-colors-cadet">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nam illo
                  aliquid asperiores veniam.
                </p>
              </div>

              <HvButton onClick={() => setCreateModal(true)} paddingY="py-3.5" fullWidth={false}>
                Add a Property
                <HvCircleAddIcon />
              </HvButton>
            </div>

            <div className="w-[100%] bg-light-white rounded-lg shadow-lg">
              <RentalFilter />
              <div className="px-10 py-5">
                {userRentals.length == 0 && <NoRentals />}
                {userRentals.length != 0 && (
                  <div className="grid grid-cols-3 gap-10 py-5">
                    {userRentals.map((item, i) => (
                      <RentalItem item={item} key={i} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <HvModal
            open={createModal}
            onDismiss={() => setCreateModal(false)}
            title="Homeverse Rental Manager"
            width={800}
            wrapClassName="p-10"
          >
            <CreateInitModal setCreateModal={setCreateModal} />
          </HvModal>
        </RentalManagerLayout>
      )}
    </>
  )
}

export default RentalPropertiesPage
