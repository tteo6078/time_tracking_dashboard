const loadData = async () => {
    // Fetch data
    const response = await fetch('./data.json');
    if (!response.ok) return console.log('Oops! Something went wrong.');
    const fetchedData = await response.json()
    data = fetchedData
}