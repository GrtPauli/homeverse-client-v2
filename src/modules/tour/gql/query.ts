import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { TourFragment, TourRequestFragment } from './fragment'

const CREATE_TOUR_REQUEST = gql`
  mutation CreateTourRequest($request: CreateTourRequestInput!) {
    createTourRequest(request: $request) {
      _id
    }
  }
`

const CREATE_TOUR = gql`
  mutation CreateTour($tour: CreateTourInput!) {
    createTour(tour: $tour) {
      _id
    }
  }
`

const UPDATE_TOUR = gql`
  mutation UpdateTour($id: String!, $tour: UpdateTourInput!) {
    updateTour(id: $id, tour: $tour) {
      _id
    }
  }
`

const UPDATE_TOUR_REQUEST_STATUS = gql`
  mutation updateTourRequestStatus(
    $id: String!
    $request: UpdateTourRequestStatusInput!
    $vcRoomId: String
  ) {
    updateTourRequestStatus(id: $id, request: $request, vcRoomId: $vcRoomId) {
      _id
    }
  }
`

const GET_TOUR_REQUESTS = gql`
  query GetTourRequests($input: GetTourInfoInput!) {
    getTourRequests(input: $input) {
      ...TourRequest
    }
  }
  ${TourRequestFragment}
`

const GET_TOURS = gql`
  query GetTours($input: GetTourInfoInput!) {
    getTours(input: $input) {
      ...Tour
    }
  }
  ${TourFragment}
`

export const useCreateTour = (callback: any) => {
  return useMutation(CREATE_TOUR, {
    onCompleted: (res: any) => {
      if (res.createTour) {
        callback(res.createTour)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useCreateTourRequest = (callback: any) => {
  return useMutation(CREATE_TOUR_REQUEST, {
    onCompleted: (res: any) => {
      if (res.createTourRequest) {
        callback(res.createTourRequest)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useUpdateTourRequestStatus = (callback: any) => {
  return useMutation(UPDATE_TOUR_REQUEST_STATUS, {
    onCompleted: (res: any) => {
      if (res.updateTourRequestStatus) {
        callback(res.updateTourRequestStatus)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useUpdateTour = (callback: any) => {
  return useMutation(UPDATE_TOUR, {
    onCompleted: (res: any) => {
      if (res.updateTour) {
        callback(res.updateTour)
      }
    },
    onError: (err: any) => {
      console.log(err)
    },
  })
}

export const useGetTourRequests = (callback: any) => {
  return useLazyQuery(GET_TOUR_REQUESTS, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getTourRequests) {
        callback(res.getTourRequests)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}

export const useGetTours = (callback: any) => {
  return useLazyQuery(GET_TOURS, {
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res.getTours) {
        callback(res.getTours)
      }
    },
    onError: (err) => {
      console.log(err)
    },
  })
}
