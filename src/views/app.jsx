import home from './home'
import about from './about'
import week from './week'

export default (state) => {
  const { url } = state
  let page

  if (url === '/') {
    page = home(state)
  } else if (url === '/about') {
    page = about()
  } else if (url === '/week') {
    page = week(state)
  }

  return (
    <main>
      <h1>Feather POC App</h1>
      <nav>
        <a href='/'>home</a> | <a href='/week'>week</a> | <a href='/about'>about</a>
      </nav>
      {page}
    </main>
  )
}
