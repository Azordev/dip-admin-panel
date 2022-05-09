import { gql } from '@apollo/client'

export const INSERT_EVENT = gql`
  mutation (
    $title: String!
    $description: String
    $date: String!
    $type: String!
    $image_url: String
    $requirements_url: String
  ) {
    event: insert_events_one(
      object: {
        date: $date
        title: $title
        description: $description
        type: $type
        is_active: true
        requirements_url: $requirements_url
        image_url: $image_url
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
    $date: String
    $type: String
    $image_url: String
    $requirements_url: String
  ) {
    event: update_events_by_pk(
      pk_columns: { id: $id }
      _set: {
        date: $date
        title: $title
        description: $description
        type: $type
        requirements_url: $requirements_url
        image_url: $image_url
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

// member inscription in event
export const INSERT_MEMBER_INSCRIPTION = gql`
  mutation ($event_id: uuid!, $member_id: uuid!) {
    event: insert_inscriptions_one(object: { event_id: $event_id, member_id: $member_id }) {
      updated_at
    }
  }
`

// member cancellation in event
export const CANCEL_MEMBER_INSCRIPTION = gql`
  mutation ($event_id: uuid!, $member_id: uuid!) {
    event: delete_inscriptions(where: { event_id: $event_id, member_id: $member_id }) {
      affected_rows
    }
  }
`
