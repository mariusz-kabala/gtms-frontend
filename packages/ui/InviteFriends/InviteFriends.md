Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div style={{ cursor: 'pointer' }} onClick={() => setState(true)}>open InviteFriends</div>
  {
    state &&
    <InviteFriends />
  }
</>
```
