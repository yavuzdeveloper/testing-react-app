export const formValidation = ({ firstName, lastName, password, email }) => {
  if (!firstName) {
    return 'Please enter a name'
  }
  if (!lastName) {
    return 'Please enter a lastname'
  }
  if (!password) {
    return 'Please enter password'
  }
  if (!email) {
    return 'Please enter an E-mail'
  }
  if (password.length < 4) {
    return 'Your password  is weak'
  }
  if (!email.includes('@')) {
    return 'Please enter a valid e-mail'
  }
  return false
}
