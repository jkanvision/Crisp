import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      _id
    }
  }
}
`;

export const ADD_EVENT = gql`
mutation addEvent($title: String, $start: String, $end: String) {
  addEvent(title: $title, start: $start, end: $end) {
    _id
    createdAt
    end
    start
    title
  }
}
`;

// export const ADD_STUDENT = gql`
//   mutation addStudent($firstName: String!, $lastName: String!, $course: String!) {
//   addStudent(firstName: $firstName, lastName: $lastName, course: $course) {
//     _id
//     firstName
//     lastName
//     course
//   }
// }
// `;

// export const ADD_ASSIGNMENT = gql`
//   mutation addAssignment($assignmentName: String!, $grade: Int, $studentId: String) {
//   addAssignment(assignmentName: $assignmentName, grade: $grade, studentId: $studentId) {
//     assignmentName
//     grade
//   }
// }
// `;

export const UPDATE_EVENT = gql`
mutation updateEvent($eventId: ID!, $title: String, $start: String, $end: String) {
  updateEvent(eventId: $eventId, title: $title, start: $start, end: $end) {
    _id
    createdAt
    end
    start
    title
  }
}
`;

export const DELETE_EVENT = gql`
mutation removeEvent($eventId: ID!) {
  removeEvent(eventId: $eventId) {
    _id
    createdAt
    end
    start
    title
  }
}
`;

export const LOGIN_USER = gql`
 mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;
