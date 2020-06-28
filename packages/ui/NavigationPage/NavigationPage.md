Basic usage

```
const [showNav, setShowNav] = React.useState(false)

;<>
  <button onClick={() => setShowNav(!showNav)}>Toggle navigation page</button>
  {
    showNav &&
    <NavigationPage>Children</NavigationPage>
  }
</>
```
