import { useRentalContext } from '@/modules/rental-manager/context'
import ManageRentalPage from '@/modules/rental-manager/manage/page'
import React, { useEffect } from 'react'

const ManageRental = ({ rentalId }: any) => {
  const { getRental } = useRentalContext()
  useEffect(() => {
    getRental(rentalId)
  }, [])

  return <ManageRentalPage />
}

export default ManageRental

export async function getServerSideProps({ query, req }: any) {
  return {
    props: {
      rentalId: query.id,
    },
  }
}
