// fetch("https://api.themoviedb.org/3/discover/movie?api_key=29a61ff6f4181480cc4a67a1ff4f9241&sort_by=popularity.desc")
// .then(result => {
//     return result.json()
// })
// .then(result => {
//   console.log(result)
// })



// buat Kata kunci dan variabel
const contentMovie = document.getElementById('movie')
const search = document.getElementById('search')
const URL_KEY = "https://api.themoviedb.org/3/discover/movie?api_key=29a61ff6f4181480cc4a67a1ff4f9241&"
const URL_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=29a61ff6f4181480cc4a67a1ff4f9241&"
const DEFAULT = "sort_by=popularity.desc&region=id&page=1&"


// Fetch Data
let getDataMovie = async (url, src) => {
    let URL = `${url}${src}`
    let response = await fetch(URL)
    let data = await response.json()
    // console.log(data)
    return data
}

// Unpack Data

getDataMovie(URL_KEY,DEFAULT).then( data => {
    // Masukkan fungsi perulangan
     getRenderDataMovie(data) 
});


// Perulangan
let getRenderDataMovie = (data) =>{ 
        // console.log(data)
    data["results"].forEach(element => {
        let card =
        `
        <div class="card m-2" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${element.backdrop_path == true ? element.backdrop_path : element.poster_path}" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title">${element.original_title}</h5>
                <p class="card-text">${element.release_date}</p>
                <p class="card-text">${element.vote_average}</p>
                
            </div>
        </div>
        `
        contentMovie.innerHTML += card

    });
} 
    


// Input
search.addEventListener('input', (e) => {
    contentMovie.innerHTML = "";
    const searchInput = e.target.value;
    if(!searchInput){
        getDataMovie(URL_KEY,DEFAULT).then( (data) => { getRenderDataMovie(data) });
    }else {
        // Check Search
        getDataMovie(URL_SEARCH + `&query=${searchInput}&region=id&page=1`).then(data => {
            getRenderDataMovie(data);
        });
    }
    

});




