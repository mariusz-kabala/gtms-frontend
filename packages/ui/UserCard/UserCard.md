Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div onClick={() => setState(true)}>open userCard</div>
  {
    state &&
    <UserCard image="https://placekitten.com/408/287" />
  }
</>
```
