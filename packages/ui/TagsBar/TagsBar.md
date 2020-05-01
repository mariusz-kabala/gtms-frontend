with tags

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar tags={['test']}/>
</div>
```

without tags

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar tags={[]}/>
</div>
```

loader

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar editMode={true} isSaving={true} tags={['lorem', 'ipsum']}/>
</div>
```

show suggestions

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar editMode={true} suggestions={['lorem', 'ipsum']} tags={['lorem', 'ipsum']}/>
</div>
```

show suggestions loader

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar editMode={true} isLoading={true} tags={['lorem', 'ipsum']}/>
</div>
```
