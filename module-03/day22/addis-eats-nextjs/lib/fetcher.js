export const fetcher = (url) => fetch(url).then((r) => {
    if (!r.ok) throw new Error('Failed to fetch data');
    return r.json();
});