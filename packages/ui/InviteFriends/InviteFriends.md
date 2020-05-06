Basic usage

```
const [state, setState] = React.useState('')

;<>
  <div style={{ cursor: 'pointer' }} onClick={() => setState(true)}>open userCard</div>
  {
    state &&
    <InviteFriends image="https://placekitten.com/408/287" onClose={() => setState(false)} />
  }
</>
```
