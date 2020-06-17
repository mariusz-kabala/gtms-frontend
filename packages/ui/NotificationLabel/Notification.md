Basic usage

```
const [state, setState] = React.useState(false)
;<>
  <div onClick={() => setState(true)}>show notification single</div>
  {
    state &&
    <INotificationLabel
      text="3 new users in your group"
      icon={{ png: '/images/temp_images/iconQuestionMark.png' }}
    />
  }
</>
```
