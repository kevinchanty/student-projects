import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Route } from 'react-router-dom'
import React from 'react'
import LoginPage from '../pages/LoginPage'
// import { useHistory } from 'react-router'

const PrivateRoute = (props: {
  exact?: boolean
  path: string
  component: React.FC
}) => {
  const hasLogin = useSelector((state: RootState) => !!state.auth.token)
  // const history = useHistory()
  // const pathname = history.location.pathname

  const Content = props.component

  return (
    <Route exact={props.exact} path={props.path}>
      {hasLogin ? (
        <Content />
      ) : (
        <>
          <LoginPage />
        </>
      )}
    </Route>
  )
}
export default PrivateRoute
