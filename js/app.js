// Get Search Keyword
const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    fetch(url)
        .then((response) => response.json())
        .then(data => displaySearchResult(data))
}



// Function for Search result
const displaySearchResult = books => {
    const searchResult = document.getElementById("search-result");

    // Search Result Clear
    searchResult.innerHTML = '';

    // Total Search Result Clear
    const total = document.getElementById('total-search-result');
    total.innerHTML = '';

    // Search result Empty Handle
    if (books.docs.length === 0) {
        const p = document.createElement('p');
        p.innerText = 'No result found. Please try again';
        total.appendChild(p);
    }

    else {
        // Total Search Result
        const h3 = document.createElement("h3");
        h3.innerHTML = `Total search result: <span> ${books.numFound} </span>, Showing result <span> ${(books.numFound >= 20) ? '20' : books.numFound} </span>`;
        total.appendChild(h3);

        // Loop for each item found
        books.docs.slice(0, 20).forEach((book) => {
            const div = document.createElement("div");

            div.innerHTML = `
            <div class="col">
                <div class="card">
                    <div class="row g-0">

                        <div class="col-md-4 p-2">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <h2 class="card-title">${book.title}</h2>
                                <br>
                                <p class="card-text"><span>Author Name:</span> ${(book.author_name === undefined) ? 'Not found' : book.author_name}</p>
                                <p class="card-text"><span>Publisher Name:</span> ${(book.publisher === undefined) ? 'Not found' : book.publisher.slice(0, 5)}</p>
                                <p class="card-text">First Publish in ${(book.first_publish_year === undefined) ? 'Not found' : book.first_publish_year}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            `;

            searchResult.appendChild(div);
        });
    }
}
















































