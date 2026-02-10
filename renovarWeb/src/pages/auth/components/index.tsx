import { AuthContainer as Container } from './container'
import { AuthForm } from './form'
import { AuthHeader } from './header'
import { AuthLink } from './link'

export const Auth = Object.assign(Container, {
  Header: AuthHeader,
  Link: AuthLink,
  Form: AuthForm,
})
