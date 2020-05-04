working example

```
const [isLoading, setIsLoading] = React.useState(false)
const [suggestions, setSuggestions] = React.useState([])
const [tags, setTags] = React.useState([])
const [isSaving, setIsSaving] = React.useState(false)
const suggestionsTimeout = React.useRef();

<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar
        tags={tags}
        onTagAdd={tag => {
            if (!tags.includes(tag)) {
                setTags([
                    ...tags,
                    tag
                ])
            }
        }}
        onTagRemove={tag => {
            const index = tags.indexOf(tag)

            if (index > -1) {
                tags.splice(index, 1)
                setTags([...tags])
            }
        }}
        onLoadSuggestionCancel={() => {
            clearTimeout(suggestionsTimeout.current)
            setIsLoading(false)
        }}
        onLoadSuggestion={(query) => {
            clearTimeout(suggestionsTimeout.current)
            setIsLoading(true)
            suggestionsTimeout.current = setTimeout(() => {
                setSuggestions(['lorem', 'ipsum', 'dolor', 'sit', 'amet'])
                setIsLoading(false)
            }, 2000)
        }}
        onSave={() => {
            setIsSaving(true)
            setTimeout(() => {
                setIsSaving(false)
            }, 1500)
        }}
        isLoading={isLoading}
        isSaving={isSaving}
        suggestions={suggestions}
    />
</div>
```

with tags

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar tags={['test']} onLoadSuggestionCancel={() => null}  onLoadSuggestion={() => null} />
</div>
```

without tags

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar tags={[]} onLoadSuggestionCancel={() => null}  onLoadSuggestion={() => null} />
</div>
```

loader

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar editMode={true} isSaving={true} tags={['lorem', 'ipsum']} onLoadSuggestionCancel={() => null}  onLoadSuggestion={() => null} />
</div>
```

show suggestions

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar editMode={true} suggestions={['lorem', 'ipsum']} tags={['lorem', 'ipsum']} onLoadSuggestionCancel={() => null}  onLoadSuggestion={() => null} />
</div>
```

show suggestions loader

```
<div style={{backgroundColor: 'black', padding: '5%'}}>
    <TagsBar editMode={true} isLoading={true} tags={['lorem', 'ipsum']} onLoadSuggestionCancel={() => null}  onLoadSuggestion={() => null} />
</div>
```
