Basic usage

```
const [showNav, setShowNav] = React.useState(false)

;<>
  <button onClick={() => setShowNav(!showNav)}>Toggle navigation main</button>
  {
    showNav &&
    <NavigationGroup>Children</NavigationGroup>
  }
</>
```
