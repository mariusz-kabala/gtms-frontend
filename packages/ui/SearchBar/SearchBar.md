Basic WORKING usage

```
const [tags, setTags] = React.useState([]);
const [query, setQuery] = React.useState('');
const [suggestions, setSuggestions] = React.useState([]);
const [isLoading, setIsloading] = React.useState(false);

let suggestionTimeout;

<div style={{ background: '#25212e', padding: '20px' }}>
    <SearchBar isLoading={isLoading} tags={tags} query={query} suggestions={suggestions} onTagAdd={newTag => {
        tags.push(newTag)
        setTags([...tags])
    }} onQueryChange={text => setQuery(text)} onLoadSuggestion={text => {
        setIsloading(true)
        clearTimeout(suggestionTimeout)
        suggestionTimeout = setTimeout(() => {
            setIsloading(false)
            setSuggestions(['lorem', 'ipsum', 'test'])
        }, 2000)
    }} onTagRemove={tag => {
        const index = tags.findIndex(t => t === tag)

        if (index > -1) {
            tags.splice(index, 1)
            setTags([...tags])
        }
    }} onLoadSuggestionCancel={() => {
        clearTimeout(suggestionTimeout)
    }}/>
</div>
```

With tags (not working! just visualization)

```
<div style={{ background: '#25212e', padding: '20px' }}>
    <SearchBar onLoadSuggestionCancel={() => null} tags={['lorem', 'ipsum', 'punkciki', 'hello']}/>
</div>
```

With tags and query (not working! just visualization)

```
<div style={{ background: '#25212e', padding: '20px' }}>
    <SearchBar onLoadSuggestionCancel={() => null} query="Lorem ipsum" tags={['lorem', 'ipsum', 'punkciki', 'hello']}/>
</div>
```
