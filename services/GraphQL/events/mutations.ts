import { gql } from '@apollo/client'

export const CREATE_EVENT = gql`
  mutation (
    $title: String!
    $description: String
    $date: timestamptz!
    $type: String!
    $imageUrl: String
    $requirementsUrl: String
  ) {
    event: insert_events_one(
      object: {
        date: $date
        title: $title
        description: $description
        type: $type
        is_active: true
        requirements_url: $requirementsUrl
        image_url: $imageUrl
      }
    ) {
      is_active
    }
  }
`

export const UPDATE_EVENT = gql`
  mutation (
    $id: uuid!
    $title: String
    $description: String
    $date: timestamptz
    $type: String
    $imageUrl: String
    $requirementsUrl: String
  ) {
    event: update_events_by_pk(
      pk_columns: { id: $id }
      _set: {
        date: $date
        title: $title
        description: $description
        type: $type
        requirements_url: $requirementsUrl
        image_url: $imageUrl
      }
    ) {
      is_active
    }
  }
`

export const DEACTIVATE_EVENT = gql`
  mutation ($id: uuid!) {
    event: update_events_by_pk(pk_columns: { id: $id }, _set: { is_active: false }) {
      is_active
    }
  }
`

export const INSERT_MEMBER_INSCRIPTION = gql`
  mutation ($eventId: uuid!, $memberId: uuid!) {
    event: insert_inscriptions_one(object: { event_id: $eventId, member_id: $memberId }) {
      updated_at
    }
  }
`

export const CANCEL_MEMBER_INSCRIPTION = gql`
  mutation ($eventId: uuid!, $memberId: uuid!) {
    event: delete_inscriptions(where: { event_id: $eventId, member_id: $memberId }) {
      affected_rows
    }
  }
`
