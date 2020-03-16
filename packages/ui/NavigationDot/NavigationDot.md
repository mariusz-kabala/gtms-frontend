Basic usage

```
const [showNav, setShowNav] = React.useState(false)

;<>
  <button onClick={() => setShowNav(!showNav)}>Toggle navigation</button>
  {
    showNav &&
    <NavigationDot>Children</NavigationDot>
  }
</>
```
