import { generateAuthActions } from "redux-token-auth"

const config = {
  authUrl: 'https://classy-news-backend.herokuapp.com/api/v1/auth',
  userAttributes: {
    uid: "uid",
    name: "name",
    nickname: "nickname",
    city: "city",
    country: "country"
  },
  userRegistrationAttributes: {
    uid: "uid",
    name: "name",
    nickname: "nickname",
    city: "city",
    country: "country"
  }
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export { registerUser, signInUser, signOutUser, verifyCredentials }