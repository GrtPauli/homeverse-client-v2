import { COMMENTS_SUBSCRIPTION, CREATE_COMMENT, GET_RECIPE } from '@/modules/test/gql/query'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import React from 'react'

const Test = () => {
  // const {data, loading, error} = useQuery(GET_RECIPE, {
  //   variables: {
  //     recipeId: "1"
  //   }
  // })
  // console.log(data, error);

  const [mutateFunction, { data: newCommentData, error: newCommentError }] =
    useMutation(CREATE_COMMENT)

  const { data, loading, error } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: {
      recipeId: '1',
    },
  })
  console.log(data, error)

  const handleCreateComment = () => {
    mutateFunction({
      variables: {
        comment: {
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, aut saepe. Aliquid eum illo officia excepturi libero pariatur architecto sequi.',
          nickname: 'GrtPauli',
          recipeId: '1',
        },
      },
    }).finally(() => {
      console.log(newCommentData)
      console.log(newCommentError)
    })
  }

  return (
    <div>
      <h4>
        New comment: {!loading && data?.newComments?.nickname} :{' '}
        {!loading && data?.newComments?.content}
      </h4>
      <button onClick={handleCreateComment}>Create Comment</button>
    </div>
  )
}

export default Test
